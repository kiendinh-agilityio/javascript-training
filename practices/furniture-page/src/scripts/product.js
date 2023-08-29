import { v4 as uuidv4 } from 'uuid';
import {
  getProductFromLocalStorage,
  setProductToLocalStorage,
} from './helper.js';
import { handleAddEventListenerNavMenu } from './navbar.js';
import { createProduct } from './template.js';

let productItems = getProductFromLocalStorage();
const domProduct = document.querySelector('.product-list');
const btnAddProduct = document.querySelector('.form-add-product');
const showModalProductDetail = document.querySelector('.product-detail-content');

const renderListProduct = (items) => {
  domProduct.innerHTML = '';
  items.forEach((product) => {
    domProduct.insertAdjacentHTML('beforeend', createProduct(product));
  });
};

const renderProduct = () => {
  //format data local vs default
  const formatData = productItems.map((item) => {
    const findProduct = productItems.indexOf(item.id);
    if (findProduct) {
      return {
        ...item,
        isProduct: true,
      };
    }
    return {
      ...item,
    };
  });
  renderListProduct(formatData);
};

// feature add new product
const addProduct = () => {
  btnAddProduct.addEventListener('submit', (x) => {
    x.preventDefault();
    const data = Object.fromEntries(new FormData(x.target).entries());
    const newData = {
      id: uuidv4(),
      ...data,
    };
    productItems.push(newData);
    setProductToLocalStorage(productItems);
    document.querySelector('.btn-close-modal').click();
    renderListProduct(productItems);
    removeProduct();
  });
};

// feature remove product
const btnRemoveProductFunc = (btn) => {
  if (confirm("Are you sure you want to remove this product?")) {
    const productItem = btn.parentElement;
    const productId = productItem.getAttribute('data-id');
    productItems = productItems.filter((item) => item.id !== productId);
    setProductToLocalStorage(productItems);
    productItem.remove();
  }
};

const removeProduct = (productItems) => {
  const btnRemoveProduct = document.querySelectorAll('.btn-remove-product');
  btnRemoveProduct.forEach((btn) => {
    btn.addEventListener('click', () => {
      btnRemoveProductFunc(btn, productItems);
    });
  });
};

// Modal detail product
// User clicks product image -> Get product id
// -> Open modal -> Get product detail by id from Product list
// -> Render Product detail view
const renderProductDetail = (product) => {
  showModalProductDetail.insertAdjacentHTML('beforeend', createProduct(product));
};

const btnCloseModalProductDetail = document.getElementById('btn-close');
const refeshModalProductDetail = () => {
  btnCloseModalProductDetail.addEventListener('click', () => {
    showModalProductDetail.innerHTML = '';
  });
};

const handleClickImageShowModalProductDetail = (image) => {
  const productDetailItem = image.parentElement.parentElement;
  const productsList = productDetailItem.parentElement;
  const productItemId = productsList.getAttribute('data-id');
  const [productDetail] = productItems.filter((item) => item.id === productItemId)
  renderProductDetail(productDetail);
}

const showProductDetail = () => {
  const allProductImages = document.querySelectorAll('.product-img')
  allProductImages.forEach(image => {
    image.addEventListener('click', () => {
      handleClickImageShowModalProductDetail(image);
    })
  })
};

window.addEventListener('DOMContentLoaded', () => {
  // Navigation bar
  handleAddEventListenerNavMenu();
  // Render list product
  renderProduct();
  // Add new product
  addProduct();
  // Remove product
  removeProduct();
  // Modal detail product
  showProductDetail();
  refeshModalProductDetail();
});
