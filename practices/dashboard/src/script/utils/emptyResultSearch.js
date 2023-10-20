export const generateEmptyResultMessage = () => {
  const emptyResultMessage = document.createElement('div');
  emptyResultMessage.innerHTML = `
    <div class="empty-result-message">
      <p class="empty-result-text">No results were found.</p>
    </div>
  `;
};
