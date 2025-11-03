let ws;

function connectWS() {
  ws = new WebSocket("ws://127.0.0.1:4040");
  ws.onopen = () => console.log("[RQ Inspector] Connected to VS Code");
  ws.onclose = () => {
    console.log("[RQ Inspector] Disconnected, retrying...");
    setTimeout(connectWS, 2000);
  };
}

connectWS();

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "CACHE_SNAPSHOT" && ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(msg));
  }
});
