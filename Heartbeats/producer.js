var pubSub = require("./pubsub");
//var pubsub = new PubSub();

setInterval(function(){
    pubSub.Publish('shop-queue', 'publishing');
}, 100);