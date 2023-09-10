/*
 *  Example about Callbacks
 */
const asyncFunction = (callback) => {
  /* run first */
  console.log('Start'); // Start
  /* runs after 3000 seconds */
  setTimeout(() => {
    callback();
  }, 3000);
  /* run first */
  console.log('Waiting'); // Waiting
};

/* pass printEnd to asyncFunction */
const printEnd = () => {
  console.log('End'); // End
};
asyncFunction(printEnd);

// Example Callbacks
const fetchDataWithCallback = (callback) => {
  // Simulating an API call
  setTimeout(() => {
    const data = { message: 'Data fetched with callbacks' };
    callback(data);
  }, 1000);
};

fetchDataWithCallback((data) => {
  console.log(data.message); // Data fetched with callbacks
});
