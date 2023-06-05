const { workerData, parentPort } = require("worker_threads");

const doSomething = async () => {
  return new Promise((res, rej) => {
    let incr = 0;
    const interval = setInterval(() => {
      console.log("w2:: sec ", incr++);
      if (incr === 5) {
        interval.unref();
      }
    }, 1000);
    setTimeout(() => {
      console.log(">> w2::resolving");
      res("w2::completed");
    }, 5000);
  });
};
(async function () {
  doSomething()
    .then((res) => {
      parentPort.postMessage({ fileName: workerData, status: "Done" });
    })
    .catch((err) => {
      parentPort.postMessage({ fileName: workerData, status: "Failed" });
    });
})();
