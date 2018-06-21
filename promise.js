const await = function (promiseArray) {
  const all = Promise.all(promiseArray);
  const then = all.then;
  all.then = function (func) {
    all.then = then;
    return all.then((dep) => {
      return func(...dep);
    });
  };
  return all;
}

console.log('a about to be called')
const a = Promise.resolve('this ');
const b = await([a]).then(
  (a) => {
    console.log('b was called')
    return 'is ';
  }
);

const c = await([a]).then(
  (a) => {
    console.log('c was called')
    return 'pretty ';
  }
);

const d = await([a, b]).then(
  (a, b) => {
    console.log('d is being called')
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('d is returning')
        resolve('damn ');
      }, 2000);
    });
  }
);

const e = await([a, c]).then(
  (b, c) => {
    console.log('e is being called')
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('e is returning')
        resolve('cool ');
      }, 500);
    });
  }
);

const run = function () {
  return await([a, b, c, d, e]).then(
    (a, b, c, d, e) => {
      console.log(a + b + c + d + e);
    }
  );
}

module.exports = {
  run
};
