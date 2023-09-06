/*
 * Get the list element ul
 */
const myLists = document.getElementById('myList');

/*
 * Attach click event to ul list element
 */
myLists.addEventListener('click', function (event) {
  // Use event.target to determine the specific element to be pressed
  if (event.target.tagName === 'LI') {
    console.log(`You clicked on: ${event.target.textContent}`);
    // Change the background color of the pressed li element
    event.target.style.backgroundColor = 'gray';
    event.target.style.color = 'blue';
  }
});
