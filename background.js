chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "TEXT_SELECTED") {
    console.log("User highlighted:", message.text);

    // 🚀 Next step: send this text to your backend API
    // For now, just save it in storage
    chrome.storage.local.set({ lastSelected: message.text });
  }
});
