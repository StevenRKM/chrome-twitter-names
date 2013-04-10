chrome.webRequest.onCompleted.addListener(
  function(details) {
      if(details.tabId >= 0) {
	        sendMessage(details.tabId, {action: "new_tweets"} );
      }
  },
  {urls: ["<all_urls>"]}
  );
  
chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("tab "+sender.tab.id+" sends action "+request.action);

        if(request.action == "load_settings" ) {
            // make sure the page action is displayed
            chrome.pageAction.show(sender.tab.id);

            sendResponse(localStorage["settings_names_mapping"] || "");
        }

});

function sendMessage(id, message, callback) {
    console.log("send to tab "+id+" action "+message.action);

    if(callback == undefined)
        callback = function(response) {
            if(response!=undefined) {
                console.log("response from tab "+id+" on action "+message.action);
                console.log(response);
            }
        };

  chrome.tabs.sendMessage(id, message, callback);
}
