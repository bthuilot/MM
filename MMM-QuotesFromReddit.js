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

	// Override dom generator.
	getDom: function() {
		this.sendSocketNotification('request-quote', null);
		socketNotificationReceived: function(notification, payload) {
			if(notification == "new-quote"){
				var rawQuote = payload;
			}
		};
		var quote = document.createTextNode(rawQuote);
		var wrapper = document.createElement("div");
		wrapper.className = "thin xlarge bright";
		wrapper.appendChild(quote);

		return wrapper;
	},
});
