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
		this.sendSocketNotification('request-quote', null);
		setInterval(function() {
			self.getNewQuote();
    }, this.config.updateInterval);
	},

  getNewQuote: function () {
    const http = new XMLHttpRequest();
    var self = this;
    http.onreadystatechange = () => {
      if (http.readyState == 4 && http.status == 200) {
        const result = JSON.parse(http.responseText);
        quote = result[0]['data']['children'][0]['data']['title']
        self.updateDom(self.config.fadeSpeed);
      }
    }
    http.open('GET', URL);
    http.send
  },

	// Override dom generator.
	getDom: function() {
		const quoteNode = document.createTextNode(quote || 'Loading...');
		var wrapper = document.createElement("div");
	  wrapper.className = `thin large ${quote ? 'bright' : 'dim'}`;
		wrapper.appendChild(quoteNode);
		return wrapper;
	},
});
