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

export { createElement };
