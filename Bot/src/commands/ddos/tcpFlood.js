const { parentPort, workerData } = require("worker_threads");

parentPort.postMessage(tcpFlood(workerData));

function tcpFlood(datas) {
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
