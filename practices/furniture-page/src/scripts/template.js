// create furniture
const createElement = (furniture) => {
  const favoriteButton =
    `
      <button class="btn-favorite d-flex p-absolute" data-id=${furniture.id}>
        <img class="icon-favorite" src="https://i.imgur.com/UnnmWMl.png" alt="Heart">
      </button>
    `
  const trashButton =
    `
      <button class="btn-favorite d-flex p-absolute" data-id=${furniture.id}>
        <img class="icon-trash" src="https://i.imgur.com/m4xuLMv.png" alt="Trash">
      </button>
    `
  const renderButton = furniture.isFavorite ? trashButton : favoriteButton;
  const furnitureTemplate =
    `
      <div class="furniture-item d-flex p-relative" data-id=${furniture.id}>
        <a class="card-header d-flex p-relative">
          <img class="furniture-thumbnail" src=${furniture.image} alt="Furniture Thumbnail">
          ${renderButton}
        </a>
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

// Create Product
const createProduct = (product) => {
  const productTemplate =
    `
      <div class="d-flex product-item" data-id=${product.id}>
        <div class="d-flex product-detail">
          <a href="#modal-detail-product"><img class="product-img" src=${product.image} alt="Product"></a>
          <ul class="d-flex product-content">
            <li class="product-name"><a href="#modal-detail-product">${product.name}</a></li>
            <li class="product-description">${product.description}</li>
            <li class="product-size">
              <p>Size:</p>
              <p>${product.length}, <span class="active">${product.width}</span></p>
            </li>
            <li class="product-price">${product.price}</li>
          </ul>
        </div>
        <button class="btn-remove-product" data-id=${product.id}>
          <img class="icon-remove" src="https://i.imgur.com/YfFcjgm.png" alt="Trash">
        </button>
      </div>
    `
  return productTemplate;
}

export {
  createElement,
  createProduct
};
