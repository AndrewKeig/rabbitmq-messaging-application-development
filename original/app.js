var Shop = require('./shop');

var order = new Shop.Order(1);
console.log(order);

var processor = new Shop.OrderProcessor(order);
processor.Execute();
