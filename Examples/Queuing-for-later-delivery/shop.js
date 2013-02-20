function Order(orderId) {
    this.OrderId = orderId;
    this.Status = "OrderProcessing";

    this.Place = function() {
        console.log("INFO, Placed order");
    };
}

function OrderProcessor(order) {
    this.Order = function() { return order; }

    this.Process = function() {
        this.PaymentGateway();
        this.UpdateOrderProfile();

        if (this.Status === 'OrderComplete') {
            this.UpdateInventory();
            this.SendEmailConfirmation();
            this.UpdateReporting();
        }
    };

    this.PaymentGateway = function() {
        setTimeout( function() { console.log('INFO, Made payment');}, 2000);
        this.Status = "OrderComplete";
    };
    this.UpdateOrderProfile = function() {
        setTimeout( function() { console.log('INFO, Updated order status'); }, 4000);
    };
    this.UpdateInventory = function() {
        setTimeout( function() { console.log('INFO, Updated inventory'); }, 6000);
    };
    this.SendEmailConfirmation = function() {
        setTimeout( function() { console.log('INFO, Sent email confirmation');}, 8000);
    };
    this.UpdateReporting = function() {
        setTimeout( function() { console.log('INFO, Updated reporting'); }, 10000);
    };
}

module.exports.Order = Order;
module.exports.OrderProcessor = OrderProcessor;