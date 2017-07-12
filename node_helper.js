var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var NodeHelper = require("node_helper");
module.exports = NodeHelper.create({

  start: function(){
    console.log("Starting node helper for: " + this.name);
  },

  socketNotificationReceived: function(notification, payload) {
    var xhr = new XMLHttpRequest();
    var self = this;
		xhr.open("GET", url, true);
		xhr.onreadystatechange = function() {
			if (this.readyState === 4) {
				if (this.status === 200) {
					this.sendSocketNotification('new-quote',  JSON.parse(this.response)[0]['data']['children'][0]['data']['title']);;
				} else {
					console.log(self.name + "Could not load Quotes but doesnt matter cause i cant trouble shoot.");
				}
			}
		};
		xhr.send();
    //this.sendSocketNotification('new-quote', a[0]['data']['children'][0]['data']['title']);
  },
});
