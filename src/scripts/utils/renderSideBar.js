import { MAIN_SIDEBAR_ITEMS, SUB_SIDEBAR_ITEMS } from '../constants/index';

const generateMainSideNav = MAIN_SIDEBAR_ITEMS.map((item) => {
  const { URL, ALT } = item;

  return `
    <li>
      <a href="#" class="d-flex items-center nav-item">
        <img
          loading="lazy"
          width="14px"
          height="14px"
          src="${URL}"
          alt="${ALT}"
        />
      </a>
    </li>`;
}).join('');

const generateSubSideNav = SUB_SIDEBAR_ITEMS.map((item) => {
  const { TEXT, URL, ALT, ACTIVE } = item;
  if (TEXT === 'FAVOURITES' || TEXT === 'ACTIVE') {
    return `
      <li class="sidebar-item-title">${item.TEXT}</li>
    `;
  } else {
    return `
      <li class="sub-sidebar-item ${ACTIVE ? 'sidebar-active' : ''}">
        <a class="flex wrapper-item" href="#">
          <img
            class="item-icon"
            src="${URL}"
            alt="${ALT}"
            width="14px"
            height="14px"
          >
          <span class="text-side-item ${
            ACTIVE ? 'sidebar-text-active' : ''
          }">${TEXT}</span>
        </a>
      </li>
    `;
  }
}).join('');

export const renderSidebar = () => {
  const mainSidebarList = document.querySelector('.main-sidebar-list');
  const subSidebarList = document.querySelector('.sub-sidebar-list');

  subSidebarList.innerHTML = generateSubSideNav;
  mainSidebarList.innerHTML = generateMainSideNav;
};

export const setupSidebarToggle = () => {
  const toggleButton = document.querySelector('.btn-menu');
  const sidebar = document.querySelector('.sidebar');

  toggleButton.addEventListener('click', () => {
    if (sidebar.style.display === 'none' || sidebar.style.display === '') {
      sidebar.style.display = 'flex';
    } else {
      sidebar.style.display = 'none';
    }
  });
};
