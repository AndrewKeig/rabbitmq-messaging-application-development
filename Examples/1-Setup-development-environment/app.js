var order = new Order(1);
console.log(order);

var processor = new OrderProcessor(order);
processor.Place();