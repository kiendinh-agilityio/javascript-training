import { defaultFurniture } from './furniture-data.js';
import { createElement } from './template';
import {
  getFavoriteFurnitureFromLocalStorage,
  setFavoriteFurnitureToLocalStorage,
  changeIcon
} from './helper.js';
import { handleAddEventListenerNavMenu } from './navbar.js';

const domFurniture = document.querySelector('.furniture-list');
let favoriteItems = getFavoriteFurnitureFromLocalStorage();

const renderListFurnitures = (items) => {
  domFurniture.innerHTML = '';
  items.forEach((furniture) => {
    domFurniture.insertAdjacentHTML('beforeend', createElement(furniture));
  });
};

const renderFurniture = () => {
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

// Add furniture item to list favorites
// User click button favorite
// Listen click favorite button event => addEventListener ('click')
const btnAddFavoriteFunc = (btn) => {
  if (btn.classList.contains('btn-favorite')) {
    changeIcon(btn);
    const favoriteId = btn.getAttribute('data-id');
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

// Remove furniture item from favorites list
// const btnRemoveFunc = (btn) => {
//   if (confirm("Are you sure you want to remove it from favorites list?")) {
//     const furnitureItem = btn.parentElement.parentElement;
//     const furnitureList = furnitureItem.parentElement;
//     const favoriteId = furnitureItem.getAttribute('data-id');
//     favoriteItems = favoriteItems.filter(item => item !== favoriteId);
//     setFavoriteFurnitureToLocalStorage(favoriteItems);
//     if (furnitureList.classList.contains('favorites-list')) {
//       furnitureItem.remove();
//       const selectedFurniture = document.querySelector(`[data-id='${favoriteId}'] button`);
//       changeIcon(selectedFurniture, 'remove');
//     } else {
//       changeIcon(btn, 'remove');
//     };
//   };
// };

// const removeFavorite = (favoriteItems) => {
//   const btnRemoveFavorite = document.querySelectorAll('.favorites-list .btn-favorite');
//   btnRemoveFavorite.forEach(btn => {
//     btn.addEventListener('click', () => {
//       btnRemoveFunc(btn, favoriteItems);
//     });
//   });
// };

window.addEventListener('DOMContentLoaded', () => {
  renderFurniture();
  // Add favorite
  addFavorite();
  // Navigation bar
  handleAddEventListenerNavMenu();
});
