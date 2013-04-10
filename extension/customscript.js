chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("received action "+request.action);

        if(request.action == "new_tweets") {
            processTweets();
        }

});
	
function sendMessage(message, callback) {
    console.log("send action "+message.action);

    if(callback == undefined)
        callback = function(response) {
            if(response!=undefined) {
                console.log("response on action "+message.action);
                console.log(response);
            }
        };

	chrome.extension.sendMessage(message, callback);
}

var initials_mapping = [];
var loaded = false;
  
$(document).ready( function() {

	console.log("page ready");

    // retrieve settings from background
    sendMessage({action:"load_settings"}, function(response) {
        var lines = response.split("\n");
        for(var i in lines) {
            var key_value = lines[i].split("=>");
            if(key_value.length == 2) {
                initials_mapping.push(
                    {
                        initials: key_value[0].trim(),
                        name: key_value[1].trim()
                    }
                );
            }
        }

        // make sure tweets are only processed after settings are loaded
        loaded = true;
        processTweets();
    });

});

function processTweets() {
    if(!loaded)
        return;

    var tweets = $(".stream-items .js-stream-tweet:not(.checked)");

	tweets.each(
		function(index, el) {
			var tweet = $(el);

            for(var i in initials_mapping) {
                if(tweet.find(".js-tweet-text").text().indexOf(initials_mapping[i].initials) != -1) {
                    tweet.find(".js-tweet-text").html(
                        tweet.find(".js-tweet-text").html().replace(initials_mapping[i].initials, "<span title='"+initials_mapping[i].initials+"' style='color:#00a0d1;font-weight:800'>"+initials_mapping[i].name+"</span>")
                    );
                    break;
                }
            }

		}
	);
	
	console.log("processed " + tweets.length + " tweets");

    // mark tweets as already checked
    tweets.addClass("checked")
}
