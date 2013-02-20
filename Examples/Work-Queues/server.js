var shop = require('./shop');
var processor = new shop.OrderProcessor(new shop.Order(1));
processor.Place();