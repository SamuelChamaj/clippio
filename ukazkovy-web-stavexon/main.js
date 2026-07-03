const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll(".main-nav a");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    menuToggle.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      menuToggle.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
  });
}

const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return phone.replace(/[^0-9+]/g, "").length >= 9;
}

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = contactForm.name?.value.trim() || "";
    const email = contactForm.email?.value.trim() || "";
    const phone = contactForm.phone?.value.trim() || "";
    const service = contactForm.service?.value.trim() || "";
    const location = contactForm.location?.value.trim() || "";
    const message = contactForm.message?.value.trim() || "";
    formStatus.className = "form-status";

    if (!name || !email || !phone || !service || !location || !message) {
      formStatus.textContent = "Vyplňte prosím meno, e-mail, telefón, typ služby, lokalitu a popis požiadavky.";
      formStatus.classList.add("error");
      return;
    }

    if (!isValidEmail(email)) {
      formStatus.textContent = "Zadajte prosím platný e-mail.";
      formStatus.classList.add("error");
      return;
    }

    if (!isValidPhone(phone)) {
      formStatus.textContent = "Zadajte prosím platné telefónne číslo.";
      formStatus.classList.add("error");
      return;
    }

    formStatus.textContent = "Ďakujeme. V reálnej verzii by sa dopyt odoslal na e-mail firmy.";
    formStatus.classList.add("success");
    contactForm.reset();
  });
}

const animatedElements = document.querySelectorAll([
  ".section-heading",
  ".stat-card",
  ".service-card",
  ".project-card",
  ".process-step",
  ".values-grid article",
  ".values-four-grid article",
  ".service-detail-card",
  ".before-after-card",
  ".contact-card",
  ".contact-form",
  ".faq-list details",
  ".cta-box"
].join(","));

if (animatedElements.length) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    animatedElements.forEach((element) => element.classList.add("is-visible"));
  } else if ("IntersectionObserver" in window) {
    animatedElements.forEach((element) => element.classList.add("reveal-on-scroll"));

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -40px 0px" });

    animatedElements.forEach((element) => revealObserver.observe(element));
  } else {
    animatedElements.forEach((element) => element.classList.add("is-visible"));
  }
}
