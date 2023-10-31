export const handleTogglePassword = (togglePasswordButton) => {
  const inputField = togglePasswordButton.parentElement.querySelector('.show-password');
  const eyeImage = togglePasswordButton.querySelector('img');
  const isShow = inputField.getAttribute('data-show-password') === 'show';

  const eyeImageSrc = isShow ? '/images/svg/eye-key-password.svg' : '/images/svg/eye-password.svg';
  eyeImage.src = eyeImageSrc;

  inputField.type = isShow ? 'password' : 'text';
  inputField.setAttribute('data-show-password', isShow ? 'hidden' : 'show');
};
