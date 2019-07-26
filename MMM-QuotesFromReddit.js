var quote;
Module.register("MMM-QuotesFromReddit",{

	// Default module config.
	defaults: {
		updateInterval: 30000,
		fadeSpeed: 4000,
	},


	start: function() {
		Log.info("Starting module: " + this.name);
		var self = this;
    self.getNewQuote();
		setInterval(function() {
			self.getNewQuote();
    }, this.config.updateInterval);
	},

  getNewQuote: function () {
    const URL = 'https://www.reddit.com/r/quotes/random/.json';
    const http = new XMLHttpRequest();
    var self = this;
    http.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const result = JSON.parse(this.responseText);
        quote = result[0]['data']['children'][0]['data']['title']
        self.updateDom(self.config.fadeSpeed);
      }
    }
    http.open('GET', URL);
    http.send();
  },

	// Override dom generator.
	getDom: function() {
		const quoteNode = document.createTextNode(quote || 'Loading...');
		var wrapper = document.createElement("div");
	  wrapper.className = `thin medium ${quote ? 'bright' : 'dim'}`;
		wrapper.appendChild(quoteNode);
		return wrapper;
	},
});
