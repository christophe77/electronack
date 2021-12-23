import { useState } from "react";
const { WebSocket } = window.require('ws');
const http = window.require('http');

export default function useSocket() {
    const [bots, setBots] = useState([]);
    const [serverStatus, setServerStatus]=useState<string>("disconnected")
    function broadcast(message: string) {
        bots.forEach(bot => bot.socket.send(message))
    }
    function startListening() {
        const port = 4444;
        const server = http.createServer();
        const wss = new WebSocket.Server({ server });
        wss.on("connection", (ws: any) => {
            setBots([...bots, { name: "aaaa", id: 1234, socket: ws }])
            //connection is up, let's add a simple simple event
            ws.on("message", (message: string) => {
                //log the received message and send it back to the client
                console.log("received: %s", message);
                ws.send(`Hello, you sent -> ${message}`);
            });

            //send immediatly a feedback to the incoming connection
            ws.send("Hi there, I am a WebSocket server");
        });

        //start our server
        server.listen(port, () => {
            setServerStatus(`listening on port ${port}`)
        });
    }
    return { bots, broadcast,startListening ,serverStatus}
}