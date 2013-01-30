function Order(orderId) {
    this.OrderId = orderId;
    this.Status = "OrderProcessing";
}

function OrderProcessor(order) {
    this.Order = function() { return order; }

    this.Execute = function() {
        console.log("Processing order...");
        this.CompleteOrder();
        this.DisplayConfirmation();
    };

    this.CompleteOrder = function() {
        this.PaymentGateway();
        this.UpdateOrderProfile();

        if (this.Status === 'OrderComplete') {
            this.UpdateInventory();
            this.SendEmailConfirmation();
            this.UpdateReporting();
        }
    };

    this.DisplayConfirmation = function() {
        setTimeout( function() { console.log("Order complete..."); }, 12000)
    };
    this.PaymentGateway = function() {
        setTimeout( function() { console.log("Making payment, calling payment gateway..."); }, 2000);
        this.Status = "OrderComplete";
    };
    this.UpdateOrderProfile = function() {
        setTimeout( function() { console.log("Updating order status and order history..."); }, 4000)
    };
    this.UpdateInventory = function() {
        setTimeout( function() { console.log("Updating inventory..."); }, 6000)
    };
    this.SendEmailConfirmation = function() {
        setTimeout( function() { console.log("Sending email confirmation..."); }, 8000)
    };
    this.UpdateReporting = function() {
        setTimeout( function() { console.log("Updating reporting..."); }, 10000)
    };
}

module.exports.Order = Order;
module.exports.OrderProcessor = OrderProcessor;