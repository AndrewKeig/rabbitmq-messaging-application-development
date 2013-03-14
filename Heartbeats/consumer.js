var PubSub = require("./pubsub");
var pubsub = new PubSub();

pubsub.Subscribe('shop-queue', function() {
	console.log('subscribing');
});