chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {

        if(request.action == "new_tweets") {
            process_tweets();
        } else if(request.action == "settings") {
            //process_tweets();
            console.log("check settings");
        }

});
	
function sendMessage(message, callback) {
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
        process_tweets();
    });

});

function process_tweets() {
    if(!loaded)
        return;

    var tweets = $(".stream-items .js-stream-tweet:not(.checked)");

//    if(tweets.length == 0)
//        return;

	tweets.each(
		function(index, el) {
			var tweet = $(el);

            for(var i in initials_mapping) {
                if(tweet.find(".js-tweet-text").text().indexOf(initials_mapping[i].initials) != -1) {
                    tweet.find(".js-tweet-text").html(
                        tweet.find(".js-tweet-text").html().replace(initials_mapping[i].initials, "<span style='color:blue'>"+initials_mapping[i].name+"</span>")
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
