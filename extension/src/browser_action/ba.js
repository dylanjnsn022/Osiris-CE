chrome.tabs.query( { active: true, currentWindow: true }, function( tabs ) {
  chrome.tabs.update( tabs[0].id, { url: "https://support.google.com/?hl=en" } ); 
});
