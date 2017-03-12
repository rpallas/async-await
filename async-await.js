function waitAndLog(msg, data) {
  data.callOrder.push(`${msg} Start`);
  return new Promise(resolve => setTimeout(() => {
    data.callOrder.push(`${msg} Finish`);
    resolve(`${msg} data`);
  }, 100));
}

async function A (data) {
  return await waitAndLog('A', data);
}

async function B (data) {
  return await waitAndLog('B', data);
}

async function C (data) {
  return await waitAndLog('C', data);
}

async function D (data) {
  return await waitAndLog('D', data);
}

async function E (data) {
  return await waitAndLog('E', data);
}

async function run (data = { callOrder: [] }) {
  try {
    data.a = await A(data);
    await Promise.all([
      B(data).then(() => D(data)),
      C(data).then(() => E(data))
    ]);
  } catch (err) {
    console.log('err: ', err);
  }
  return data;
}

module.exports = {
  run
};
