// Navigation bar
const navToggler = document.querySelector('.nav-toggler');
const navMenu = document.querySelector('.header-navbar');
const navLinks = document.querySelector('.header-nav-list');

const handleAddEventListenerNavMenu = () => {
  // toggler icon click event
  navToggler.addEventListener('click', togglerClickHandler);
  // nav links click event
  navLinks.forEach(x => x.addEventListener('click', navLinkClickHandler));
};

const togglerClickHandler = () => {
  navToggler.classList.toggle('toggler-open');
  navMenu.classList.toggle('nav-menu-open');
};

const navLinkClickHandler = () => {
  if(navMenu.classList.contains('nav-menu-open')) {
    navToggler.click();
  }
}

export { handleAddEventListenerNavMenu };
