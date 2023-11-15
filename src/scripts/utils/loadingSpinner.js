import { DEBOUNCE_TIME } from '../constants/index';

const loadingContainer = document.getElementById('loading-container');

const loadingSpinner = {
  start: function () {
    loadingContainer.style.display = 'flex';
  },

  stop: function () {
    loadingContainer.style.display = 'none';
  },
};

export const startLoadingSpinner = () => {
  loadingSpinner.start();
};

export const stopLoadingSpinner = () => {
  loadingSpinner.stop();
};

export const delayActions = (callback) => {
  startLoadingSpinner();
  setTimeout(() => {
    callback();
    stopLoadingSpinner();
  }, DEBOUNCE_TIME);
};
