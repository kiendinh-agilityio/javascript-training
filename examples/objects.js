// Define object
const myName = {
  firstName: 'Kien',
  lastName: 'Dinh',
};

console.log(myName.firstName); // Kien

// Change Object property value
const car = {
  ford: 'focus',
  toyota: 'vios',
};

car.toyota = 'camry';
console.log(car); // { ford: 'focus', toyota: 'camry' }

// Add value from Object
const car = {
  ford: 'focus',
  toyota: 'vios',
};

car.honda = 'civic';
console.log(car); // { ford: 'focus', toyota: 'vios', honda: 'civic' }

// Remove value from Object
const car = {
  ford: 'focus',
  toyota: 'vios',
  honda: 'civic',
};

delete car.ford;
console.log(car); // { toyota: 'vios', honda: 'civic' }

// Example 1
const car = {
  modal: 'Lexus',
  type: '500',
  color: 'White',
};
console.log(car.modal); // Lexus
console.log(car.type); // 500
console.log(car.color); // White

// Example 2
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.yearOfBirth = bornYear;
}
function bornYear() {
  return 2023 - this.age;
}
const yearBirthPerson = new Person('Kien', 26);
console.log(yearBirthPerson.yearOfBirth()); // 1997

// Example 3: Change the value of Object property
const profile = {
  firstName: 'Kien',
  lastName: 'Dinh',
  favoriteNumber: 19,
};
profile.favoriteNumber = 27;
console.log(profile); // { firstName: 'Kien', lastName: 'Dinh', favoriteNumber: 27 }

// Add the value of Object property
const myCar = {
  name: 'Audi',
  vehicles: 'Sedan',
};
myCar.color = 'White';
console.log(myCar); // { name: 'Audi', vehicles: 'Sedan', color: 'White' }
