Module.register("MMM-QuotesFromReddit",{

	// Default module config.
	defaults: {
		position: 'lower_third',
		updateInterval: 30000,
		fadeSpeed: 4000
	},

	start: function() {
		Log.info("Starting module: " + this.name);
		var self = this;
		setInterval(function() {
			self.updateDom(self.config.fadeSpeed);
		}, this.config.updateInterval);
	}

	getJSON: function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status == 200) {
        callback(null, xhr.response);
      } else {
        callback(status);
      }
    };
    xhr.send();
};
	// Override dom generator.
	getDom: function() {
		request('https://www.reddit.com/r/quotes/random/.json', function (error, response, body) {
  	if (!error && response.statusCode == 200) {
     	var rawQuote = JSON.parse(body);
  		}
		})
		var quote = document.createTextNode(rawQuote);
		var wrapper = document.createElement("div");
		wrapper.className = "thin xlarge bright";
		wrapper.appendChild(quote);

		return wrapper;
	}
});
