export const userItem = (user) => {
  const { id, lastName, firstName, email, date, phone, role, roleId } = user;

  return `
    <tr class="table-row" data-id=${id}>
      <td class="dasboard-item">
        <p class="user-name">${firstName} ${lastName}</p>
        <p class="user-email">${email}</p>
      </td>
      <td class="table-cell">
        <div class="d-flex justify-center items-center user-role-tag user-role-${roleId}">
          <span class="user-role-text">${role}</span>
        </div>
      </td>
      <td class="table-cell create-date">${date}</td>
      <td class="table-cell phone-number">${phone}</td>
      <td class="table-cell">
        <button class="btn btn-edit" data-id=${id}>
          <img
            width="20px"
            height="20px"
            src="./images/svg/edit.svg"
            alt="Edit icon"
          />
        </button>
        <button class="btn btn-delete" data-id=${id}>
          <img
            width="20px"
            height="20px"
            src="./images/svg/remove.svg"
            alt="Delete icon"
          />
        </button>
      </td>
    </tr>
  `;
};
