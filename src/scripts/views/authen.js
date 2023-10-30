export default class PasswordView {
  constructor(controller) {
    this.controller = controller;
    this.passwordField = document.getElementById('password');
    this.confirmPasswordField = document.getElementById('confirmPassword');
    this.togglePasswordIcons = document.querySelectorAll('.toggle-password-icon');
    this.togglePasswordIcons.forEach((icon) => {
      icon.addEventListener('click', this.controller.togglePassword.bind(this.controller));
    });
  }

  updateUI() {
    this.passwordField.type = this.controller.isPasswordVisible() ? 'text' : 'password';
    this.confirmPasswordField.type = this.controller.isConfirmPasswordVisible() ? 'text' : 'password';

    this.togglePasswordIcons.forEach((icon) => {
      icon.classList.toggle('fa-eye-slash', !this.controller.isPasswordVisible());
      icon.classList.toggle('fa-eye', this.controller.isPasswordVisible());
    });
  }
}
