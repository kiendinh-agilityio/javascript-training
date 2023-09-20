import { renderSideNav } from './side-nav/renderSideNav'
import { generateUsersTable } from './templates/renderListUsers'
import { getUserFromLocalStorage } from './mocks/list-users'
import { isStringMatched } from './utils'
import { generateModalUser } from './templates/generateModalUser'

// Variables scope
const searchInput = document.getElementById('search-input')
const searchButton = document.getElementById('search-button')
const listUsers = document.getElementById('list-users')
const deleteModal = document.getElementById('delete-modal')
const confirmDeleteButton = document.getElementById('confirm-delete')
const cancelDeleteButton = document.getElementById('cancel-delete')
const closeDeleteModalButton = document.getElementById('close-modal')
const btnAddUser = document.getElementById('btn-add')
let userToDelete

// Variable to store the current user ID
let currentUserId = getUserFromLocalStorage.length > 0 ? getUserFromLocalStorage[getUserFromLocalStorage.length - 1].id + 1 : 1

// Handle the search when users the search button is pressed
searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.toLowerCase().trim()
  // Search in the list users
  const searchResults = getUserFromLocalStorage.filter(user => {
    const nameMatch = isStringMatched(user.firstName + ' ' + user.lastName, searchTerm)
    const emailMatch = isStringMatched(user.email, searchTerm)
    const phoneMatch = isStringMatched(user.phone, searchTerm) // Compare phone numbers without converting to lowercase
    return nameMatch || emailMatch || phoneMatch
  })
  generateUsersTable(searchResults)
})

// Handle searches as the user types and presses Enter
searchInput.addEventListener('keypress', event => {
  if (event.key === 'Enter') {
    event.preventDefault()
    searchButton.click() // Activate the search button when pressing Enter
  }
})

/**
 * Handle the Delete User event
 */
listUsers.addEventListener('click', event => {
  if (event.target.classList.contains('btn-delete')) {
    const userId = parseInt(event.target.getAttribute('data-id'))
    // Get user information to delete
    userToDelete = getUserFromLocalStorage.find(user => user.id === userId)
    // Display modal
    showDeleteModal()
  }
})

// Handle the event when the user clicks "Yes"
confirmDeleteButton.addEventListener('click', () => {
  const userIndex = getUserFromLocalStorage.findIndex(user => user.id === userToDelete.id)
  if (userIndex !== -1) {
    getUserFromLocalStorage.splice(userIndex, 1)
    localStorage.setItem('listUsers', JSON.stringify(getUserFromLocalStorage))
    generateUsersTable(getUserFromLocalStorage)
  }
  // Close the modal
  hideDeleteModal()
})

// Handle the event when the user presses "No" or closes the modal
cancelDeleteButton.addEventListener('click', () => {
  // Close the modal
  hideDeleteModal()
})

// Handle the event when the user presses the "Close" button
closeDeleteModalButton.addEventListener('click', () => {
  // Close the modal
  hideDeleteModal()
})

// Use the click event to catch when the user clicks on the gray background around the modal
window.addEventListener('click', event => {
  if (event.target === deleteModal) {
    hideDeleteModal()
  }
})

// Modal Delete
const showDeleteModal = () => {
  deleteModal.style.display = 'flex'
}

const hideDeleteModal = () => {
  deleteModal.style.display = 'none'
}

// Click button add user show modal add user
btnAddUser.addEventListener('click', () => {
  const modalElement = document.getElementById('modal')
  modalElement.style.display = 'flex'
  modalElement.innerHTML = generateModalUser()

  const addUserSubmitButton = document.getElementById('add-user-submit')
  const firstNameInput = document.getElementById('first-name')
  const lastNameInput = document.getElementById('last-name')
  const emailInput = document.getElementById('email')
  const phoneNumberInput = document.getElementById('phone-number')
  const roleInput = document.getElementById('role-type')
  const addUserError = document.getElementById('add-user-error')
  const addUserCancelButton = document.getElementById('add-user-cancel')

  addUserCancelButton.addEventListener('click', () => {
    modalElement.style.display = 'none'
  })

  addUserSubmitButton.addEventListener('click', () => {
    const firstName = firstNameInput.value.trim()
    const lastName = lastNameInput.value.trim()
    const email = emailInput.value.trim()
    const phoneNumber = phoneNumberInput.value.trim()
    const role = roleInput.value

    // Check if any fields are empty
    if (!firstName) {
      displayErrorMessage(firstNameInput, 'Please enter First Name.')
    } else {
      clearErrorMessage(firstNameInput)
    }

    if (!lastName) {
      displayErrorMessage(lastNameInput, 'Please enter Last Name.')
    } else {
      clearErrorMessage(lastNameInput)
    }

    if (!email) {
      displayErrorMessage(emailInput, 'Please enter Email.')
    } else {
      clearErrorMessage(emailInput)
    }

    if (!phoneNumber) {
      displayErrorMessage(phoneNumberInput, 'Please enter Phone Number')
      return
    } else {
      clearErrorMessage(phoneNumberInput)
    }

    //  Check email have @ symbol, a string precedes it and the following string needs to contain a period, followed by 2-3 characters.
    const emailRegex = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/

    // Check the character must match the phone number format. Example: +205-205-5555
    const mobileNoRegex = /^\+\d{3,}-\d{3}-\d{4}$/

    if (!emailRegex.test(email)) {
      addUserError.textContent = 'Invalid email. Please enter email in correct format.'
    }

    if (!mobileNoRegex.test(phoneNumber)) {
      addUserError.textContent = 'Invalid phone number. Please enter a 10-digit phone number and start +.'
    }

    // Create a new user
    const newUser = {
      id: currentUserId,
      firstName,
      lastName,
      email,
      phoneNumber,
      role,
      roleId: role.includes('Admin') ? 'admin' : 'employee',
      date: '21 July, 2020'
    }

    // Increases the current user ID value by one unit
    currentUserId++

    // Add user to list users
    getUserFromLocalStorage.push(newUser)

    // Update user list in Local Storage
    localStorage.setItem('listUsers', JSON.stringify(getUserFromLocalStorage))

    // Close modal
    modalElement.style.display = 'none'
    // resetForm()
    generateUsersTable(getUserFromLocalStorage)
  })
})

// The function displays an error message for input
const displayErrorMessage = (inputElement, message) => {
  const errorElement = document.createElement('div')
  errorElement.classList.add('error-message')
  errorElement.textContent = message

  // If there is a previous error message, remove it before adding a new one
  const existingError = inputElement.nextElementSibling
  if (existingError && existingError.classList.contains('error-message')) {
    inputElement.parentElement.removeChild(existingError)
  }
  inputElement.parentElement.appendChild(errorElement)
}

// Function to clear error messages for input
const clearErrorMessage = (inputElement) => {
  const existingError = inputElement.nextElementSibling
  if (existingError && existingError.classList.contains('error-message')) {
    inputElement.parentElement.removeChild(existingError)
  }
}

renderSideNav()
generateUsersTable()
