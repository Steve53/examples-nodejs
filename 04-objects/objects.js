
// The OLOO pattern
// Objects Linked to Other Objects

var dog = {
  init: function(name, age, weight) {
    this.name = name;
    this.age = age;
    this.weight = weight;
  },
  describeYourself: function() {
    return 'My name is ' + this.name + ', and I weigh ' + this.weight + ' pounds.';
  }
}

var smallDog = Object.create(dog);
smallDog.init('Fido', 5, 15);
console.log(smallDog.describeYourself());

var bigDog = Object.create(dog);
bigDog.init('Ralph', 8, 75);
console.log(bigDog.describeYourself());

// Notes
// There are no types being created here. There is no dog type.
// We have an object named dog, but not a dog type.
// The object named dog is the prototype object of the object named smallDog.
// name, age, and weight are data properties on smallDog and bigDog, not on dog.
// The dog object does not have data properies.

// The object named smallDog has a prototype object named dog.

//---------------------------------------------------------

// The constructor/prototype pattern

function Cat(name, age, weight) {
  this.name = name;
  this.age = age;
  this.weight = weight;
}

Cat.prototype.describeYourself = function() {
  return 'My name is '+ this.name + ' and I weigh ' + this.weight + " pounds.";
}

myCat = new Cat('fluff', 10, 15);
console.log(myCat.describeYourself());

// Notes
// There is no Cat type.
// We have an object named Cat. It is a function object.
// The object named Cat automatically has a prototype object named Cat.prototype.
// The object named Cat.prototype has no data properties.
// The object named Cat has no data properties.
// The object named myCat has data properties.

// The object named myCat has a prototype object named Cat, which
// has a prototype object named Cat.prototype.

// Remember: Cat.prototype is not a type. It is an object.

//------------------------------------------------------------------

// Back to the OLOO pattern

// Suppose I have a bunch of students.
// Each has a first name, last name, and an array of scores.
// For each, I want to caluclate a grade.


var student = {
  averageScore: function() {
    var total = 0;
    this.scores.forEach( function(e, i, a){total += e} );
    return total/this.scores.length;
  },
  grade: function() {
    if(this.averageScore() >= 70) {
      grade = 'A';
    }
    else {
      grade = 'B';
    }
    return grade;
  }
}

var s01 = Object.create(student);
s01.firstName = 'Steve';
s01.lastName = 'Jones';
s01.scores = [80, 90, 75];
console.log(s01.lastName, s01.grade());

var s02 = Object.create(student);
s02.firstName = 'Bob';
s02.lastName = 'Smith';
s02.scores = [60, 75, 80, 45, 78];
console.log(s02.lastName, s02.grade());

// Notes
// There is no student class.
// There is an object named student.
// There are objects named s01 and s02.
// The object named s01 has a prototype object named student.
// The object named s01 delegates its grade calculation to the object named student.
// The student object is the delegate.
// The s01 and s02 objects are the delegators.

// https://github.com/getify/You-Dont-Know-JS/blob/master/this%20&%20object%20prototypes/ch6.md#delegation-theory










