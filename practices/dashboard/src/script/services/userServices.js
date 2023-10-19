import {
  startLoadingSpinner,
  stopLoadingSpinner,
} from '../utils/loadingSpinner';
import { generateUsersTable } from '../templates/renderListUsers';
import { LIST_USERS } from '../mocks/listUsers';

/**
 * Get user from local storage
 */
let getUserFromLocalStorage =
  JSON.parse(localStorage.getItem('listUsers')) || [];

const fetchUsers = async () => {
  if (!getUserFromLocalStorage.length) {
    // Display the loading spinner before loading data
    startLoadingSpinner();

    // Simulates 1 seconds to load data (use await for actual task)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Save the user list to localStorage and update the userLocalStorage variable
    localStorage.setItem('listUsers', JSON.stringify(LIST_USERS));
    getUserFromLocalStorage = LIST_USERS;

    generateUsersTable();

    // Hidden loading spinner
    stopLoadingSpinner();
  }
};

fetchUsers();

export { getUserFromLocalStorage };
