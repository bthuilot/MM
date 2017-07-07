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
		var fetch = require('node-fetch');
		fetch('https://www.reddit.com/r/quotes/random/.json')
		    .then(function(res) {
		        return res.json();
		    }).then(function(json) {
		        var rawQuote = json[0]['data']['children'][0]['data']['title'];
		    });
		var quote = document.createTextNode(rawQuote);
		var wrapper = document.createElement("div");
		wrapper.className = "thin xlarge bright";
		wrapper.appendChild(quote);

		return wrapper;
	},
});
