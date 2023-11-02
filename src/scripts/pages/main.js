import { initializeSidebar } from '../utils/index';
import { AdsController } from '../controllers/index';
import { AdsView } from '../views/index';
import { AdsModel } from '../models/index';

const homePage = () => {
  new AdsController(new AdsModel(), new AdsView());
};

homePage();
initializeSidebar();
