import { getUserFromLocalStorage } from '../mocks/listUsers';
import { userItem } from './userItem';

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
      ${users
        .map((user) => {
          return userItem(user);
        })
        .join('')}
    </tbody>
  `;
};

const generateUsersTable = (users) => {
  let renderUsers = users;
  if (!renderUsers?.length) {
    renderUsers = getUserFromLocalStorage;
  }
  const listUsers = document.getElementById('list-users');
  listUsers.innerHTML = generateListUsers(renderUsers);
};

export { generateUsersTable };
