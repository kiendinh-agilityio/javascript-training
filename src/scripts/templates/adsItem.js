export const adsItem = (item) => {
  const { id, network, link, email, phone, status, statusID } = item || {};

  return `
    <div class="flex justify-between items-center table-row" data-id=${id}>
      <div class="ads-dasboard-item">
        <p class="ads-network-text">${network}</p>
        <a href ="https://${link}" class="ads-link" target="_blank">${link}</a>
      </div>
      <div class="flex justify-start table-cell ads-dasboard-item">
        <p class="flex justify-center items-center ads-status-tag ads-status-${statusID}">
          <span class="ads-status-text">${status}</span>
        </p>
      </div>
      <div class="table-cell ads-dasboard-item">
        <p class="ads-email">${email}</p>
      </div>
      <div class="table-cell ads-dasboard-item">
        <p class="ads-phone-number">${phone}</p>
      </div>
      <div class="table-cell dropdown-group">
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
      </div>
    </div>
  `;
};
