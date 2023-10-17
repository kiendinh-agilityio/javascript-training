import { renderSideNav } from './side-nav/renderSideNav';
import { generateUsersTable } from './templates/renderListUsers';
import { getUserFromLocalStorage } from './mocks/listUsers';
import { eventLoader } from './events/index';

const InitialApp = () => {
  eventLoader();
};

renderSideNav();
generateUsersTable(getUserFromLocalStorage);
InitialApp();
