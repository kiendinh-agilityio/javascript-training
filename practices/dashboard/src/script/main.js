import { renderSideNav } from './side-nav/renderSideNav'
import { generateUsersTable } from './templates/renderListUsers'
import { getUserFromLocalStorage } from './mocks/list-users'
import { isStringMatched } from './utils'

// Variables scope
const searchInput = document.getElementById('search-input')
const searchButton = document.getElementById('search-button')
const listUsers = document.getElementById('list-users')
const deleteModal = document.getElementById('delete-modal')
const confirmDeleteButton = document.getElementById('confirm-delete')
const cancelDeleteButton = document.getElementById('cancel-delete')
const closeDeleteModalButton = document.getElementById('close-modal')
let userToDelete

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

const showDeleteModal = () => {
  deleteModal.style.display = 'flex'
}

const hideDeleteModal = () => {
  deleteModal.style.display = 'none'
}

renderSideNav()
generateUsersTable()
