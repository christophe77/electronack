import { useState } from "react";
import { Bot, ServerStatus } from "./types";
const { WebSocket } = window.require("ws");
const http = window.require("http");

interface IUseSocket {
  startListening: () => void;
  stopListening: () => void;
  bots: Bot[];
  serverStatus: ServerStatus;
  broadcast: (message: string) => void;
}
export default function useSocket(): IUseSocket {
  const [bots, setBots] = useState([]);
  const [serverStatus, setServerStatus] = useState<ServerStatus>({
    connected: false,
    status: "disconnected",
  });
  const port = 4444;
  const server = http.createServer();
  const wss = new WebSocket.Server({ server });

  function broadcast(message: string) {
    bots.forEach((bot) => bot.socket.send(message));
  }
  function stopListening() {
    //
    // Implement server disconection
    //
    setServerStatus({
      connected: false,
      status: "disconnected",
    });
  }
  function startListening() {
    wss.on("connection", (ws: any) => {
      ws.on("message", (bufferMessage: Buffer) => {
        const message = bufferMessage.toString();
        if (message.includes("identification")) {
          const messageSplit = message.split(" ");
          setBots([
            ...bots,
            {
              name: messageSplit[1],
              platform: messageSplit[2],
              id: messageSplit[3],
              socket: ws,
            },
          ]);
        }
        else if (message.includes("bye")) {
          const messageSplit = message.split(" ");
          const id = messageSplit[1];
          const botsClone = [...bots];
          const botIndex = botsClone.findIndex(bot => bot.id === id);
          botsClone.splice(botIndex, 1);
          setBots(botsClone);
        }
      });
    });
    server.listen(port, () => {
      setServerStatus({
        connected: true,
        status: `listening on port ${port}`,
      });
    });
  }
  return { bots, broadcast, startListening, stopListening, serverStatus };
}
