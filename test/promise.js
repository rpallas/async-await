const Test = require('ava').test;

const promise = require('./../promise');

Test.cb('B is called after A is complete', t => {
  promise.run().then(() => {
    t.true(result.callOrder.indexOf('B Start') > result.callOrder.indexOf('A Finish'));
    t.end();
  });
});

Test.cb('C is called after A is complete', t => {
  promise.run().then(() => {
    t.true(result.callOrder.indexOf('C Start') > result.callOrder.indexOf('A Finish'));
    t.end();
  });
});

Test.cb('D is called after A and B are complete', t => {
  promise.run().then(() => {
    t.true((result.callOrder.indexOf('D Start') > result.callOrder.indexOf('A Finish'))
       && ((result.callOrder.indexOf('D Start') > result.callOrder.indexOf('B Finish'))));
    t.end();
  });
});

Test.cb('E is called after A and C are complete', t => {
  promise.run().then(() => {
    t.true((result.callOrder.indexOf('E Start') > result.callOrder.indexOf('A Finish'))
       && ((result.callOrder.indexOf('E Start') > result.callOrder.indexOf('C Finish'))));
    t.end();
  });
});

Test.cb('It calls each function as soon as it\'s dependencies are satisfied', t => {
  promise.run().then(() => {
    t.deepEqual(result.callOrder, [
      'A Start',
      'A Finish',
      'B Start',
      'C Start',
      'B Finish',
      'D Start',
      'C Finish',
      'E Start',
      'D Finish',
      'E Finish'
    ]);
    t.end();
  });
});
