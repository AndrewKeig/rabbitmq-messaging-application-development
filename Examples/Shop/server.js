var order = require('./order');
var orderService = require('./orderService');
var service = new orderService(new order(1));
service.Checkout();