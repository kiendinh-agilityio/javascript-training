import { renderSideNav } from './side-nav/renderSideNav';
import { generateUsersTable } from './templates/renderListUsers';
import { getUserFromLocalStorage } from './services/index';
import { eventLoader } from './events/index';

const InitialApp = () => {
  eventLoader();
};

renderSideNav();
generateUsersTable(getUserFromLocalStorage);
InitialApp();
