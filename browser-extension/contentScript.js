// Inject the code into the actual webpage context
const script = document.createElement("script");
script.src = chrome.runtime.getURL("inject.js");
(document.head || document.documentElement).appendChild(script);

// Listen for messages from injected script
window.addEventListener("message", (event) => {
  if (event.source !== window) return;
  if (event.data && event.data.__RQ_INSPECTOR__) {
    chrome.runtime.sendMessage(event.data);
  }
});
