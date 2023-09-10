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
