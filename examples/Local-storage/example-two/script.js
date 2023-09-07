// Function to save data to localStorage
const saveData = () => {
  const data = document.getElementById('inputText').value;
  localStorage.setItem('userInput', data);
  document.getElementById('inputText').value = '';
  document.getElementById('output').innerHTML = 'Data saved to local storage.';
};

// Function to retrieve data from localStorage
const retrieveData = () => {
  const data = localStorage.getItem('userInput');
  if (data) {
    document.getElementById('output').innerHTML =
      'Data from local storage: ' + data;
  } else {
    document.getElementById('output').innerHTML =
      'No data found in local storage.';
  }
};

// Function to clear data from localStorage
const clearData = () => {
  localStorage.removeItem('userInput');
  document.getElementById('output').innerHTML =
    'Data cleared from local storage.';
};
