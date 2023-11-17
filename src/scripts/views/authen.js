import {
  DISPLAY_CLASS,
  TITLE_AUTHEN_PAGE,
  LOGIN_MESSAGES,
  ICONS,
} from '../constants/index';
import {
  handleTogglePassword,
  showToast,
} from '../utils/index';
import {
  validateUserAuthen,
  showFormErrors,
} from '../utils/validate/index';
import { authenSection } from '../dom/index';

/** Class representing the authentication view. */
export class AuthenView {
  /**
   * Create an AuthenView instance.
   * @param {Object} controller - The controller for handling authentication actions.
   */
  constructor(controller) {
    this.controller = controller;
    this.initElements();
    this.initEventListeners();
  }

  /** Initialize DOM elements used in the view. */
  initElements() {
    this.formTitle = authenSection.querySelector('#heading-auth');
    this.confirmPasswordGroup = authenSection.querySelector('#confirm-password-group');
    this.actionSigninButton = authenSection.querySelector('#btn-action-signin');
    this.actionSignupButton = authenSection.querySelector('#btn-action-signup');
    this.btnSignIn = authenSection.querySelector('#btn-signin');
    this.btnSignUp = authenSection.querySelector('#btn-signup');
    this.togglePasswordButtons = authenSection.querySelectorAll('.toggle-password');

    this.formAuth = document.getElementById('form-auth');
    this.emailInput = this.formAuth.querySelector('#email');
    this.passwordInput = this.formAuth.querySelector('#password');
    this.emailError = this.formAuth.querySelector('#email-error');
    this.passwordError = this.formAuth.querySelector('#password-error');
    this.confirmPasswordInput = this.formAuth.querySelector('#confirm-password');
    this.confirmPasswordError = this.formAuth.querySelector('#confirmPassword-error');
  }

  /** Initialize event listeners for the view. */
  initEventListeners() {
    // When Sign In button is clicked, set the form title to 'Sign In'
    this.actionSigninButton.addEventListener('click', () => this.updateFormTitle('Sign In'));

    // When Create New Account button is clicked, set the form title to 'Create New Account'
    this.actionSignupButton.addEventListener('click', () => this.updateFormTitle('Create New Account'));

    // Add event listeners to toggle password visibility
    this.togglePasswordButtons.forEach((togglePasswordButton) => {
      togglePasswordButton.addEventListener('click', () => handleTogglePassword(togglePasswordButton));
    });

    // When Sign In button is clicked, trigger the handleSignInClick method
    this.btnSignIn.addEventListener('click', () => this.handleSignInClick());

    // When Sign Up button is clicked, trigger the handleSignUpClick method
    this.btnSignUp.addEventListener('click', () => this.handleSignUpClick());

    // When the form is submitted, trigger the handleLoginFormSubmit method
    this.formAuth.addEventListener('submit', this.handleLoginFormSubmit.bind(this));
  }

  /** Clear error messages for email, password, and confirmPassword fields. */
  clearError() {
    this.emailError.textContent = '';
    this.passwordError.textContent = '';
    this.confirmPasswordError.textContent = '';
  }

  /**
   * Update the form title and clear errors when switching between Sign In and Sign Up forms.
   * @param {string} title - The title to set for the form.
   */
  updateFormTitle(title) {
    this.formTitle.textContent = title;

    // Clear errors when switching between forms
    this.clearError();

    this.btnSignIn.style.display = title === TITLE_AUTHEN_PAGE.LOGIN ? DISPLAY_CLASS.BLOCK : DISPLAY_CLASS.HIDDEN;
    this.btnSignUp.style.display = title === TITLE_AUTHEN_PAGE.REGISTER ? DISPLAY_CLASS.BLOCK : DISPLAY_CLASS.HIDDEN;
    this.actionSigninButton.classList.toggle(DISPLAY_CLASS.ACTIVE, title === TITLE_AUTHEN_PAGE.LOGIN);
    this.actionSignupButton.classList.toggle(DISPLAY_CLASS.ACTIVE, title === TITLE_AUTHEN_PAGE.REGISTER);
    this.confirmPasswordGroup.classList.toggle(DISPLAY_CLASS.FLEX, title === TITLE_AUTHEN_PAGE.REGISTER);
  }

  /** Handle Sign In button click. */
  handleSignInClick() {
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    const isBothFieldsEmpty = email.trim() === '' && password.trim() === '';

    if (isBothFieldsEmpty) {
      this.showErrorToast(LOGIN_MESSAGES.EMPTY);
    } else {
      this.controller.login(email, password);
    }
  }

  /** Handle Sign Up button click. */
  handleSignUpClick() {
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    const confirmPassword = this.confirmPasswordInput.value;

    this.controller.register(email, password, confirmPassword);
  }

  /**
   * Handle form submission.
   * @param {Event} event - The form submission event.
   */
  async handleLoginFormSubmit(event) {
    event.preventDefault();

    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    const confirmPassword = this.confirmPasswordInput.value;

    this.clearError();

    const user = {
      email,
      password,
      confirmPassword,
    };
    const errors = validateUserAuthen(user);

    if (Object.keys(errors).length) {
      showFormErrors(errors, this);
    } else {
      try {
        if (this.formTitle.textContent === TITLE_AUTHEN_PAGE.REGISTER) {
          await this.controller.register(email, password, confirmPassword);
        } else {
          await this.controller.login(email, password);
        }
      } catch (error) {
        this.showErrorToast(error.message);
      }
    }
  }

  /**
   * Show success toast message.
   * @param {string} message - The success message to display.
   */
  showSuccessToast(message) {
    showToast(message, 'icon-success.svg', true);
  }

  /**
   * Show error toast message.
   * @param {string} message - The error message to display.
   */
  showErrorToast(message) {
    showToast(message, ICONS.ERROR, false);
  }
}
