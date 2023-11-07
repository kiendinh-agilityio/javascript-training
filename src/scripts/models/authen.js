import { MOCK_API, LOGIN_MESSAGE, END_POINT } from '../constants/index';

export class AuthenModel {
  constructor(view) {
    this.view = view;
  }

  async login(email, password) {
    try {
      // Call the API to get the list of accounts
      const response = await fetch(`${MOCK_API}${END_POINT.USERS}`);
      if (response.ok) {
        const users = await response.json();
        const user = users.find(
          (user) => user.email === email && user.password === password,
        );

        if (user) {
          this.view.showSuccessToast(LOGIN_MESSAGE.SUCCESS);
          setTimeout(() => {
            window.location.href = 'index.html';
          }, 500);
        } else {
          throw new Error(LOGIN_MESSAGE.UNSUCCESSFUL);
        }
      }
    } catch (error) {
      // Error connecting to the API
      this.view.showErrorToast(error.message);
    }
  }
}
