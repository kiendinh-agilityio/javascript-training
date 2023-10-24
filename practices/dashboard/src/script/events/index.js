import { generateUsersTable } from '../templates/renderListUsers';
import { getUserFromLocalStorage, saveUserListToLocalStorage } from '../services/index';
import { generateModalUser } from '../templates/generateModalUser';
import { validateUserForm } from '../validate/index';
import { showFormErrors } from '../templates/showFormErrors';
import {
  isStringMatched,
  debounce,
  formatLimitedPhoneNumberInput,
  startLoadingSpinner,
  delayActions,
  generateEmptyResultMessage,
  showToast,
  trimmingString,
  addNewUser,
  editUser,
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
  btnClearSearch,
} from '../dom/index';
import {
  DISPLAY_CLASS,
  PROFILE_USER,
  DEBOUNCE_TIME,
  ELEMENT_ID,
  ELEMENT_CLASS,
  TITLE_MODAL,
  TOAST_MESSAGE,
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
      if (searchResults.length) {
        // If there are results, display the user table
        generateUsersTable(searchResults);
      } else {
        // If no results, display an empty result message
        const emptyMessage = generateEmptyResultMessage();

        // Clear any previous content
        listUsers.innerHTML = '';

        // Add the empty message
        listUsers.appendChild(emptyMessage);
      }
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
    if (trimmingString(searchInput.value)) {
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
        saveUserListToLocalStorage();
        generateUsersTable(getUserFromLocalStorage);

        // Show toast message when delete user successfully
        showToast(TOAST_MESSAGE.DELETE_USER);
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

  // Use deleteModal to catch the click event on the gray background around the modal
  deleteModal.addEventListener('click', (event) => {
    if (event.target === deleteModal) {
      hideDeleteModal();
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
   * Show the user modal with specified data and title
   * The user data to display in the modal
   * The title for the modal
   */
  const showUserModal = (userData) => {
    // Get the modal element
    const modalElement = document.getElementById(ELEMENT_ID.MODAL);

    // Determine the title based on userData presence
    const title = userData ? TITLE_MODAL.EDIT : TITLE_MODAL.ADD;

    // Set the content and display the modal
    modalElement.innerHTML = generateModalUser(userData, title);
    modalElement.style.display = DISPLAY_CLASS.FLEX;

    // Get form, buttons, and input elements
    const formUsers = document.getElementById(ELEMENT_ID.FORM_USER);
    const btnCloseModal = document.getElementById(ELEMENT_ID.CLOSE_MODAL_USER);
    const submitButton = document.getElementById(ELEMENT_ID.BTN_SUBMIT);
    const cancelButton = document.getElementById(ELEMENT_ID.BTN_CANCEL);

    // Handle Button Close Modal User
    btnCloseModal.addEventListener('click', () => {
      // Close the modal when the close button is clicked
      modalElement.style.display = DISPLAY_CLASS.HIDDEN;
    });

    // Handle the event of not being able to enter text into the phone number input
    const phoneInput = formUsers.querySelector(PROFILE_USER.PHONE);
    phoneInput.addEventListener('input', formatLimitedPhoneNumberInput);

    // Handle Button Submit
    submitButton.addEventListener('click', () => {
      // Extract user data from the form
      const firstName = trimmingString(formUsers.querySelector(PROFILE_USER.FIRST_NAME).value);
      const lastName = trimmingString(formUsers.querySelector(PROFILE_USER.LAST_NAME).value);
      const email = trimmingString(formUsers.querySelector(PROFILE_USER.EMAIL).value);
      const phone = trimmingString(phoneInput.value);
      const role = formUsers.querySelector(PROFILE_USER.ROLE_TYPE).value;

      const user = {
        firstName,
        lastName,
        email,
        phone,
        role,
      };

      const errors = validateUserForm(user);

      if (Object.entries(errors).length > 0) {
        showFormErrors(errors);
      } else {
        // Show loading spinner
        startLoadingSpinner();

        // Adding new user and Editing an existing user
        !userData ? addNewUser(user) : editUser(userData, user);

        // Close modal
        modalElement.style.display = DISPLAY_CLASS.HIDDEN;
      }
    });

    // Handle Button Cancel
    cancelButton.addEventListener('click', () => {
      // Close the modal when the cancel button is clicked
      modalElement.style.display = DISPLAY_CLASS.HIDDEN;
    });
  };

  // Handle add new users for list users
  btnAddUser.addEventListener('click', () => {
    // Show the modal for adding a new user
    showUserModal(null);
  });

  // Handle the feature for editing user
  listUsers.addEventListener('click', (event) => {
    const editButton = event.target.closest(ELEMENT_CLASS.BTN_EDIT);
    const userId = editButton ? parseInt(editButton.getAttribute('data-id')) : null;
    const editedUser = userId ? getUserFromLocalStorage.find((user) => user.id === userId) : null;

    // Show the modal for editing user
    editedUser && showUserModal(editedUser);
  });
};
