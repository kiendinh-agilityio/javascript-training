const linkList = document.getElementById('linkList');

linkList.addEventListener('mouseover', function (event) {
  if (event.target.tagName === 'A') {
    event.target.style.color = 'blue'; // Change the color of the link on hover
  }
});

linkList.addEventListener('mouseout', function (event) {
  if (event.target.tagName === 'A') {
    event.target.style.color = ''; // Reset the color of the link when hovering away from it
  }
});
