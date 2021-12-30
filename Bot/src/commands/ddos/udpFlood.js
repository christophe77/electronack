const { parentPort, workerData } = require("worker_threads");

parentPort.postMessage(udpFlood(workerData));

function udpFlood(datas) {
  const { ip, port, duration } = datas;
  //
  // Implement your logic here
  //
  try {
    setTimeout(() => {
      return `${ip}:${port}`;
    }, duration);
  } catch (error) {
    return error;
  }
}
