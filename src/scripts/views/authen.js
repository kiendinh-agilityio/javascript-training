import { handleTogglePassword, showToast } from '../utils/index';
import { validateUserAuthen, showFormErrors } from '../utils/validate/index';
import { authenSection } from '../dom.js';

export class AuthenView {
  constructor() {
    this.formTitle = authenSection.querySelector('#heading-auth');
    this.confirmPasswordGroup = authenSection.querySelector('#confirm-password-group');
    this.actionSigninButton = authenSection.querySelector('#btn-action-signin');
    this.actionSignupButton = authenSection.querySelector('#btn-action-signup');
    this.btnSubmitAuth = authenSection.querySelector('#btn-submit-auth');
    this.togglePasswordButtons = authenSection.querySelectorAll('.toggle-password');

    this.formAuth = document.getElementById('form-auth');
    this.emailInput = this.formAuth.querySelector('#email');
    this.passwordInput = this.formAuth.querySelector('#password');
    this.emailError = this.formAuth.querySelector('#email-error');
    this.passwordError = this.formAuth.querySelector('#password-error');

    this.actionSigninButton.addEventListener('click', this.handleSigninClick.bind(this));
    this.actionSignupButton.addEventListener('click', this.handleSignupClick.bind(this));

    this.togglePasswordButtons.forEach((togglePasswordButton) => {
      togglePasswordButton.addEventListener('click', () => handleTogglePassword(togglePasswordButton));
    });

    this.formAuth.addEventListener('submit', this.handleLoginFormSubmit.bind(this));
  }

  updateFormTitle(title) {
    this.formTitle.textContent = title;
  }

  handleSigninClick() {
    this.updateFormTitle('Sign In');
    this.actionSigninButton.classList.add('active');
    this.actionSignupButton.classList.remove('active');
    this.confirmPasswordGroup.classList.remove('flex');
    this.btnSubmitAuth.textContent = 'Sign In';
  }

  handleSignupClick() {
    this.updateFormTitle('Create New Account');
    this.confirmPasswordGroup.classList.add('flex');
    this.actionSignupButton.classList.add('active');
    this.actionSigninButton.classList.remove('active');
    this.btnSubmitAuth.textContent = 'Sign Up';
  }

  // Event Submit Form Sign in
  handleLoginFormSubmit(event) {
    event.preventDefault();

    const email = this.emailInput.value;
    const password = this.passwordInput.value;

    // Clear previous error messages
    this.emailError.textContent = '';
    this.passwordError.textContent = '';

    const user = { email, password };

    // Call validateUserAuthen function to check for errors
    const errors = validateUserAuthen(user);

    if (Object.keys(errors).length > 0) {
      // If there are errors, display them
      showFormErrors(errors, this);
    } else {
      // If there are no errors, proceed with other actions, such as submitting form data, logging in, etc.
      this.controller.login(email, password);
    }
  }

  // Show Toast Message Success or Error
  showSuccessToast(message) {
    showToast(message, 'icon-success.svg', true);
  }

  showErrorToast(message) {
    showToast(message, 'icon-error.svg', false);
  }
}
