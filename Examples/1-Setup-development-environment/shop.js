function Order(orderId) {
    this.OrderId = orderId;
    this.Status = "OrderProcessing";
}

function OrderProcessor(order) {
    this.Order = function() { return order; }
    this.Place = function() {
        console.log("INFO, Placed order");
        this.Process();
        this.DisplayConfirmation();
    };
    this.Process = function() {
        this.PaymentGateway();
        this.UpdateOrder();

        if (this.Status === 'OrderComplete') {
            this.UpdateInventory();
            this.SendEmail();
            this.UpdateReporting();
        }
    };
    this.PaymentGateway = function() {
        setTimeout( function() { console.log('INFO, Made payment');}, 2000);
        this.Status = "OrderComplete";
    };
    this.UpdateOrder = function() {
        setTimeout( function() { console.log('INFO, Updated order status'); }, 4000);
    };
    this.UpdateInventory = function() {
        setTimeout( function() { console.log('INFO, Updated inventory'); }, 6000);
    };
    this.SendEmail = function() {
        setTimeout( function() { console.log('INFO, Sent email');}, 8000);
    };
    this.UpdateReporting = function() {
        setTimeout( function() { console.log('INFO, Updated reporting'); }, 10000);
    };
    this.DisplayConfirmation = function() {
        setTimeout( function() { console.log('INFO, Order complete...'); }, 12000);
    };
}

var processor = new OrderProcessor(new Order(1));
processor.Place();