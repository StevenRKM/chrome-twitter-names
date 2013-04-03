chrome.webRequest.onCompleted.addListener(
  function(details) {
	sendMessage(details.tabId, {action: "new_tweets"} );
  },
  {urls: ["<all_urls>"]}
  );
  
chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {

        if(request.action == "load_settings" ) {
            sendResponse(localStorage["settings_names_mapping"]);
        }

});

function sendMessage(id, message) {
  chrome.tabs.sendMessage(id, message, function(response) {
	console.log(response);
  });
}
