import { handleTogglePassword } from '../utils/index';
import { authenSection } from '../dom.js';

export class AuthenView {
  constructor() {
    this.formTitle = authenSection.querySelector('#heading-auth');
    this.confirmPasswordGroup = authenSection.querySelector('#confirm-password-group');
    this.actionSigninButton = authenSection.querySelector('#btn-action-signin');
    this.actionSignupButton = authenSection.querySelector('#btn-action-signup');
    this.btnSubmitAuth = authenSection.querySelector('#btn-submit-auth');
    this.togglePasswordButtons = authenSection.querySelectorAll('.toggle-password');

    this.actionSigninButton.addEventListener('click', this.handleSigninClick.bind(this));
    this.actionSignupButton.addEventListener('click', this.handleSignupClick.bind(this));

    this.togglePasswordButtons.forEach((togglePasswordButton) => {
      togglePasswordButton.addEventListener('click', () => handleTogglePassword(togglePasswordButton));
    });
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
}
