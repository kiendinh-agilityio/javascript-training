export const generateModalUser = (user, title) => {
  const {
    id = '',
    firstName = '',
    lastName = '',
    email = '',
    phone = '',
    role = ''
  } = user || {}

  return `
    <div class="modal-content">
      <div class="modal-header flex-row justify-between items-center">
        <h2 class="modal-heading">${title || (!id ? 'Add User' : 'Edit User')}</h2>
      </div>
      <div id="user-form" class="flex-column form-modal">
        <div class="flex-column">
          <input
            id="first-name"
            class="form-input"
            type="text"
            placeholder="First Name *"
            value="${firstName}"
          />
          <div id="first-name-error" class="error-message"></div>
        </div>
        <div class="flex-column">
          <input
            id="last-name"
            class="form-input"
            type="text"
            placeholder="Last Name *"
            value="${lastName}"
          />
          <div id="last-name-error" class="error-message"></div>
        </div>
        <div class="flex-column">
          <input
            id="email"
            class="form-input"
            type="email"
            placeholder="Email ID *"
            value="${email}"
          />
          <div id="email-error" class="error-message"></div>
        </div>
        <div class="d-flex justify-between form-group">
          <div class="phone-number-input flex-column">
            <input
              id="phone"
              class="form-input"
              placeholder="Mobile No"
              type="text"
              value="${phone}"
            />
            <div id="phone-error" class="error-message"></div>
          </div>
          <div class="form-select flex-column">
            <select id="role-type" name="role-type" class="form-input-select">
              <option value="">Select Role Type</option>
              <option value="Super Admin" ${role === 'Admin' ? 'selected' : ''}>Super Admin</option>
              <option value="Admin" ${role === 'Admin' ? 'selected' : ''}>Admin</option>
              <option value="HR Admin" ${role === 'Admin' ? 'selected' : ''}>HR Admin</option>
              <option value="Employee" ${role === 'Employee' ? 'selected' : ''}>Employee</option>
            </select>
            <div id="role-error" class="error-message"></div>
          </div>
        </div>
        <div class="d-flex justify-end btn-group">
          <button class="btn btn-submit" id="add-user-submit">
            ${!id ? 'Add User' : 'Save User'}
          </button>
          <button id="add-user-cancel" class="btn-close-modal">
            Cancel
          </button>
        </div>
      </div>
    </div>
  `
}
