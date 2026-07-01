const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('#navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const form = document.querySelector('#contactForm');
const message = document.querySelector('#formMessage');

if (form && message) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const text = form.message.value.trim();

    message.classList.remove('error');

    if (!name || !email || !text) {
      message.textContent = 'Vyplňte prosím meno, e-mail a správu.';
      message.classList.add('error');
      return;
    }

    message.textContent = 'Ďakujeme, váš dopyt bol pripravený na odoslanie.';
    form.reset();
  });
}
