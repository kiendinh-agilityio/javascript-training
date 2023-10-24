import { generateUsersTable } from '../templates/renderListUsers';
import { getUserFromLocalStorage, saveUserListToLocalStorage } from '../services/index';
import {
  formattedDate,
  delayActions,
  showToast,
} from '../utils/index';
import {
  TOAST_MESSAGE,
  ROLE_USER,
} from '../constants/index';

// This function updates the user list and calls a callback after the update is complete.
const updateUsers = (callback) => {
  saveUserListToLocalStorage(); // Save the user list to Local Storage

  delayActions(() => {
    generateUsersTable(getUserFromLocalStorage); // Generate the user table

    // Call a callback to display a toast message
    callback && callback();
  });
};

// This function adds a new user to the list.
export const addNewUser = (userData) => {
  const userLength = getUserFromLocalStorage.length;
  const currentUserId = userLength > 0 ? getUserFromLocalStorage[userLength - 1].id + 1 : 1;

  const newUser = {
    id: currentUserId,
    ...userData,
    roleId: userData.role.includes('Admin') ? ROLE_USER.ADMIN : ROLE_USER.EMPLOYEE,
    date: formattedDate(),
  };

  // Add a new user to the list
  getUserFromLocalStorage.push(newUser);

  // Show a toast message when added successfully
  updateUsers(() => showToast(TOAST_MESSAGE.ADD_USER));
};

// This function edits the information of a user.
export const editUser = (userData, user) => {
  const { firstName, lastName, email, phone, role } = user;

  userData.firstName = firstName;
  userData.lastName = lastName;
  userData.email = email;
  userData.phone = phone;
  userData.role = role;
  userData.roleId = role.includes('Admin') ? ROLE_USER.ADMIN : ROLE_USER.EMPLOYEE;

  // Show a toast message when edited successfully
  updateUsers(() => showToast(TOAST_MESSAGE.EDIT_USER));
};
