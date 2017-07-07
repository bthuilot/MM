var NodeHelper = require("node_helper");
var fetch = require('node-fetch');
module.exports = NodeHelper.create({

  socketNotificationReceived: function(notification, payload) {
	   if(notification == "request-quote"){
       this.getQuote();
     }
  },

  getQuote: function(){
    fetch('https://www.reddit.com/r/quotes/random/.json')
        .then(function(res) {
            return res.json();
        }).then(function(json) {
            var rawQuote = json[0]['data']['children'][0]['data']['title'];
            this.sendSocketNotification('new-quote', rawQuote);
        });
  },
});
