Module.register("MMM-QuotesFromReddit",{

	// Default module config.
	defaults: {
		updateInterval: 30000,
		fadeSpeed: 4000
	},

	start: function() {
		Log.info("Starting module: " + this.name);
		var self = this;
		setInterval(function() {
			self.updateDom(self.config.fadeSpeed);
		}, this.config.updateInterval);
	},

	getQuote: function(){
		var request = new XMLHttpRequest();
		request.open('GET', 'https://www.reddit.com/r/quotes/random/.json', true);

		request.onreadystatechange = function() {
		  if (this.readyState === 4) {
		    if (this.status >= 200 && this.status < 400) {
		      // Success!
		      return JSON.parse(this.responseText)[0]['data']['children'][0]['data']['title'];
		    } else {
		      // Error :(
		    }
		  }
		};

		request.send();
		request = null;
	},

	// Override dom generator.
	getDom: function() {
		/*this.sendSocketNotification('request-quote', null);
		socketNotificationReceived: function(notification, payload) {
			if(notification == "new-quote"){
				var rawQuote = payload;
			}
		};*/
		var rawQuote = this.getQuote();
		var quote = document.createTextNode(rawQuote);
		var wrapper = document.createElement("div");
		wrapper.className = "thin xlarge bright";
		wrapper.appendChild(quote);

		return wrapper;
	},
});
