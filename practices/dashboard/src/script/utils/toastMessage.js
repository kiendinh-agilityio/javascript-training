import { DISPLAY_CLASS } from '../constants/index';

// Function to create toast container
const createToastContainer = (message) => {
  const toastContainer = document.createElement('div');
  toastContainer.innerHTML = `
      <div class="toast items-center">
        <img width="30px" height="30px" src="../images/svg/icon-success.svg" alt="Success icon">
        <p class="toast-text">${message}</p>
      </div>
  `;
  return toastContainer;
};

// Function to display toast
export const showToast = (message) => {
  const toastContainer = createToastContainer(message);
  document.body.appendChild(toastContainer);

  toastContainer.style.display = DISPLAY_CLASS.FLEX;

  setTimeout(() => {
    toastContainer.style.display = DISPLAY_CLASS.HIDDEN;
    document.body.removeChild(toastContainer);
  }, 2000);
};
