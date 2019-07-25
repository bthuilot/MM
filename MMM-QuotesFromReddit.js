Module.register("MMM-QuotesFromReddit",{

  let quote;
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
		if(notification === "new-quote"){
      this.quote = payload;
    }
	},

	// Override dom generator.
	getDom: function() {
		const quoteNode = document.createTextNode(this.quote || 'Loading...');
		var wrapper = document.createElement("div");
	  wrapper.className = `thin large ${this.quote ? 'bright' : 'dim'}`;
		wrapper.appendChild(quoteNode);
		this.sendSocketNotification('request-quote', null);
		return wrapper;
	},
});
