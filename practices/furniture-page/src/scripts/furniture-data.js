import { PRODUCT_LOCAL_STORAGE_KEY } from './constant.js';

const defaultFurniture = [
  {
    id: '9bd88c49-d7e0-403e-ab55-6c329ae8d77e',
    image: 'https://i.imgur.com/zXSLHZj.png',
    name: 'Sverom chair',
    price: 'N65,000'
  },
  {
    id: '056eb572-c1ec-409b-8577-6b2b62276c31',
    image: 'https://i.imgur.com/DSZtlRT.png',
    name: 'Sverom chair',
    price: 'N65,000'
  },
  {
    id: '4f998f74-e848-4e0f-bede-459901a8d035',
    image: 'https://i.imgur.com/BaBRPNC.png',
    name: 'Sverom chair',
    price: 'N65,000'
  },
  {
    id: 'a332332e-827e-4aae-b36a-a873de49deda',
    image: 'https://i.imgur.com/zESvZxF.png',
    name: 'Sverom chair',
    price: 'N65,000'
  }
];

const defaultProduct = [
  {
    id: '7daccba2-0515-42dd-96b9-4eb1e7c34172',
    image: 'https://i.imgur.com/kso5QKH.png',
    name: 'Mini Blue Chair',
    description: 'Find a bright ideal to suit your taste with our great selection of suspension, wall, floor and table lights. breathable Walking',
    length: 'Length-34cm',
    width: 'Width-56cm',
    price: 'N65,000'
  },
  {
    id: 'e7fbbdb6-4610-4d51-9fae-a5cf58fa5d5d',
    image: 'https://i.imgur.com/qInEhkj.png',
    name: 'Mini Blue Chair',
    description: 'Find a bright ideal to suit your taste with our great selection of suspension, wall, floor and table lights. breathable Walking',
    length: 'Length-34cm',
    width: 'Width-56cm',
    price: 'N65,000'
  },
  {
    id: '5e9f37f5-bcf2-4e77-81a6-bd2acc42e4cf',
    image: 'https://i.imgur.com/EJcRUYi.png',
    name: 'Mini Blue Chair',
    description: 'Find a bright ideal to suit your taste with our great selection of suspension, wall, floor and table lights. breathable Walking',
    length: 'Length-34cm',
    width: 'Width-56cm',
    price: 'N65,000'
  },
  {
    id: '14f9ecc2-fab7-4934-94ba-3fc3b49570fd',
    image: 'https://i.imgur.com/OdIgCkL.png',
    name: 'Mini Blue Chair',
    description: 'Find a bright ideal to suit your taste with our great selection of suspension, wall, floor and table lights. breathable Walking',
    length: 'Length-34cm',
    width: 'Width-56cm',
    price: 'N65,000'
  }
];

const data = localStorage.getItem(PRODUCT_LOCAL_STORAGE_KEY);
if (!data) {
  localStorage.setItem(PRODUCT_LOCAL_STORAGE_KEY, JSON.stringify(defaultProduct));
}

export {
  defaultFurniture,
  defaultProduct
};
