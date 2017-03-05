const Async = require('async');

const waitAndLog = (msg, callback) => {
  setTimeout(() => {
    console.log(`${msg} Done`);
    callback(null, `${msg} data`);
  }, 1000);
};


// With the functions inline (with logging)

Async.auto({
  A: (callback) => {
    console.log('calling A');
    waitAndLog('A', callback);
  },
  B: ['A', (results, callback) => {
    console.log('calling B with:', results);
    waitAndLog('B', callback);
  }],
  C: ['A', (results, callback) => {
    console.log('calling C with:', results);
    waitAndLog('C', callback);
  }],
  D: ['A', 'B', (results, callback) => {
    console.log('calling D with:', results);
    waitAndLog('D', callback);
  }],
  E: ['A', 'C', (results, callback) => {
    console.log('calling E with:', results);
    waitAndLog('E', callback);
  }]
}, (err, results) => {
  console.log(err || 'final results: ', results);
});

// With the functions inline (no logging)

// Async.auto({
//   A: (callback) => {
//     waitAndLog('A', callback);
//   },
//   B: ['A', (results, callback) => {
//     waitAndLog('B', callback);
//   }],
//   C: ['A', (results, callback) => {
//     waitAndLog('C', callback);
//   }],
//   D: ['A', 'B', (results, callback) => {
//     waitAndLog('D', callback);
//   }],
//   E: ['A', 'C', (results, callback) => {
//     waitAndLog('E', callback);
//   }]
// }, (err, results) => {
//   console.log(err || 'final results: ', results);
// });


// With the functions extracted (with logging)

// function A () {
//   return (callback) => {
//     console.log('calling A');
//     waitAndLog('A', callback);
//   }
// }
//
// function B () {
//   return (results, callback) => {
//     console.log('calling B with:', results);
//     waitAndLog('B', callback);
//   }
// }
//
// function C () {
//   return (results, callback) => {
//     console.log('calling C with:', results);
//     waitAndLog('C', callback);
//   }
// }
//
// function D () {
//   return (results, callback) => {
//     console.log('calling D with:', results);
//     waitAndLog('D', callback);
//   }
// }
//
// function E () {
//   return (results, callback) => {
//     console.log('calling E with:', results);
//     waitAndLog('E', callback);
//   }
// }
//
// Async.auto({
//   A: A(),
//   B: ['A', B()],
//   C: ['A', C()],
//   D: ['A', 'B', D()],
//   E: ['A', 'C', E()]
// }, (err, results) => {
//   console.log(err || 'final results: ', results);
// });


// With the functions extracted (no logging)

// function A () {
//   return (callback) => {
//     waitAndLog('A', callback);
//   }
// }
//
// function B () {
//   return (results, callback) => {
//     waitAndLog('B', callback);
//   }
// }
//
// function C () {
//   return (results, callback) => {
//     waitAndLog('C', callback);
//   }
// }
//
// function D () {
//   return (results, callback) => {
//     waitAndLog('D', callback);
//   }
// }
//
// function E () {
//   return (results, callback) => {
//     waitAndLog('E', callback);
//   }
// }
//
// Async.auto({
//   A: A(),
//   B: ['A', B()],
//   C: ['A', C()],
//   D: ['A', 'B', D()],
//   E: ['A', 'C', E()]
// }, (err, results) => {
//   console.log(err || 'final results: ', results);
// });
