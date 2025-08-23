chrome.storage.local.get("TEXT_SELECTED", (data) => {
  document.getElementById("result").innerText =
    data.misinfoResult || "No analysis yet.";
});
