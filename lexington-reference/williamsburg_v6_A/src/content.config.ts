import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const store = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/store" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      category: z.string(),
      price: z.string(),
      checkout: z.string(),
      returns: z.string().optional(),
      shipping: z.string().optional(),
      license: z.string(),
      description: z.string(),
      highlights: z.array(z.string()),
      thumbnail: z.object({
        url: image(),
        alt: z.string(),
      }),
      images: z
        .array(
          z.object({
            url: image(),
            alt: z.string().optional(),
          })
        )
        .optional(),
      testimonials: z
        .array(
          z.object({
            name: z.string(),
            date: z.string(),
            text: z.string(),
            img: z.string(),
          })
        )
        .optional(),
      tags: z.array(z.string()),
    }),
});

const helpcenter = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/helpcenter" }),
  schema: z.object({
    title: z.string(),
    intro: z.string(),
  }),
});

const legal = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/legal" }),
  schema: z.object({
    page: z.string(),
    pubDate: z.date(),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      pubDate: z.date(),
      description: z.string(),
      author: z.string(),
      image: z.object({
        url: image(),
        alt: z.string(),
      }),
      tags: z.array(z.string()),
    }),
});

export const collections = {
  store,
  helpcenter,
  legal,
  posts,
};
