# Async-Flattner

Node.js module which will flatten a multi-dimensional array of ints.

Will flatten a sparse array to flat list.

Only works on positive indexed arrays, negative indexed elements in javascript are considered properties not elements of the array.

NPM page [here](https://www.npmjs.com/package/async-flattner)

Try it out in your browser [here](https://tonicdev.com/npm/async-flattner)

## Usage


Install with `npm install async-flattner`


```
var flatten = require('async-flattner');

var arr = [1,2,3,[4,5],7,[8,[9]]];

flatten(arr)
    .then(function(result) {
      // do something with flat array
    })
    .fail(function (error) {
      // handle error
    });

// program continues asynchronously
```
