import { WebSocketServer } from 'ws';

export function startWebSocketServer(onMessage: (data: any) => void) {
  const wss = new WebSocketServer({ port: 4040 });

  console.log("✅ [Inspector] Listening on ws://localhost:4040");

  wss.on("connection", (ws) => {
    console.log("📡 [Inspector] Browser connected");

    ws.on("message", (msg) => {
      try {
        const data = JSON.parse(msg.toString());
        onMessage(data);
      } catch (err) {
        console.error("Invalid message from browser:", err);
      }
    });

    ws.on("close", () => console.log("❌ [Inspector] Browser disconnected"));
  });
}
