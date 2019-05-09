const Async = require('async');

const waitAndLog = (msg, data, callback, delay=100) => {
  data.callOrder.push(`${msg} Start`);
  setTimeout(() => {
    data.callOrder.push(`${msg} Finish`);
    callback(null, `${msg} data`);
  }, delay);
};

function A (data) {
  return (callback) => {
    waitAndLog('A', data, callback);
  };
}
function B (data) {
  return (results, callback) => {
    // shorter delay to be sure of expected order
    waitAndLog('B', data, callback, 99);
  };
}
function C (data) {
  return (results, callback) => {
    waitAndLog('C', data, callback);
  };
}
function D (data) {
  return (results, callback) => {
    waitAndLog('D', data, callback);
  };
}
function E (data) {
  return (results, callback) => {
    waitAndLog('E', data, callback);
  };
}

function run(data = { callOrder: [] }, callback) {
  Async.auto({
    A: A(data),
    B: ['A', B(data)],
    C: ['A', C(data)],
    D: ['A', 'B', D(data)],
    E: ['A', 'C', E(data)]
  }, (err, results) => {
    let finalResults = {};
    Object.assign(finalResults, data, results);
    callback(err, finalResults);
  });
}

module.exports = {
  run
};
