export class AuthenView {
  constructor() {
    this.formTitle = document.getElementById('heading-auth');
    this.confirmPasswordGroup = document.getElementById('confirm-password-group');
    this.actionSigninButton = document.getElementById('btn-action-signin');
    this.actionSignupButton = document.getElementById('btn-action-signup');
    this.btnSubmitAuth = document.getElementById('btn-submit-auth');
    this.actionSigninButton.addEventListener('click', this.handleSigninClick.bind(this));
    this.actionSignupButton.addEventListener('click', this.handleSignupClick.bind(this));
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
