var NodeHelper = require("node_helper");
var fetch = require('node-fetch');
module.exports = NodeHelper.create({

  start: function(){
    Log.info("Starting node helper for: " + this.name);
  }

  socketNotificationReceived: function(notification, payload) {
	   if(notification == "request-quote"){
       fetch('https://www.reddit.com/r/quotes/random/.json')
         .then(function(res) {
               return res.json();
         }).then(function(json) {
             var rawQuote = json[0]['data']['children'][0]['data']['title'];
             this.sendSocketNotification('new-quote', rawQuote);
         });
     }
  },
});
