import { renderSideNav } from './side-nav/renderSideNav'
import { generateUsersTable } from './templates/renderListUsers'
import { getUserFromLocalStorage } from './mocks/list-users'
import { isStringMatched } from './utils'
import { generateModalUser } from './templates/generateModalUser'
import { validateUserForm } from './validate'
import { camelCaseToHyphenCase } from './constants'

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

/**
 * Handle add new users for list users
 * Click button add user show modal add user
*/
btnAddUser.addEventListener('click', () => {
  const modalElement = document.getElementById('modal')
  modalElement.style.display = 'flex'
  modalElement.innerHTML = generateModalUser()

  const addUserSubmitButton = document.getElementById('add-user-submit')
  const firstNameInput = document.getElementById('first-name')
  const lastNameInput = document.getElementById('last-name')
  const emailInput = document.getElementById('email')
  const phoneInput = document.getElementById('phone')
  const roleInput = document.getElementById('role-type')
  const addUserCancelButton = document.getElementById('add-user-cancel')

  addUserCancelButton.addEventListener('click', () => {
    modalElement.style.display = 'none'
  })

  addUserSubmitButton.addEventListener('click', () => {
    const firstName = firstNameInput.value.trim()
    const lastName = lastNameInput.value.trim()
    const email = emailInput.value.trim()
    const phone = phoneInput.value.trim()
    const role = roleInput.options[roleInput.selectedIndex].value

    const errors = validateUserForm({
      firstName,
      lastName,
      email,
      phone,
      role
    })

    if (Object.entries(errors).length > 0) {
      Object.entries(errors).forEach(([key, value]) => {
        const newKey = camelCaseToHyphenCase(key)
        errors[newKey] = value
      })

      const showFormErrors = (errors) => {
        Object.entries(errors).forEach(([key, value]) => {
          const target = document.getElementById(`${key}-error`)
          if (target) {
            target.innerText = value
          }
        })
      }
      showFormErrors(errors)
    } else {
      const newUser = {
        id: currentUserId,
        firstName,
        lastName,
        email,
        phone,
        role,
        roleId: role.includes('Admin') ? 'admin' : 'employee',
        date: '1 January, 2023'
      }

      // Increases the current user ID value by one unit
      currentUserId++

      // Add user to list users
      getUserFromLocalStorage.push(newUser)

      // Update user list in Local Storage
      localStorage.setItem('listUsers', JSON.stringify(getUserFromLocalStorage))

      // Close modal
      modalElement.style.display = 'none'

      generateUsersTable(getUserFromLocalStorage)
    }
  })
})

renderSideNav()
generateUsersTable(getUserFromLocalStorage)
