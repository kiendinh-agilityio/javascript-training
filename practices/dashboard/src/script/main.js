import { renderSideNav } from './side-nav/renderSideNav';
import { generateUsersTable } from './templates/renderListUsers';
import { getUserFromLocalStorage } from './mocks/list-users';
import { isStringMatched } from './utils';
import { generateModalUser } from './templates/generateModalUser';
import { validateUserForm } from './validate';
import { showFormErrors } from './templates/showFormErrors';
import { formattedDate, loadingSpinner } from './constants/index';

// Variables scope
const firstNameUser = '#first-name';
const lastNameUser = '#last-name';
const emailUser = '#email';
const phoneUser = '#phone';
const roleTypeUser = '#role-type';
const hiddenClass = 'none';
const flexClass = 'flex';

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const listUsers = document.getElementById('list-users');
const deleteModal = document.getElementById('delete-modal');
const confirmDeleteButton = document.getElementById('confirm-delete');
const cancelDeleteButton = document.getElementById('cancel-delete');
const closeDeleteModalButton = document.getElementById('close-modal');
const btnAddUser = document.getElementById('btn-add');
const modalElement = document.getElementById('modal');

// Variable to store the current user ID
let currentUserId =
  getUserFromLocalStorage.length > 0
    ? getUserFromLocalStorage[getUserFromLocalStorage.length - 1].id + 1
    : 1;

/**
 * Handle the feature for search users
 * Create a debounce function
 */
const debounce = (func, delay) => {
  let timeoutId;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
};

// Handle the search when users the search button is pressed
searchButton.addEventListener('click', () => {
  performSearchWithSpinner();
});

// Handle searches as the user types and presses Enter with debounce
const debouncedSearch = debounce('performSearch', 300); // Debounce timeout is 300 ms

searchInput.addEventListener('input', () => {
  debouncedSearch();
});

const performSearchWithSpinner = () => {
  // Show the loading spinner when performing the search
  loadingSpinner.start();

  // Perform the search
  performSearch();
};

const performSearch = () => {
  const searchTerm = searchInput.value.toLowerCase().trim();

  // Search in the list users
  const searchResults = getUserFromLocalStorage.filter((user) => {
    const nameMatch = isStringMatched(user.firstName + ' ' + user.lastName, searchTerm);
    const emailMatch = isStringMatched(user.email, searchTerm);
    const phoneMatch = isStringMatched(user.phone, searchTerm);
    return nameMatch || emailMatch || phoneMatch;
  });

  // Hide the loading spinner after the search is complete
  setTimeout(() => {
    loadingSpinner.stop();

    generateUsersTable(searchResults);
  }, 200);
};

// Handle searches as the user types and presses Enter
searchInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();

    // Perform a search immediately when the user presses Enter
    performSearchWithSpinner();
  }
});

/**
 * Handle the Delete User event
 */
let userDelete;

listUsers.addEventListener('click', (event) => {
  const deleteButton = event.target.closest('.btn-delete');
  const userId = parseInt(deleteButton.getAttribute('data-id'));

  // Get user information to delete
  userDelete = getUserFromLocalStorage.find((user) => user.id === userId);

  // Display modal
  showDeleteModal();
});

// Handle the event when the user clicks "Yes"
confirmDeleteButton.addEventListener('click', () => {
  // Close the modal
  hideDeleteModal();

  // Show the loading spinner when the user confirms the deletion
  loadingSpinner.start();

  // Simulate a delay of 2 seconds for demonstration purposes (you can adjust this)
  setTimeout(() => {
    const userIndex = getUserFromLocalStorage.findIndex(
      (user) => user.id === userDelete.id,
    );

    if (userIndex !== -1) {
      getUserFromLocalStorage.splice(userIndex, 1);
      localStorage.setItem('listUsers', JSON.stringify(getUserFromLocalStorage));
      generateUsersTable(getUserFromLocalStorage);
    }

    // Hide the loading spinner after the deletion is complete
    loadingSpinner.stop();
  }, 300);
});

// Handle the event when the user presses "No" or closes the modal
cancelDeleteButton.addEventListener('click', () => {
  // Close the modal
  hideDeleteModal();
});

// Handle the event when the user presses the "Close" button
closeDeleteModalButton.addEventListener('click', () => {
  // Close the modal
  hideDeleteModal();
});

// Use the click event to catch when the user clicks on the gray background around the modal
window.addEventListener('click', (event) => {
  if (event.target === deleteModal) {
    hideDeleteModal();
  }

  if (event.target === modalElement) {
    modalElement.style.display = hiddenClass;
  }
});

// Modal Delete
const showDeleteModal = () => {
  deleteModal.style.display = flexClass;
};

const hideDeleteModal = () => {
  deleteModal.style.display = hiddenClass;
};

/**
 * Handle add new users for list users
 * Click button add user show modal add user
 */
