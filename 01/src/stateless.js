let net = require('net');

let server = net.createServer( socket => {
    socket.setEncoding('utf8');
    const worker = new OrderWorker();

    socket.on('data', data => {
        data = data.trim();

        let [command, orderId] = data.split(' ');


        orderId = Number(orderId);
        if (isNaN(orderId)){
            socket.write('Order id must be a number\n');
            return;
        }

        switch (command) {
            case 'open':
                worker.openOrder(socket, orderId);
                break;
            case 'add':
                worker.addOrder(socket, orderId);
                break;
            case 'process':
                worker.processOrder(socket, orderId);
                break;
            default:
                socket.write('Unknown command\n');
        }
    });
});

server.listen(3000, () => {
    console.log('server is running');
});

const State = {
    START: 'start',
    OPENED: 'opened',
    PROCESSED: 'processed',
}

class Order {
    constructor(id){
        this.id = id;
        this.items = 0;
        this.state = State.START;
    }
}

class OrderWorker {
    constructor() {
        this.orders = [];
    }
    openOrder(socket, id){
        if (this.orders.find(order => order.id === id)){
            socket.write('Order already opened / processed\n');
            return;
        }
        this.orders.push(new Order(id));
        socket.write('Opened order ' + id + '\n');
    }
    addOrder(socket, id){
        let order = this.orders.find(order => order.id === id);
        if (!order || order.state === State.PROCESSED){
            socket.write('Order not opened / already processed\n');
            return;
        }
        order.items++;
        socket.write('Added to order ' + id + '\n');
    }
    processOrder(socket, id){
        let order = this.orders.find(order => order.id === id);
        if (!order || order.state === State.PROCESSED){
            socket.write('Order not opened / already processed\n');
            return;
        }
        order.state = State.PROCESSED;
        socket.write('Order ' + id + ' processed with ' + order.items + ' item(s)\n');
    }
}
