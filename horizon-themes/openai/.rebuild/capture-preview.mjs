import fs from 'node:fs/promises';
import path from 'node:path';

const DEFAULT_DEBUG_URL = 'http://127.0.0.1:9222';
const DEFAULT_SIZES = [
  { width: 1440, height: 900 },
  { width: 768, height: 1024 },
  { width: 390, height: 844 },
];

function getArg(flag, fallback = '') {
  const index = process.argv.indexOf(flag);
  return index === -1 ? fallback : process.argv[index + 1] ?? fallback;
}

function hasArg(flag) {
  return process.argv.includes(flag);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJson(url, init) {
  const response = await fetch(url, init);
  if (!response.ok) {
    throw new Error(`Request failed for ${url}: ${response.status}`);
  }

  return response.json();
}

function parseSizes(value) {
  if (!value) return DEFAULT_SIZES;

  return value.split(',').map((item) => {
    const [width, height] = item.split('x').map(Number);
    return { width, height };
  });
}

class CdpClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 0;
    this.pending = new Map();
    this.eventWaiters = new Map();
  }

  async connect() {
    await new Promise((resolve, reject) => {
      this.ws.addEventListener('open', resolve, { once: true });
      this.ws.addEventListener('error', reject, { once: true });
    });

    this.ws.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);

      if (message.id && this.pending.has(message.id)) {
        const { resolve, reject } = this.pending.get(message.id);
        this.pending.delete(message.id);

        if (message.error) reject(new Error(message.error.message));
        else resolve(message.result);
        return;
      }

      if (!message.method) return;

      const waiters = this.eventWaiters.get(message.method) || [];
      if (!waiters.length) return;

      this.eventWaiters.delete(message.method);
      for (const resolve of waiters) resolve(message.params);
    });
  }

  send(method, params = {}) {
    const id = ++this.id;

    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  waitForEvent(method, timeoutMs = 15000) {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error(`Timed out waiting for ${method}`));
      }, timeoutMs);

      const wrappedResolve = (params) => {
        clearTimeout(timeout);
        resolve(params);
      };

      const existing = this.eventWaiters.get(method) || [];
      existing.push(wrappedResolve);
      this.eventWaiters.set(method, existing);
    });
  }

  async close() {
    this.ws.close();
    await sleep(150);
  }
}

async function evaluate(client, expression, awaitPromise = true) {
  const result = await client.send('Runtime.evaluate', {
    expression,
    awaitPromise,
    returnByValue: true,
  });

  return result.result?.value;
}

async function waitForSelector(client, selector, timeoutMs = 15000) {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    const found = await evaluate(
      client,
      `Boolean(document.querySelector(${JSON.stringify(selector)}))`
    );

    if (found) return true;
    await sleep(250);
  }

  throw new Error(`Timed out waiting for selector: ${selector}`);
}

async function setViewport(client, width, height) {
  const mobile = width <= 480;
  await client.send('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile,
    screenWidth: width,
    screenHeight: height,
  });

  await client.send('Emulation.setTouchEmulationEnabled', {
    enabled: mobile,
    configuration: mobile ? 'mobile' : 'desktop',
  });
}

async function navigate(client, url) {
  const loaded = client.waitForEvent('Page.loadEventFired', 20000);
  await client.send('Page.navigate', { url });
  await loaded;
}

async function unlockStorefront(client, password) {
  const hasPasswordField = await evaluate(
    client,
    `Boolean(document.querySelector('input[name="password"]'))`
  );

  if (!hasPasswordField) return false;

  const loaded = client.waitForEvent('Page.loadEventFired', 20000);
  await evaluate(
    client,
    `(() => {
      const input = document.querySelector('input[name="password"]');
      const form = document.querySelector('form[action="/password"]');
      if (!input || !form) return false;
      input.value = ${JSON.stringify(password)};
      input.dispatchEvent(new Event('input', { bubbles: true }));
      form.submit();
      return true;
    })()`
  );
  await loaded;
  return true;
}

async function captureViewport(client, outputPath, width, height) {
  await setViewport(client, width, height);
  await evaluate(client, 'window.scrollTo(0, 0)');
  await sleep(1200);

  const screenshot = await client.send('Page.captureScreenshot', {
    format: 'png',
    fromSurface: true,
    clip: {
      x: 0,
      y: 0,
      width,
      height,
      scale: 1,
    },
  });

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, Buffer.from(screenshot.data, 'base64'));
}

async function main() {
  const url = getArg('--url');
  const password = getArg('--password');
  const outdir = getArg('--outdir');
  const debugUrl = getArg('--debug-url', DEFAULT_DEBUG_URL);
  const sizes = parseSizes(getArg('--sizes'));

  if (!url || !password || !outdir) {
    throw new Error('Usage: node capture-preview.mjs --url <url> --password <password> --outdir <dir>');
  }

  const targets = await fetchJson(`${debugUrl}/json/list`);
  const pageTarget = targets.find((target) => target.type === 'page' && target.webSocketDebuggerUrl);

  if (!pageTarget) {
    throw new Error('No debuggable Chrome page target found.');
  }

  const client = new CdpClient(pageTarget.webSocketDebuggerUrl);
  await client.connect();

  try {
    await client.send('Page.enable');
    await client.send('Runtime.enable');
    await client.send('Network.enable');

    await setViewport(client, sizes[0].width, sizes[0].height);
    await navigate(client, url);
    await unlockStorefront(client, password);
    await waitForSelector(client, '.sandstone-media-stage', 20000);

    for (const { width, height } of sizes) {
      const outputPath = path.join(outdir, `horizon-${width}x${height}.png`);
      await captureViewport(client, outputPath, width, height);
    }
  } finally {
    await client.close();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
