export const adsItem = (item) => {
  const { id, network, link, email, phone, status, statusID } = item;

  return `
    <tr class="table-row" data-id=${id}>
      <td class="ads-dasboard-item">
        <p class="ads-network-text">${network}</p>
        <p class="ads-link">${link}</p>
      </td>
      <td class="flex justify-center table-cell ads-dasboard-item">
        <div class="flex justify-center items-center ads-status-tag ads-status-${statusID}">
          <span class="ads-status-text">${status}</span>
        </div>
      </td>
      <td class="table-cell ads-dasboard-item ads-email">${email}</td>
      <td class="table-cell ads-dasboard-item ads-phone-number">${phone}</td>
      <td class="table-cell">
        <div class="dropdown">
          <button class="btn btn-dropdown" data-id=${id}>
            <img width="14px" height="3px" src="/images/svg/more.svg" alt="Button group">
          </button>
          <div class="dropdown-content" data-id=${id}>
            <button data-id=${id}>
              <img width="20px" height="20px" src="/images/svg/edit.svg" alt="Button Edit">
            </button>
            <button data-id=${id}>
              <img width="20px" height="20px" src="/images/svg/delete.svg" alt="Button Delete">
            </button>
          </div>
        </div>
      </td>
    </tr>
  `;
};
