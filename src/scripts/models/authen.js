import { MOCK_API } from '../constants/index';

export class AuthenModel {
  constructor(view) {
    this.view = view;
  }

  async login(email, password) {
    try {
      // Call the API to get the list of accounts
      const response = await fetch(MOCK_API + 'users');
      if (response.ok) {
        const users = await response.json();
        const user = users.find((user) => user.email === email);

        if (user && user.password === password) {
          // Account exists and password is correct, login successful
          this.view.showSuccessToast('Sign in successfully');
          setTimeout(() => {
            window.location.href = 'index.html';
          }, 500);
        } else {
          // Account does not exist or password is incorrect, display an error message
          throw new Error('Sign in unsuccessful');
        }
      }
    } catch (error) {
      // Error connecting to the API
      this.view.showErrorToast(error.message);
    }
  }
}
