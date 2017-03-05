function waitAndLog(msg) {
  return new Promise(resolve => setTimeout(function () {
    console.log(msg, 'Done');
    resolve(`${msg} data`);
  }, 1000));
}

// With the functions inline (with logging)

async function run () {
  try {
    const a = await async function A () {
      console.log('calling A');
      return await waitAndLog('A');
    }();
    const [b, c] = await Promise.all([
      async function B (...args) {
        console.log('calling B with', args);
        return await waitAndLog('B');
      }(a),
      async function C (...args) {
        console.log('calling C with', args);
        return await waitAndLog('C');
      }(a)
    ]);
    const d = await async function D (...args) {
      console.log('calling D with', args);
      return await waitAndLog('D');
    }(a, b);
    const e = await async function E (...args) {
      console.log('calling E with', args);
      return await waitAndLog('E');
    }(a, c);
    console.log('final results: ', { A: a, B: b, C: c, D: d, E: e });
  } catch (err) {
    console.log('err: ', err);
  }
}

run();

// With the functions inline (no logging)

// async function run () {
//   try {
//     const a = await async function A () {
//       return await waitAndLog('A');
//     }();
//     const [b, c] = await Promise.all([
//       async function B (...args) {
//         return await waitAndLog('B');
//       }(a),
//       async function C (...args) {
//         return await waitAndLog('C');
//       }(a)
//     ]);
//     const d = await async function D (...args) {
//       return await waitAndLog('D');
//     }(a, b);
//     const e = await async function E (...args) {
//       return await waitAndLog('E');
//     }(a, c);
//     console.log('final results: ', { A: a, B: b, C: c, D: d, E: e });
//   } catch (err) {
//     console.log('err: ', err);
//   }
// }
//
// run();

// With the functions extracted (with logging)

// async function A () {
//   console.log('calling A');
//   return await waitAndLog('A');
// }
//
// async function B (...args) {
//   console.log('calling B with', args);
//   return await waitAndLog('B');
// }
//
// async function C (...args) {
//   console.log('calling C with', args);
//   return await waitAndLog('C');
// }
//
// async function D (...args) {
//   console.log('calling D with', args);
//   return await waitAndLog('D');
// }
//
// async function E (...args) {
//   console.log('calling E with', args);
//   return await waitAndLog('E');
// }
//
// async function run () {
//   try {
//     const a = await A();
//     const [b, c] = await Promise.all([B(a), C(a)]);
//     const d = await D(a, b);
//     const e = await E(a, c);
//     console.log('final results: ', { A: a, B: b, C: c, D: d, E: e });
//   } catch (err) {
//     console.log('err: ', err);
//   }
// }
//
// run();

// With the functions extracted (with logging)

// async function A () {
//   return await waitAndLog('A');
// }
//
// async function B (...args) {
//   return await waitAndLog('B');
// }
//
// async function C (...args) {
//   return await waitAndLog('C');
// }
//
// async function D (...args) {
//   return await waitAndLog('D');
// }
//
// async function E (...args) {
//   return await waitAndLog('E');
// }
//
// async function run () {
//   try {
//     const a = await A();
//     const [b, c] = await Promise.all([B(a), C(a)]);
//     const d = await D(a, b);
//     const e = await E(a, c);
//     console.log('final results: ', { A: a, B: b, C: c, D: d, E: e });
//   } catch (err) {
//     console.log('err: ', err);
//   }
// }
//
// run();
