import { PRODUCT_LOCAL_STORAGE_KEY } from './constant.js';

const getFavoriteFurnitureFromLocalStorage = () => {
  const itemFurniture = localStorage.getItem(PRODUCT_LOCAL_STORAGE_KEY);
  const parseListFurniture = JSON.parse(itemFurniture);
  const listFurniture = parseListFurniture || [];
  return listFurniture;
};

const setFavoriteFurnitureToLocalStorage = (items) => {
  localStorage.setItem(PRODUCT_LOCAL_STORAGE_KEY, JSON.stringify(items));
};

export {
  getFavoriteFurnitureFromLocalStorage,
  setFavoriteFurnitureToLocalStorage
};
