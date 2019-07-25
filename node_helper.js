var NodeHelper = require('node_helper');

const URL = 'https://www.reddit.com/r/quotes/random/.json';

module.exports = NodeHelper.create({

  start: function(){
    console.log("Starting node helper for: " + this.name);
  },

  socketNotificationReceived: function(notification, payload) {
    var self = this;
    const http = new XMLHttpRequest();
    http.onreadystatechange = () => {
      if (http.readyState == 4 && http.status == 200) {
          const result = JSON.parse(http.responseText);
          self.sendSocketNotification('new-quote', result[0]['data']['children'][0]['data']['title']);
      }
    }
    http.open('GET', URL);
    http.send
  },
});
