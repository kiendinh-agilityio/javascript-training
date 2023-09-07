const storedData = localStorage.getItem('userData');
const data = {
  name: 'John',
  age: 30,
};
/*
 * Function to set value to local storage
 */
const setItem = () => {
  // Convert object to JSON string before storing
  localStorage.setItem('userData', JSON.stringify(data));
  document.getElementById('demo').innerHTML =
    'Data has been set in local storage.';
};

/*
 * Function to retrieve value from local storage
 */
const getItem = () => {
  if (storedData) {
    // Convert JSON string to object when retrieving
    const userData = JSON.parse(storedData);
    document.getElementById('demo').innerHTML =
      'Name: ' + userData.name + ', Age: ' + userData.age;
  } else {
    document.getElementById('demo').innerHTML =
      'No data found in local storage.';
  }
};

/*
 * Function to delete value from local storage
 */
const removeItem = () => {
  localStorage.removeItem('userData');
  document.getElementById('demo').innerHTML =
    'Data has been removed from local storage.';
};
