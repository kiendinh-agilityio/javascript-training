export const handleTogglePassword = () => {
  const togglePasswordButtons = document.querySelectorAll('.toggle-password');

  togglePasswordButtons.forEach((togglePasswordButton) => {
    togglePasswordButton.addEventListener('click', () => {
      const inputField = togglePasswordButton.parentElement.querySelector('.show-password');
      const eyeImage = togglePasswordButton.querySelector('img');
      const isShow = inputField.getAttribute('data-is-show') === 'true';

      // Change eye image
      const eyeImageSrc = isShow ? '/images/svg/eye-key-password.svg' : '/images/svg/eye-password.svg';
      eyeImage.src = eyeImageSrc;

      // Reverse the display style of the password input field
      inputField.type = isShow ? 'password' : 'text';
      inputField.setAttribute('data-is-show', isShow ? 'false' : 'true');
    });
  });
};
