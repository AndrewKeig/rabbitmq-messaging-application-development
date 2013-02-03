function Order(orderId) {
    this.OrderId = orderId;
    this.Status = "OrderProcessing";
}

function OrderProcessor(order) {
    this.Order = function() { return order; }

    this.Execute = function() {
        try {
            console.log("INFO, Processing order");
            this.CompleteOrder();
            this.DisplayConfirmation();
        }
        catch(ex) {
            this.LogMessage('ERROR, Unable to process payment');
        }
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

    this.PaymentGateway = function() {
        try {
            setTimeout( function() { console.log('INFO, Made payment');}, 2000);
            this.Status = "OrderComplete";
        }
        catch(ex) {
            console.log('ERROR, Unable to make payment');
        }
    };
    this.UpdateOrderProfile = function() {
        try {
            setTimeout( function() { console.log('INFO, Updated order status'); }, 4000);
        }
        catch(ex) {
            console.log('ERROR, Unable to update order status');
        }
    };
    this.UpdateInventory = function() {
        try {
            setTimeout( function() { console.log('INFO, Updated inventory'); }, 6000);
        }
        catch(ex) {
            console.log('ERROR, Unable to update inventory');
        }
    };
    this.SendEmailConfirmation = function() {
        try {
            setTimeout( function() { console.log('INFO, Sent email confirmation');}, 8000);
        }
        catch(ex) {
            console.log('ERROR, Unable to send email');
        }
    };
    this.UpdateReporting = function() {
        try {
            setTimeout( function() { console.log('INFO, Updated reporting'); }, 10000);
        }
        catch(ex) {
            console.log('ERROR, Unable to update reporting');
        }
    };

    this.DisplayConfirmation = function() {
        setTimeout( function() { console.log('INFO, Order complete...'); }, 12000);
    };
}

module.exports.Order = Order;
module.exports.OrderProcessor = OrderProcessor;