/**
 * Sandstone homepage interactions (projects slider, testimonials slider, services tabs).
 * Loaded once with defer on the index template; keeps section Liquid free of duplicate inline scripts.
 */
(function () {
  function initProjects() {
    document.querySelectorAll('[data-sandstone-projects]').forEach(function (section) {
      const slider = section.querySelector('[data-project-slider]');
      const slides = Array.from(section.querySelectorAll('.sandstone-project-slide'));
      const previousButton = section.querySelector('[data-project-prev]');
      const nextButton = section.querySelector('[data-project-next]');
      const year = section.querySelector('[data-project-year]');
      const title = section.querySelector('[data-project-title]');
      const location = section.querySelector('[data-project-location]');
      let activeIndex = 0;

      function updateProject(index) {
        const slide = slides[index];
        if (!slide) return;

        activeIndex = index;

        if (year) year.textContent = slide.dataset.year || '';
        if (title) title.textContent = slide.dataset.title || '';
        if (location) location.textContent = slide.dataset.location || '';

        if (slider) {
          slider.scrollTo({
            left: slide.offsetLeft,
            behavior: 'smooth',
          });
        }
      }

      if (previousButton) {
        previousButton.addEventListener('click', function () {
          updateProject((activeIndex - 1 + slides.length) % slides.length);
        });
      }

      if (nextButton) {
        nextButton.addEventListener('click', function () {
          updateProject((activeIndex + 1) % slides.length);
        });
      }

      updateProject(0);
    });
  }

  function initTestimonials() {
    document.querySelectorAll('[data-sandstone-testimonials]').forEach(function (section) {
      const slider = section.querySelector('[data-testimonial-slider]');
      const cards = Array.from(section.querySelectorAll('.sandstone-testimonial-card'));
      const previousButton = section.querySelector('[data-testimonial-prev]');
      const nextButton = section.querySelector('[data-testimonial-next]');
      let activeIndex = 0;

      function scrollToCard(index) {
        const card = cards[index];
        if (!card || !slider) return;

        activeIndex = index;
        slider.scrollTo({
          left: card.offsetLeft,
          behavior: 'smooth',
        });
      }

      if (previousButton) {
        previousButton.addEventListener('click', function () {
          scrollToCard((activeIndex - 1 + cards.length) % cards.length);
        });
      }

      if (nextButton) {
        nextButton.addEventListener('click', function () {
          scrollToCard((activeIndex + 1) % cards.length);
        });
      }

      scrollToCard(0);
    });
  }

  function initServices() {
    document.querySelectorAll('[data-sandstone-services]').forEach(function (section) {
      const buttons = Array.from(section.querySelectorAll('[data-service-trigger]'));
      const images = Array.from(section.querySelectorAll('[data-service-image]'));
      const description = section.querySelector('[data-service-description]');
      let activeIndex = 0;

      function setActive(index) {
        activeIndex = index;

        buttons.forEach(function (button, buttonIndex) {
          const isActive = buttonIndex === index;
          button.classList.toggle('is-active', isActive);
          button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });

        images.forEach(function (image, imageIndex) {
          image.classList.toggle('is-active', imageIndex === index);
        });

        if (description && buttons[index]) {
          const fromData = buttons[index].getAttribute('data-service-description');
          if (fromData) {
            description.textContent = fromData;
          }
        }
      }

      buttons.forEach(function (button, index) {
        button.addEventListener('click', function () {
          if (index !== activeIndex) {
            setActive(index);
          }
        });
      });

      setActive(activeIndex);
    });
  }

  initProjects();
  initTestimonials();
  initServices();
})();
