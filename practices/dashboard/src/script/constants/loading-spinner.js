const loadingContainer = document.getElementById('loading-container');

export const loadingSpinner = {
  start: function () {
    loadingContainer.style.display = 'flex';
  },

  stop: function () {
    loadingContainer.style.display = 'none';
  },
};
