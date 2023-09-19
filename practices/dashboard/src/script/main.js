import { renderSideNav } from './side-nav/renderSideNav'
import { generateUsersTable } from './templates/renderListUsers'
import { getUserFromLocalStorage } from './mocks/list-users'
import { searchInput, searchButton } from './dom'
import { checkFullNameMatch, checkEmailMatch, checkPhoneMatch } from './utils/index'

// Handle the search when users the search button is pressed
searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.toLowerCase().trim()
  // Search in the list users
  const searchResults = getUserFromLocalStorage.filter(user => {
    const nameMatch = checkFullNameMatch(user.firstName, user.lastName, searchTerm)
    const emailMatch = checkEmailMatch(user.email, searchTerm)
    const phoneMatch = checkPhoneMatch(user.phone) // Compare phone numbers without converting to lowercase
    return nameMatch || emailMatch || phoneMatch
  })
  generateUsersTable(searchResults)
  console.log(searchResults)
})

// Handle searches as the user types and presses Enter
searchInput.addEventListener('keyup', event => {
  if (event.key === 'Enter') {
    searchButton.click() // Activate the search button when pressing Enter
  }
})

renderSideNav()
generateUsersTable()
