// Get parent element and child element
const parentElement = document.getElementById('parent');
const childElement = document.getElementById('child');

// Attach a click event to the parent element using capturing
parentElement.addEventListener(
  'click',
  function () {
    console.log('Parent element capturing');
  },
  true
);

// Attach a click event to the child element
childElement.addEventListener('click', function () {
  console.log('Child element clicked');
});
