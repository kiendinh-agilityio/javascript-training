import { handleTogglePassword } from '../utils/index';
import { AuthenController } from '../controllers/authen';
import { AuthenView } from '../views/authen';

const authenPage = () => {
  new AuthenController(new AuthenView());
};

authenPage();

// Call the function to handle the show password
handleTogglePassword();
