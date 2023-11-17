import { DISPLAY_CLASS } from "../constants";

const loadingContainer = document.getElementById('loading-container');

const loadingSpinner = {
  start: function () {
    loadingContainer.style.display = DISPLAY_CLASS.FLEX;
  },

  stop: function () {
    loadingContainer.style.display = DISPLAY_CLASS.HIDDEN;
  },
};

export const startLoadingSpinner = () => {
  loadingSpinner.start();
};

export const stopLoadingSpinner = () => {
  loadingSpinner.stop();
};

export const delayAction = (callback, delayTime) => {
  startLoadingSpinner();
  setTimeout(() => {
    callback();
  }, delayTime);
};
