import { NAV_ITEMS } from '../constants/index';

const generateSideNav = NAV_ITEMS.map((nav) => {
  const { NAME, IMG, HREF, ALT } = nav;

  return `
    <li>
      <a href="${HREF}" class="d-flex items-center nav-item ${
        HREF === window.location.pathname ? 'nav-active' : ''
      }">
        <img
          loading="lazy"
          width="24px"
          height="24px"
          src="${IMG}"
          alt="${ALT}"
        />
        <span>${NAME}</span>
      </a>
    </li>`;
}).join('');

const renderSideNav = () => {
  const navigationList = document.getElementById('side-nav');
  navigationList.innerHTML = generateSideNav;
};

export { renderSideNav };
