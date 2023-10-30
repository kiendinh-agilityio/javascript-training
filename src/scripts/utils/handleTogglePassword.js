export const handleTogglePassword = () => {
  const passwordField = document.getElementById('password');
  const togglePasswordButton = document.querySelector('.toggle-password');
  const eyeImage = togglePasswordButton.querySelector('img');

  togglePasswordButton.addEventListener('click', (event) => {
    event.preventDefault();

    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      eyeImage.src = '/images/svg/eye-password.svg';
    } else {
      passwordField.type = 'password';
      eyeImage.src = '/images/svg/eye-key-password.svg';
    }
  });
};
