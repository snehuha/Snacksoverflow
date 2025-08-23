// Listen when the user selects text on the page
document.addEventListener("mouseup", () => {
  let selectedText = window.getSelection().toString().trim(); //grabs the texts which user selects

  if (selectedText.length > 0) {
    // Send the selected text to background.js
    chrome.runtime.sendMessage({
      action: "TEXT_SELECTED",
      text: selectedText
    });
  }
});