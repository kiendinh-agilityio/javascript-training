import { AuthenController } from '../controllers/authen';
import { AuthenView } from '../views/authen';

const authenPage = () => {
  new AuthenController(new AuthenView(document));
};

authenPage();
