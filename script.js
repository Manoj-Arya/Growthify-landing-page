const menuToggle = document.querySelector(".menu-toggle");
const navPanel = document.querySelector(".nav-panel");
const navLinks = document.querySelectorAll('.nav-links a, .nav-actions a');
const revealItems = document.querySelectorAll(".reveal");
const testimonialCards = Array.from(document.querySelectorAll(".testimonial-card"));
const prevButton = document.querySelector(".testimonial-arrow.prev");
const nextButton = document.querySelector(".testimonial-arrow.next");

if (menuToggle && navPanel) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navPanel.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navPanel.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
  });
}

let activeIndex = 1;

function renderTestimonials() {
  testimonialCards.forEach((card, index) => {
    card.classList.remove("is-active", "is-side");
    card.classList.add(index === activeIndex ? "is-active" : "is-side");
  });
}

function cycleTestimonials(direction) {
  activeIndex = (activeIndex + direction + testimonialCards.length) % testimonialCards.length;
  renderTestimonials();
}

if (prevButton && nextButton && testimonialCards.length) {
  prevButton.addEventListener("click", () => cycleTestimonials(-1));
  nextButton.addEventListener("click", () => cycleTestimonials(1));
  renderTestimonials();
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

revealItems.forEach((item) => revealObserver.observe(item));
