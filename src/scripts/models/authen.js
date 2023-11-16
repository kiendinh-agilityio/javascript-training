import {
  BASE_API,
  LOGIN_MESSAGES,
  END_POINTS,
  SIGNUP_MESSAGES,
  VALIDATE_MESSAGES,
} from '../constants/index';

/** Class representing the authentication model. */
export class AuthenModel {
  /**
   * Create an AuthenModel instance.
   * @param {Object} view - The view associated with this model.
   */
  constructor(view) {
    this.view = view;
  }

  /**
   * Attempt to log in a user.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   */
  async login(email, password) {
    try {
      // Fetch the user data from the API
      const response = await fetch(`${BASE_API}${END_POINTS.USERS}`);
      if (response.ok) {
        const users = await response.json();

        // Find a user with a matching email
        const user = users.find((user) => user.email === email);

        if (user && user.password === password) {
          // Successful login
          this.view.showSuccessToast(LOGIN_MESSAGES.SUCCESS);

          // Redirect to the index page
          window.location.href = '/';
        } else {
          // Login unsuccessful
          throw new Error(LOGIN_MESSAGES.UNSUCCESSFUL);
        }
      } else {
        // Error when fetching user data
        throw new Error(error.message);
      }
    } catch (error) {
      // Handle API connection error and show error toast
      this.view.showErrorToast(error.message);
    }
  }

  /**
   * Attempt to register a new user.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @param {string} confirmPassword - The user's password confirmation.
   */
  async register(email, password, confirmPassword) {
    try {
      // Check if email, password, and confirmPassword are empty
      if (!email || !password || !confirmPassword) {
        throw new Error(SIGNUP_MESSAGES.EMPTY);
      }

      // Fetch the user data from the API
      const response = await fetch(`${BASE_API}${END_POINTS.USERS}`);
      if (response.ok) {
        const users = await response.json();

        const userExists = users.some((user) => user.email === email);
        if (userExists) {
          throw new Error(SIGNUP_MESSAGES.EMAIL);
        }

        if (password !== confirmPassword) {
          throw new Error(VALIDATE_MESSAGES.INVALID_CONFIRM_PASSWORD);
        }

        const newUser = {
          email,
          password,
        };

        // Save the new user data to the API
        const saveResponse = await fetch(`${BASE_API}${END_POINTS.USERS}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        });

        if (saveResponse.ok) {
          // Registration successful
          this.view.showSuccessToast(SIGNUP_MESSAGES.SUCCESS);
        } else {
          // Error when saving user data
          throw new Error(error.message);
        }
      } else {
        // Error when fetching user data
        throw new Error(error.message);
      }
    } catch (error) {
      // Handle and display error in the view
      this.view.showErrorToast(error.message);
      throw error;
    }
  }
}