btnAddUser.addEventListener('click', () => {
  const modalElement = document.getElementById('modal');
  modalElement.style.display = flexClass;
  modalElement.innerHTML = generateModalUser();

  const addUserSubmitButton = document.getElementById('add-user-submit');
  const formUsers = document.getElementById('user-form');
  const addUserCancelButton = document.getElementById('add-user-cancel');
  const btnCloseModal = document.getElementById('close-modal-user');
  const firstNameInput = formUsers.querySelector(firstNameUser);
  const lastNameInput = formUsers.querySelector(lastNameUser);
  const emailInput = formUsers.querySelector(emailUser);
  const phoneInput = formUsers.querySelector(phoneUser);
  const roleInput = formUsers.querySelector(roleTypeUser);

  addUserCancelButton.addEventListener('click', () => {
    modalElement.style.display = hiddenClass;
  });

  addUserSubmitButton.addEventListener('click', () => {
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const role = roleInput.options[roleInput.selectedIndex].value;

    const errors = validateUserForm({
      firstName,
      lastName,
      email,
      phone,
      role,
    });

    if (Object.entries(errors).length > 0) {
      showFormErrors(errors);
    } else {
      // Show loading spinner
      loadingSpinner.start();

      const newUser = {
        id: currentUserId,
        firstName,
        lastName,
        email,
        phone,
        role,
        roleId: role.includes('Admin') ? 'admin' : 'employee',
        date: formattedDate,
      };

      // Increases the current user ID value by one unit
      currentUserId++;

      // Add user to list users
      getUserFromLocalStorage.push(newUser);

      // Update user list in Local Storage
      localStorage.setItem('listUsers', JSON.stringify(getUserFromLocalStorage));

      // Close modal
      modalElement.style.display = hiddenClass;

      // Set timeout before closing the spinner
      setTimeout(() => {
        // Hide spinner after successfully adding user
        loadingSpinner.stop();

        generateUsersTable(getUserFromLocalStorage);
      }, 300);
    }
  });

  // Handle Button Close Modal User
  btnCloseModal.addEventListener('click', () => {
    modalElement.style.display = hiddenClass;
  });
});

/**
 * Handle the feature for edit user
 * Click button add user show modal edit user
 */
listUsers.addEventListener('click', (event) => {
  const editButton = event.target.closest('.btn-edit');

  if (editButton) {
    // Get user ID from data-id attribute
    const userId = parseInt(editButton.getAttribute('data-id'));

    // Get the user to edit from Local Storage by user ID
    const editedUser = getUserFromLocalStorage.find(
      (user) => user.id === userId,
    );

    if (editedUser) {
      // Show the edit user modal with the user's data
      const modalElement = document.getElementById('modal');

      // Pass 'Edit User' as the title
      modalElement.innerHTML = generateModalUser(editedUser, 'Edit User');

      // Set the data-user-id attribute to store the user ID
      modalElement.setAttribute('data-user-id', userId);
      modalElement.style.display = flexClass;

      const editUserSubmitButton = document.getElementById('add-user-submit');
      const editUserCancelButton = document.getElementById('add-user-cancel');
      const formUsers = document.getElementById('user-form');
      const btnCloseModal = document.getElementById('close-modal-user');

      // Handles button cancel edit user
      editUserCancelButton.addEventListener('click', () => {
        modalElement.style.display = hiddenClass;
      });

      // Handles button submit edit user
      editUserSubmitButton.addEventListener('click', () => {
        const editedFirstName = formUsers
          .querySelector(firstNameUser)
          .value.trim();
        const editedLastName = formUsers
          .querySelector(lastNameUser)
          .value.trim();
        const editedEmail = formUsers.querySelector(emailUser).value.trim();
        const editedPhone = formUsers.querySelector(phoneUser).value.trim();
        const editedRole = formUsers.querySelector(roleTypeUser).value;

        const errors = validateUserForm({
          firstName: editedFirstName,
          lastName: editedLastName,
          email: editedEmail,
          phone: editedPhone,
          role: editedRole,
        });

        if (Object.entries(errors).length > 0) {
          showFormErrors(errors);
        } else {
          // Show loading spinner
          loadingSpinner.start();

          editedUser.firstName = editedFirstName;
          editedUser.lastName = editedLastName;
          editedUser.email = editedEmail;
          editedUser.phone = editedPhone;
          editedUser.role = editedRole;
          editedUser.roleId = editedRole.includes('Admin')
            ? 'admin'
            : 'employee';

          const updatedUsers = getUserFromLocalStorage.map((user) => {
            if (user.id === editedUser.id) {
              return editedUser;
            }

            return user;
          });

          localStorage.setItem('listUsers', JSON.stringify(updatedUsers));
          modalElement.style.display = hiddenClass;

          // Set timeout before closing the spinner
          setTimeout(() => {
            // // Hide spinner after successfully adding user
            loadingSpinner.stop();

            generateUsersTable(updatedUsers);
          }, 300);
        }
      });

      // Handle Button Close Modal User
      btnCloseModal.addEventListener('click', () => {
        modalElement.style.display = hiddenClass;
      });
    }
  }
});

renderSideNav();
generateUsersTable(getUserFromLocalStorage);
