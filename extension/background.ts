chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    algoCoachInstalledAt: new Date().toISOString()
  });
});
