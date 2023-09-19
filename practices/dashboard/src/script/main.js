import { renderSideNav } from './side-nav/renderSideNav'
import { generateUsersTable } from './templates/renderListUsers'
import { getUserFromLocalStorage } from './mocks/list-users'
import { isStringMatched } from './utils'

// Variables scope
const searchInput = document.getElementById('search-input')
const searchButton = document.getElementById('search-button')

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

renderSideNav()
generateUsersTable()
