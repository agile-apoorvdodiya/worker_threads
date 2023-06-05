const { Worker } = require("worker_threads");

function runService(workerData, file) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(file, { workerData });
    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code !== 0)
        reject(
          new Error(`Stopped the Worker Thread with the exit code: ${code}`)
        );
    });
  });
}

(async function () {
  runService("w1::data", "./w1.js").then(res => {
    console.log('w1::message ', res)
  }).catch(err => {
    console.log('w1::failed ', err)
  });
  runService("w2::data", "./w2.js").then(res => {
    console.log('w2::message ', res)
  }).catch(err => {
    console.log('w2::failed ', err)
  });
})();
