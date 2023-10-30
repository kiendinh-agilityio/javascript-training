export const handleTogglePassword = () => {
  const togglePasswordButtons = document.querySelectorAll('.toggle-password');
  const passwordFields = document.querySelectorAll('.show-password');

  // Event handler function for showing/hiding password
  const togglePassword = (passwordField, toggleButton) => (event) => {
    event.preventDefault();

    const eyeImage = toggleButton.querySelector('img');
    const isPasswordFieldHidden = passwordField.type === 'password';

    // Reverse the display style of the password input field
    passwordField.type = isPasswordFieldHidden ? 'text' : 'password';

    // Change eye image
    eyeImage.src = isPasswordFieldHidden ? '/images/svg/eye-password.svg' : '/images/svg/eye-key-password.svg';
  };

  // Assign events to each "toggle-password" button
  togglePasswordButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const toggleId = button.getAttribute('data-toggle-id');
      togglePassword(passwordFields[toggleId - 1], button)(event);
    });
  });
};
