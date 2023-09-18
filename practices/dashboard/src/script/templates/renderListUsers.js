/**
 * Get user to local storage
 */
const getUserToLocalStorage = JSON.parse(localStorage.getItem('listUsers')) || []

const renderUserItems = getUserToLocalStorage.map((user) => {
  return `
    <tr class="table-row" data-id=${user.id}>
      <td class="dasboard-item">
        <p class="user-name">${user.firstName + ' ' + user.lastName}</p>
        <p class="user-email">${user.email}</p>
      </td>
      <td class="table-cell">
        <div class="d-flex justify-center items-center user-role-tag user-role-${user.roleId}">${user.role}</div>
      </td>
      <td class="table-cell create-date">${user.date}</td>
      <td class="table-cell phone-number">${user.phone}</td>
      <td class="table-cell">
        <button id="btn-edit" class="btn-edit">
          <img
            loading="lazy"
            width="20px"
            height="20px"
            src="./images/svg/edit.svg"
            alt="Edit icon"
          />
        </button>
        <button id="btn-remove" class="btn-remove">
          <img
            loading="lazy"
            width="20px"
            height="20px"
            src="./images/svg/remove.svg"
            alt="Remove icon"
          />
        </button>
      </td>
    </tr>
  `
}).join('')

const generateListUsers = () => {
  return `
    <thead>
      <tr class="table-row">
        <th class="dashboard-description">Name</th>
        <th class="dashboard-description">Role</th>
        <th class="dashboard-description">Create Date</th>
        <th class="dashboard-description">Phone Number</th>
        <th class="dashboard-description">Action</th>
      </tr>
    </thead>
    <tbody>${renderUserItems}</tbody>
  `
}

const renderListUsers = () => {
  const listUsers = document.getElementById('list-users')
  listUsers.innerHTML = generateListUsers()
}

export { renderListUsers }
