import { FURNITURE_LOCAL_STORAGE_KEY } from './constant.js';
import { PRODUCT_LOCAL_STORAGE_KEY } from './constant.js';

// Local Storage List Favorites
const getFavoriteFurnitureFromLocalStorage = () => {
  const itemFurniture = localStorage.getItem(FURNITURE_LOCAL_STORAGE_KEY);
  const parseListFurniture = JSON.parse(itemFurniture);
  const listFurniture = parseListFurniture || [];
  return listFurniture;
};

const setFavoriteFurnitureToLocalStorage = (items) => {
  localStorage.setItem(FURNITURE_LOCAL_STORAGE_KEY, JSON.stringify(items));
};

// Local Storage List Product
const getProductFromLocalStorage = () => {
  const itemProduct = localStorage.getItem(PRODUCT_LOCAL_STORAGE_KEY);
  const parseListProduct = JSON.parse(itemProduct);
  const listProduct = parseListProduct || [];
  return listProduct;
};

const setProductToLocalStorage = (items) => {
  localStorage.setItem(PRODUCT_LOCAL_STORAGE_KEY, JSON.stringify(items));
};

// Change icon-favorite with icon-trash
const changeIcon = (node, type = 'add') => {
  let typeObj = {};
  if (type === 'add') {
    typeObj = {
      classNameIcon: '.icon-favorite',
      img: '<img class="icon-trash" src="https://i.imgur.com/m4xuLMv.png" alt="Trash">',
    };
  } else {
    typeObj = {
      classNameIcon: '.icon-trash',
      img: '<img class="icon-favorite" src="https://i.imgur.com/UnnmWMl.png" alt="Favorite">',
    };
  };
  node.removeChild(node.querySelector(typeObj.classNameIcon));
  node.insertAdjacentHTML('beforeend', typeObj.img);
};

// add furniture from favorites
const addFavorite = () => {
  const btnAddFavorite = document.querySelectorAll('.btn-favorite');
  btnAddFavorite.forEach(btn => {
    btn.onclick = function () {
      btnAddFavoriteFunc(btn);
    };
  });
};

export {
  getFavoriteFurnitureFromLocalStorage,
  setFavoriteFurnitureToLocalStorage,
  getProductFromLocalStorage,
  setProductToLocalStorage,
  changeIcon,
  addFavorite
};
