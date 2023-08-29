class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  show() {
    return `${this.name} ${this.age}`;
  }
}
/*
 * When want to create a Person object, just declare it like this:
 */
let student = new Person('Kien', 18);
