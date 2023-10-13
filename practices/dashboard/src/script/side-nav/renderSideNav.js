import { NAV_ITEMS } from '../constants/index';

const generateSideNav = NAV_ITEMS.map((nav) => {
  const { href, img, name, alt } = nav;

  return `
    <li>
      <a href="${nav.href}" class="d-flex items-center nav-item ${
        href === window.location.pathname ? 'nav-active' : ''
      }">
        <img
          loading="lazy"
          width="24px"
          height="24px"
          src="${img}"
          alt="${alt}"
        />
        <span>${name}</span>
      </a>
    </li>`;
}).join('');

const renderSideNav = () => {
  const navigationList = document.getElementById('side-nav');
  navigationList.innerHTML = generateSideNav;
};

export { renderSideNav };
