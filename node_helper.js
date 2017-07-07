var fetch = require('node-fetch');
var NodeHelper = require("node_helper");
module.exports = NodeHelper.create({

  start: function(){
    console.log("Starting node helper for: " + this.name);
  },

  socketNotificationReceived: function(notification, payload) {
    fetch('https://www.reddit.com/r/quotes/random/.json')
      .then(function(res) {
        return res.json();
      }).then(function(json) {
        var rawQuote = json[0]['data']['children'][0]['data']['title'];
        this.sendSocketNotification('new-quote', rawQuote);
      });
  },
});
