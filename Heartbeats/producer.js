var PubSub = require("./pubsub");
var pubsub = new PubSub();

setInterval(function(){
    pubsub.Publish('shop-queue', 'publishing');
}, 100);