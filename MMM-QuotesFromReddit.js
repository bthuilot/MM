var rawQuote = "Loading..."
Module.register("MMM-QuotesFromReddit",{

	// Default module config.
	defaults: {
		updateInterval: 30000,
		fadeSpeed: 4000,
	},


	start: function() {
		Log.info("Starting module: " + this.name);
		var self = this;
		this.sendSocketNotification('request-quote', null);
		setInterval(function() {
			self.updateDom(self.config.fadeSpeed);
		}, this.config.updateInterval);
	},

	socketNotificationReceived: function(notification, payload) {
		if(notification == "new-quote"){
			if(rawQuote == "Loading..."){
				rawQuote = payload;
				this.updateDom();
			}else{
				rawQuote = payload;
			}
		}
	},

	// Override dom generator.
	getDom: function() {
		var quote = document.createTextNode(rawQuote);
		var wrapper = document.createElement("div");
		(rawQuote == "Loading...") ? wrapper.className = "thin large dim" : wrapper.className = "thin xlarge bright";
		wrapper.className = "thin xlarge bright";
		wrapper.appendChild(quote);
		this.sendSocketNotification('request-quote', null);
		return wrapper;
	},
});
