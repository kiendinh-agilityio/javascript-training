import { defaultFurniture } from './furniture-data.js';
import {
  getFavoriteFurnitureFromLocalStorage,
  setFavoriteFurnitureToLocalStorage,
} from './helper.js';
import { handleAddEventListenerNavMenu } from './navbar.js';

// render furniture
const renderFurniture = (furniture) => {
  const favoriteButton =
    `
      <button class="btn-favorite btn-add-favorite d-flex p-absolute" data-id=${furniture.id}>
        <img class="icon-favorite" src="https://i.imgur.com/UnnmWMl.png" alt="Heart">
      </button>
    `
  const trashButton =
    `
      <button class="btn-favorite btn-remove-favorite d-flex p-absolute" data-id=${furniture.id}>
        <img class="icon-trash" src="https://i.imgur.com/m4xuLMv.png" alt="Trash">
      </button>
    `
  const renderButton = furniture.isFavorite ? trashButton : favoriteButton;
  const furnitureTemplate =
    `
      <div class="furniture-item d-flex p-relative" data-id=${furniture.id}>
        <div class="card-header d-flex p-relative">
          <img class="furniture-thumbnail" src=${furniture.image} alt="Furniture Thumbnail">
          ${renderButton}
        </div>
        <div class="card-body d-flex p-absolute">
          <div class="furniture-description">
            <p class="furniture-name">${furniture.name}</p>
            <p class="furniture-price">${furniture.price}</p>
          </div>
        </div>
      </div>
    `
  return furnitureTemplate;
};

const btnFavoriteList = document.querySelector('.btn-list-favorites');
const domFurniture = document.querySelector('.furniture-list');
const favoritesList = document.querySelector('.favorites-list');
const modalClose = document.querySelector('.btn-close-modal');
let favoriteItems = getFavoriteFurnitureFromLocalStorage();

const renderListFurnitures = (items) => {
  domFurniture.innerHTML = '';
  items.forEach((furniture) => {
    domFurniture.insertAdjacentHTML('beforeend', renderFurniture(furniture));
  });
};

const loadData = () => {
  //format data local vs default
  const formatData = defaultFurniture.map(item => {
    const findFavorite = favoriteItems.indexOf(item.id);
    if (findFavorite >= 0) {
      return {
        ...item,
        isFavorite: true
      };
    };
    return {
      ...item
    };
  });
  renderListFurnitures(formatData);
};

const filterFavoriteItems = (favoriteItemsTemp) => {
  return defaultFurniture
    .reduce((accumulator, currentValue) => {
      const findFavorite = favoriteItemsTemp.indexOf(currentValue.id);
      if (findFavorite >= 0) accumulator.push(currentValue);
      return accumulator;
    }, [])
    .map(item => {
      return {
        ...item,
        isFavorite: true
      };
    });
};

// Show modal
const openModal = () => {
  btnFavoriteList.addEventListener('click', () => {
    const showModal = document.getElementById('Favorite-modal');
    showModal.classList.add('modal-open');
    const favoriteItemsTemp = getFavoriteFurnitureFromLocalStorage();
    renderListFavoriteFurniture(filterFavoriteItems(favoriteItemsTemp));
    removeFavorite(favoriteItems);
  });
};

const closeModal = () => {
  modalClose.addEventListener('click', () => {
    const showModal = document.getElementById('Favorite-modal');
    showModal.classList.remove('modal-open');
  });
};

// list favorites
const renderListFavoriteFurniture = (filterFavoriteList) => {
  while (favoritesList.hasChildNodes()) {
    favoritesList.removeChild(favoritesList.firstChild);
  };
  const listFavorite = filterFavoriteList;
  listFavorite.forEach((furniture) => {
    favoritesList.insertAdjacentHTML('beforeend', renderFurniture(furniture));
  });
};

// Add furniture item to list favorites
// User click button favorite
// Listen click favorite button event => addEventListener ('click')
const btnAddFavoriteFunc = (btn) => {
  let parentElement = btn.parentElement.parentElement;
  if (btn.classList.contains('btn-add-favorite')) {
    changeIcon(btn);
    const favoriteId = parentElement.getAttribute('data-id');
    favoriteItems.push(favoriteId);
    setFavoriteFurnitureToLocalStorage(favoriteItems);
  } else {
    btnRemoveFunc(btn);
  };
};

const addFavorite = () => {
  const btnAddFavorite = document.querySelectorAll('.btn-favorite');
  btnAddFavorite.forEach(btn => {
    btn.onclick = function () {
      btnAddFavoriteFunc(btn);
    };
  });
};

// Change icon-favorite with icon-trash
const changeIcon = (node, type = 'add') => {
  let typeObj = {};
  if (type === 'add') {
    typeObj = {
      classNameIcon: '.icon-favorite',
      img: '<img class="icon-trash" src="https://i.imgur.com/m4xuLMv.png" alt="Trash">',
      addClassName: 'btn-remove-favorite',
      removeClassName: 'btn-add-favorite'
    };
  } else {
    typeObj = {
      classNameIcon: '.icon-trash',
      img: '<img class="icon-favorite" src="https://i.imgur.com/UnnmWMl.png" alt="Favorite">',
      addClassName: 'btn-add-favorite',
      removeClassName: 'btn-remove-favorite'
    };
  };
  node.removeChild(node.querySelector(typeObj.classNameIcon));
  node.insertAdjacentHTML('beforeend', typeObj.img);
  node.classList.add(typeObj.addClassName);
  node.classList.remove(typeObj.removeClassName);
};

// Remove furniture item from favorites list
const btnRemoveFunc = (btn) => {
  if (confirm("Are you sure you want to remove it from favorites list?")) {
    let parentElement = btn.parentElement.parentElement;
    const checkParentList = parentElement.parentElement;
    const favoriteId = parentElement.getAttribute('data-id');
    favoriteItems = favoriteItems.filter(item => item !== favoriteId);
    setFavoriteFurnitureToLocalStorage(favoriteItems);
    if (checkParentList.classList.contains('favorites-list')) {
      parentElement.remove();
      const selectedFurniture = document.querySelector(`[data-id='${favoriteId}'] button`);
      changeIcon(selectedFurniture, 'remove');
    } else {
      changeIcon(btn, 'remove');
    };
  };
};

const removeFavorite = (favoriteItems) => {
  const btnRemoveFavorite = document.querySelectorAll('.favorites-list .btn-remove-favorite');
  btnRemoveFavorite.forEach(btn => {
    btn.addEventListener('click', () => {
      btnRemoveFunc(btn, favoriteItems);
    });
  });
};

window.addEventListener('DOMContentLoaded', () => {
  loadData();
  // Add favorite
  addFavorite();
  // Show modal
  openModal();
  closeModal();
  // Navigation bar
  handleAddEventListenerNavMenu();
});
