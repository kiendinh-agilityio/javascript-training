import { getUserFromLocalStorage } from '../mocks/list-users'

const generateListUsers = (users) => {
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
    <tbody>
      ${
        (users || getUserFromLocalStorage).map((user) => {
          const {
            id,
            lastName,
            firstName,
            email,
            date,
            phone,
            role,
            roleId
          } = user
          return `
            <tr class="table-row" data-id=${id}>
              <td class="dasboard-item">
                <p class="user-name">${firstName} ${lastName}</p>
                <p class="user-email">${email}</p>
              </td>
              <td class="table-cell">
                <div class="d-flex justify-center items-center user-role-tag user-role-${roleId}">${role}</div>
              </td>
              <td class="table-cell create-date">${date}</td>
              <td class="table-cell phone-number">${phone}</td>
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
      }
    </tbody>
  `
}

const generateUsersTable = (users) => {
  let renderUsers = users
  if (!renderUsers?.length) {
    renderUsers = getUserFromLocalStorage
  }
  console.log(users)
  const listUsers = document.getElementById('list-users')
  listUsers.innerHTML = generateListUsers(users)
}

export { generateUsersTable }
