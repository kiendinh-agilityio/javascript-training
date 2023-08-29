import { defaultFurniture } from './furniture-data.js';
import { createElement } from './template';
import {
  getFavoriteFurnitureFromLocalStorage,
  setFavoriteFurnitureToLocalStorage,
  changeIcon,
  addFavorite
} from './helper.js';
import { handleAddEventListenerNavMenu } from './navbar.js';

const favoritesList = document.querySelector('.favorites-list');
let favoriteItems = getFavoriteFurnitureFromLocalStorage();

const filterFavoriteItems = (favoriteItemId) => {
  return defaultFurniture
    .reduce((favoriteValue, currentValue) => {
      const findFavorite = favoriteItemId.indexOf(currentValue.id);
      if (findFavorite >= 0) favoriteValue.push(currentValue);
      return favoriteValue;
    }, [])
    .map(item => {
      return {
        ...item,
        isFavorite: true
      };
    });
};

// Render favorites list
const renderListFavoriteFurniture = (filterFavoriteList) => {
  while (favoritesList.hasChildNodes()) {
    favoritesList.removeChild(favoritesList.firstChild);
  };
  const listFavorite = filterFavoriteList;
  listFavorite.forEach((furniture) => {
    favoritesList.insertAdjacentHTML('beforeend', createElement(furniture));
  });
};

// Hanlde Favorite
const handleAddEventListenerForFavoriteButton = () => {
  const favoriteItemId = getFavoriteFurnitureFromLocalStorage();
  renderListFavoriteFurniture(filterFavoriteItems(favoriteItemId));
  removeFavorite(favoriteItems);
};

// Remove furniture item from favorites list
const btnRemoveFunc = (btn) => {
  if (confirm("Are you sure you want to remove it from favorites list?")) {
    const furnitureItem = btn.parentElement.parentElement;
    const furnitureList = furnitureItem.parentElement;
    const favoriteId = furnitureItem.getAttribute('data-id');
    favoriteItems = favoriteItems.filter(item => item !== favoriteId);
    setFavoriteFurnitureToLocalStorage(favoriteItems);
    if (furnitureList.classList.contains('favorites-list')) {
      furnitureItem.remove();
    } else {
      changeIcon(btn, 'remove');
    };
  };
};

const removeFavorite = (favoriteItems) => {
  const btnRemoveFavorite = document.querySelectorAll('.favorites-list .btn-favorite');
  btnRemoveFavorite.forEach(btn => {
    btn.addEventListener('click', () => {
      btnRemoveFunc(btn, favoriteItems);
    });
  });
};

window.addEventListener('DOMContentLoaded', () => {
  // Add favorite
  addFavorite();
  // Favorites List
  handleAddEventListenerForFavoriteButton();
  // Navigation bar
  handleAddEventListenerNavMenu();
});
