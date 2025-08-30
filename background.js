chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "TEXT_SELECTED") {
    console.log("User highlighted:", message.text);

    // Mock analysis result for now - replace with actual API call later
    const mockAnalysis = {
      score: Math.floor(Math.random() * 100),
      verdict: Math.random() > 0.5 ? "Likely True" : "Needs Verification",
      sources: [
        { title: "Example Source 1", url: "https://example.com/source1" },
        { title: "Example Source 2", url: "https://example.com/source2" }
      ],
      explanation: `Analysis of "${message.text.substring(0, 50)}..." shows mixed signals. Further verification recommended.`
    };

    // Store with the key that popup.jsx expects
    chrome.storage.local.set({ AnalysisResult: mockAnalysis });
  }
});
