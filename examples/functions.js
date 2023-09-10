// Function declaration
function sum(a, b) {
  return a + b;
}

console.log(sum(4, 5)); // 9

// Function expression
const sum = function (a, b) {
  return a * b;
};

console.log(sum(12, 20)); // 240

// It is possible to assign a value to a Function expression
let sayHello = function () {
  console.log('Hello Kien'); // Hello Kien
};

let sayHi = sayHello;
sayHi();

// Arrow Function
const total = (a, b) => {
  return a / b;
};

console.log(total(8, 4)); // 2

// Example: Write a function that returns the minimum of two numbers.
const minNumer = (x, y) => {
  return x < y ? x : y;
};

console.log(minNumer(1, 10)); // 1

// Example: 1 to 10 to print primes
const checkIsPrime = (number) => {
  if (number < 2) return false;
  if (number === 2) return true;
  for (i = 2; i * i <= number; i++) {
    if (number % i === 0) return false;
  }
  return true;
};

for (let i = 1; i <= 10; i++) {
  if (checkIsPrime(i)) {
    console.log(i); // 2, 3, 4, 5, 7
  }
}
