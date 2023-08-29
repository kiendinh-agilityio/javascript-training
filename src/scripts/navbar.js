// Navigation bar
const navToggler = document.querySelector('.nav-toggler');
const navMenu = document.querySelector('.header-navbar');

const handleAddEventListenerNavMenu = () => {
  // toggler icon click event
  navToggler.addEventListener('click', togglerClickHandler);
};

const togglerClickHandler = () => {
  navToggler.classList.toggle('toggler-open');
  navMenu.classList.toggle('nav-menu-open');
};

export { handleAddEventListenerNavMenu };
