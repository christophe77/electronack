const slowloris = require("./slowloris")
const tcpFlood = require("./tcpFlood")
const udpFlood = require("./udpFlood")

const ddos = {
  slowloris,
  tcpFlood,
  udpFlood,
};
module.exports = ddos;
