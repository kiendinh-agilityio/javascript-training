import { generateUsersTable } from '../templates/renderListUsers';
import { getUserFromLocalStorage } from '../services/index';
import { generateModalUser } from '../templates/generateModalUser';
import { validateUserForm } from '../validate/index';
import { showFormErrors } from '../templates/showFormErrors';
import {
  isStringMatched,
  debounce,
  formatLimitedPhoneNumberInput,
  formattedDate,
  startLoadingSpinner,
  delayActions,
} from '../utils/index';
import {
  searchInput,
  searchButton,
  listUsers,
  deleteModal,
  confirmDeleteButton,
  cancelDeleteButton,
  closeDeleteModalButton,
  btnAddUser,
  modalElement,
  btnClearSearch,
} from '../dom/index';
import {
  DISPLAY_CLASS,
  PROFILE_USER,
  DEBOUNCE_TIME,
  ELEMENT_ID,
  ELEMENT_CLASS,
  TITLE_MODAL,
} from '../constants/index';

export const eventLoader = () => {
  /**
   * Handle the feature for search users
   * Function to handle search
   */
  const performSearchWithSpinner = () => {
    // Show spinner when performing search
    startLoadingSpinner();

    // Perform search
    performSearch();
  };

  // The function performs the search
  const performSearch = () => {
    const searchTerm = searchInput.value.toLowerCase().trim();

    // Search in the user list
    const searchResults = getUserFromLocalStorage.filter((user) => {
      const { lastName, firstName, email, phone } = user;
      const nameMatch = isStringMatched(`${firstName} ${lastName}`, searchTerm);
      const emailMatch = isStringMatched(email, searchTerm);
      const phoneMatch = isStringMatched(phone, searchTerm);
      return nameMatch || emailMatch || phoneMatch;
    });

    // Use the delayActions function to perform actions after a delay
    delayActions(() => {
      generateUsersTable(searchResults);
    });
  };

  // Define the clearSearch function
  const clearSearch = () => {
    // Clear search field content
    searchInput.value = '';

    // Hide the clear search button
    btnClearSearch.style.display = DISPLAY_CLASS.HIDDEN;

    // Call the debounce function to perform a search (in case there is previous content)
    debouncedSearch();
  };

  // Handle searches as the user types and presses Enter with debounce
  const debouncedSearch = debounce(performSearchWithSpinner, DEBOUNCE_TIME); // Debounce timeout is 800 ms

  // Add 'input' event for search field
  searchInput.addEventListener('input', () => {
    // If the input field is not empty, show the clear search button, otherwise hide it
    if (searchInput.value.trim() !== '') {
      btnClearSearch.style.display = DISPLAY_CLASS.BLOCK;
    } else {
      btnClearSearch.style.display = DISPLAY_CLASS.HIDDEN;
    }

    // Call the debounce function to perform the search
    debouncedSearch();
  });

  // Add click event for clear search button
  btnClearSearch.addEventListener('click', () => {
    // Call the clearSearch function when the user clicks the clear search button
    clearSearch();
  });

  // 'click' event for performing a search when the user clicks the search button
  searchButton.addEventListener('click', () => {
    performSearchWithSpinner();
  });

  // 'keypress' event for performing a search when the user types and presses Enter
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
    const deleteButton = event.target.closest(ELEMENT_CLASS.BTN_DELETE);
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
    startLoadingSpinner();

    // // Use the delayActions function to perform actions after the delay
    delayActions(() => {
      const userIndex = getUserFromLocalStorage.findIndex(
        (user) => user.id === userDelete.id,
      );

      if (userIndex !== -1) {
        getUserFromLocalStorage.splice(userIndex, 1);
        localStorage.setItem(
          'listUsers',
          JSON.stringify(getUserFromLocalStorage),
        );
        generateUsersTable(getUserFromLocalStorage);
      }
    });
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
      modalElement.style.display = DISPLAY_CLASS.HIDDEN;
    }
  });

  // Modal Delete
  const showDeleteModal = () => {
    deleteModal.style.display = DISPLAY_CLASS.FLEX;
  };

  const hideDeleteModal = () => {
    deleteModal.style.display = DISPLAY_CLASS.HIDDEN;
  };

  /**
   * Handle add new users for list users
   * Click button add user show modal add user
   */
  btnAddUser.addEventListener('click', () => {
    const modalElement = document.getElementById(ELEMENT_ID.MODAL);
    modalElement.style.display = DISPLAY_CLASS.FLEX;
    modalElement.innerHTML = generateModalUser();

    const addUserSubmitButton = document.getElementById(ELEMENT_ID.BTN_SUBMIT);
    const formUsers = document.getElementById(ELEMENT_ID.FORM_USER);
    const addUserCancelButton = document.getElementById(ELEMENT_ID.BTN_CANCEL);
    const btnCloseModal = document.getElementById(ELEMENT_ID.CLOSE_MODAL_USER);
    const firstNameInput = formUsers.querySelector(PROFILE_USER.FIRST_NAME);
    const lastNameInput = formUsers.querySelector(PROFILE_USER.LAST_NAME);
    const emailInput = formUsers.querySelector(PROFILE_USER.EMAIL);
    const phoneInput = formUsers.querySelector(PROFILE_USER.PHONE);
    const roleInput = formUsers.querySelector(PROFILE_USER.ROLE_TYPE);

    // Handle the event of not being able to enter text into the phone number input
    phoneInput.addEventListener('input', formatLimitedPhoneNumberInput);

    addUserCancelButton.addEventListener('click', () => {
      modalElement.style.display = DISPLAY_CLASS.HIDDEN;
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
        startLoadingSpinner();

        const userLength = getUserFromLocalStorage.length;

        // Calculate the new user ID based on the last user's ID
        const currentUserId =
          userLength > 0 ? getUserFromLocalStorage[userLength - 1].id + 1 : 1;

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

        // Add user to list users
        getUserFromLocalStorage.push(newUser);

        // Update user list in Local Storage
        localStorage.setItem(
          'listUsers',
          JSON.stringify(getUserFromLocalStorage),
        );

        // Close modal
        modalElement.style.display = DISPLAY_CLASS.HIDDEN;

        // // Use the delayActions function to perform actions after the delay
        delayActions(() => {
          generateUsersTable(getUserFromLocalStorage);
        });
      }
    });

    // Handle Button Close Modal User
    btnCloseModal.addEventListener('click', () => {
      modalElement.style.display = DISPLAY_CLASS.HIDDEN;
    });
  });

  /**
   * Handle the feature for edit user
   * Click button add user show modal edit user
   */
  listUsers.addEventListener('click', (event) => {
    const editButton = event.target.closest(ELEMENT_CLASS.BTN_EDIT);

    if (editButton) {
      // Get user ID from data-id attribute
      const userId = parseInt(editButton.getAttribute('data-id'));

      // Get the user to edit from Local Storage by user ID
      const editedUser = getUserFromLocalStorage.find(
        (user) => user.id === userId,
      );

      if (editedUser) {
        // Show the edit user modal with the user's data
        const modalElement = document.getElementById(ELEMENT_ID.MODAL);

        // Pass 'Edit User' as the title
        modalElement.innerHTML = generateModalUser(editedUser, TITLE_MODAL);

        // Set the data-user-id attribute to store the user ID
        modalElement.setAttribute('data-user-id', userId);
        modalElement.style.display = DISPLAY_CLASS.FLEX;

        const editUserSubmitButton = document.getElementById(ELEMENT_ID.BTN_SUBMIT);
        const editUserCancelButton = document.getElementById(ELEMENT_ID.BTN_CANCEL);
        const formUsers = document.getElementById(ELEMENT_ID.FORM_USER);
        const btnCloseModal = document.getElementById(ELEMENT_ID.CLOSE_MODAL_USER);

        // Once you have the phone number field (editedPhone), assign a value and handle the "input" for it
        const editedPhoneInput = formUsers.querySelector(PROFILE_USER.PHONE);

        // Assign the phone number value to the phone number field
        editedPhoneInput.value = editedUser.phone;

        // Handle the event of not being able to enter text into the phone number input
        editedPhoneInput.addEventListener('input', formatLimitedPhoneNumberInput);

        // Handles button cancel edit user
        editUserCancelButton.addEventListener('click', () => {
          modalElement.style.display = DISPLAY_CLASS.HIDDEN;
        });

        // Handles button submit edit user
        editUserSubmitButton.addEventListener('click', () => {
          const editedFirstName = formUsers
            .querySelector(PROFILE_USER.FIRST_NAME)
            .value.trim();
          const editedLastName = formUsers
            .querySelector(PROFILE_USER.LAST_NAME)
            .value.trim();
          const editedEmail = formUsers.querySelector(PROFILE_USER.EMAIL).value.trim();
          const editedPhone = formUsers.querySelector(PROFILE_USER.PHONE).value.trim();
          const editedRole = formUsers.querySelector(PROFILE_USER.ROLE_TYPE).value;

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
            startLoadingSpinner();

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
            modalElement.style.display = DISPLAY_CLASS.HIDDEN;

            // Use the delayActions function to perform actions after the delay
            delayActions(() => {
              generateUsersTable(updatedUsers);
            }, DEBOUNCE_TIME);
          }
        });

        // Handle Button Close Modal User
        btnCloseModal.addEventListener('click', () => {
          modalElement.style.display = DISPLAY_CLASS.HIDDEN;
        });
      }
    }
  });
};
