const Async = require('async');

const waitAndLog = (msg, callback) => {
  setTimeout(() => {
    console.log(`${msg} Done`);
    callback(null, `${msg} data`);
  }, 1000);
};

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
