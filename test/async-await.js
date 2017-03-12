const Test = require('ava').test;

const asyncAwait = require('./../async-await');

Test('B is called after A is complete', async t => {
  let result = await asyncAwait.run();
  t.true(result.callOrder.indexOf('B Start') > result.callOrder.indexOf('A Finish'));
});

Test('C is called after A is complete', async t => {
  let result = await asyncAwait.run();
  t.true(result.callOrder.indexOf('C Start') > result.callOrder.indexOf('A Finish'));
});

Test('D is called after A and B are complete', async t => {
  let result = await asyncAwait.run();
  t.true((result.callOrder.indexOf('D Start') > result.callOrder.indexOf('A Finish'))
     && ((result.callOrder.indexOf('D Start') > result.callOrder.indexOf('B Finish'))));
});

Test('E is called after A and C are complete', async t => {
  let result = await asyncAwait.run();
  t.true((result.callOrder.indexOf('E Start') > result.callOrder.indexOf('A Finish'))
     && ((result.callOrder.indexOf('E Start') > result.callOrder.indexOf('B Finish'))));
});

Test('It calls each function as soon as it\'s dependencies are satisfied', async t => {
  let result = await asyncAwait.run();
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
});
