/*
 *  Example about Asynchronous
 */
const networkRequest = () => {
  /* runs after 5 seconds */
  setTimeout(() => {
    console.log('After'); // after
  }, 5000);
  /* runs after 2 seconds */
  setTimeout(() => {
    console.log('Before'); // before
  }, 2000);
};
/* run first */
console.log('Hello World'); // Hello world
networkRequest();

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
