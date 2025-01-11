import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let allSockets: WebSocket[] = [];
let userCount = 0;

wss.on("connection", (socket) => {
  allSockets.push(socket);

  userCount = userCount + 1;
  console.log("user connected #" + userCount);

  socket.on("message", (message) => {
    console.log("message received " + message.toString());
    for (let i = 0; i < allSockets.length; i++) {
      const s = allSockets[i];
      s.send(message.toString() + ": sent from the server")
    }
    socket.send(message.toString() + " : sent fom the server");
  });
});
