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

function setDefaultOptions() {
    localStorage["settings_names_mapping"] =
        "*AB => Magnilde\n"+
            "*AL => Borgny\n"+
            "*AV => Woglinda\n"+
            "*BS => Halfrid\n"+
            "*BW => Geirmund\n"+
            "*CJ => Hakon\n"+
            "*DA => Andras\n"+
            "*DG => Thorlak\n"+
            "*DL => Skipp\n"+
            "*DS => Oda\n"+
            "*GM => Odd\n"+
            "*HS => Nidhug\n"+
            "*JF => Yrar\n"+
            "*JW => Svein\n"+
            "*KD => Saehild\n"+
            "*KDM => Frida\n"+
            "*LL => Skuld\n"+
            "*MG => Thrain\n"+
            "*NT => Magne\n"+
            "*RD => Otkel\n"+
            "*RR => Kveld\n"+
            "*SB => Hrolleif\n"+
            "*SC => Mildri\n"+
            "*SO => Ull\n"+
            "*SR => Asgrim\n"+
            "*TT => Alfdis\n"+
            "*VJ => Einar";
}

// on install
chrome.runtime.onInstalled.addListener(function(details) {

    // check options on install
    if(details.reason == "install") {
        setDefaultOptions();
    }

    // also open browser on example page
    if(details.reason == "install" || details.reason == "update") {
        chrome.tabs.create({'url': "http://twitter.com/mobilevikingsBE"}, function(tab) {})
    }
});

// check options on each run
if(localStorage["settings_names_mapping"]==undefined) {
    setDefaultOptions();
}
