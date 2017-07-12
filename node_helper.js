var NodeHelper = require('node_helper');
var request = require('request');
module.exports = NodeHelper.create({

  start: function(){
    console.log("Starting node helper for: " + this.name);
  },

  socketNotificationReceived: function(notification, payload) {
    var self = this;
    request({ url: 'https://www.reddit.com/r/quotes/random/.json', method: 'GET' }, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            var result = JSON.parse(body);
            self.sendSocketNotification('new-quote', result[0]['data']['children'][0]['data']['title']);
          }
      });
    //this.sendSocketNotification('new-quote', a[0]['data']['children'][0]['data']['title']);
  },
});
