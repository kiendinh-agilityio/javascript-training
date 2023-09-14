import { NAV_ITEMS } from '../constants/index'

const generateSideNav = NAV_ITEMS.map((nav) => {
  return `
    <li>
      <a href="${nav.href}" class="d-flex items-center nav-item ${nav.href === window.location.pathname ? 'nav-active' : ''}">
        <img
          loading="lazy"
          width="24px"
          height="24px"
          src="${nav.img}"
          alt="${nav.name}"
        />
        <span>${nav.name}</span>
      </a>
    </li>`
}).join('')

const renderSideNav = () => {
  const navigationList = document.getElementById('side-nav')
  console.log(navigationList)
  navigationList.innerHTML = generateSideNav
}

export { renderSideNav }
