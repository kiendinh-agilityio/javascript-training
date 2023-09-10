/* Add an item to an array */
const oddNumbers = [1, 3, 5];
oddNumbers.push(7);
console.log(oddNumbers); // [ 1, 3, 5, 7 ]

/* Remove an item from the end of to an array */
const evenNumbers = [2, 4, 6, 8];
evenNumbers.pop();
console.log(evenNumbers); // [2, 4, 6]

// Example: Array save from 1 to 5 print out Hello World + from 1 to 5
///add the number 100 to array

// define array
const arrItem = [1, 2, 3, 4, 5];

// define function to in
const printOut = (number) => {
  for (let i of number) {
    console.log('Hello World ' + i);
    /*
     * Hello World 1
     * Hello World 2
     * Hello World 3
     * Hello World 4
     * Hello World 5
     */
  }
};

printOut(arrItem); //add execute

// define function to add
const addItem = (a, b) => {
  a.push(b);
};

addItem(arrItem, 100);
console.log(arrItem); // [ 1, 2, 3, 4, 5, 100 ]
