// Function to modify the text content of the paragraph
const changeText = () => {
  const p = document.querySelector('p');
  p.textContent = 'I changed because of an inline event handler.';
};
