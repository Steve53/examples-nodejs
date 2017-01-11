The package.json file specifies that our app requires the
[express()](http://expressjs.com/en/4x/api.html)
module.

    {
      "dependencies": {
        "express": "^4.13.3"
      }
    }

The npm install command reads package.json and sees that
we require express. Then it installs express and all of its
dependencies. The dependencies (source code files) are placed
in the node_modules directory.

Install dependencies:
 
    npm install

Run the app:

    nodejs hello-express.js

Run the app under the debugger:

    nodejs debug hello-express.js

In the browser:

    http://localhost:8080

Stop the app:

    CTRL-C

### The code

The call to require('express') returns the value of the
[module.exports](http://www.sitepoint.com/understanding-module-exports-exports-node-js/)
object in the express.js module.
In this case, the exports object is a function, or we could say a *function object*.
As a function, it can be called. As an object, it can have properties and methods.

In this first bit of code, we call the fucntion e() and assign its return value to a.

    var e = require('express');
    var a = e();

The function e() returns another function object.
So the variable a is a function object. As an object, a can have properties and methods.
Somewhere in a's prototype chain, there is a **get** method.

We call **a.get** to associate an anonymous handler with HTTP GET '/'.
Our handler sends a response of Hello Steve.

    a.get('/', function(req, res) {
      res.send('Hello, Steve!');
    });

We call a.listen to start a local web server that listens on port 8080.

    a.listen(8080);

### References

* [Prototypal Inheritance in JavaScript](http://javascript.crockford.com/prototypal.html)

* [JavaScript Object Creation: Patterns and Practices](https://www.sitepoint.com/javascript-object-creation-patterns-best-practises/)

* [Object Oriented JavaScript Pattern Comparison](https://john-dugan.com/object-oriented-javascript-pattern-comparison/)

* [Stackoverflow, functions and objects](http://stackoverflow.com/questions/3449596/every-object-is-a-function-and-every-function-is-object-which-is-correct)

* [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

* [Function.prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/prototype)

