import { AuthenView } from '../views/authen';
import { AuthenModel } from '../models/authen';

export class AuthenController {
  /** Create an AuthenController instance. */
  constructor() {
    // Create a new view and model instance and associate them with the controller.
    this.view = new AuthenView(this);
    this.model = new AuthenModel(this.view);
  }

  /**
   * Attempt to log in a user.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   */
  async login(email, password) {
    try {
      // Call the login method of the model to handle the login logic.
      await this.model.login(email, password);
    } catch (error) {
      // If an error occurs during login, show an error toast in the view.
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
      // Call the register method of the model to handle the registration logic.
      await this.model.register(email, password, confirmPassword);
    } catch (error) {
      // If an error occurs during registration, show an error toast in the view.
      this.view.showErrorToast(error.message);
    }
  }
}
