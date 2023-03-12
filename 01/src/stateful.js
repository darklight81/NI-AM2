let net = require('net');

let server = net.createServer( socket => {
    socket.setEncoding('utf8');
    const worker = new Worker();

    socket.on('data', data => {
        data = data.trim();

        switch (data) {
            case 'open':
                worker.openOrder(socket);
                break;
            case 'add':
                worker.addOrder(socket);
                break;
            case 'process':
                worker.processOrder(socket);
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

class Worker {
    constructor() {
        this.state = State.START;
        this.items = 0;
    }
    openOrder(socket){
        if (this.state === State.START){
            this.state = State.OPENED;
            socket.write('Opened\n');
            return;
        }
        socket.write('Order already opened / processed\n');
    }
    addOrder(socket){
        if (this.state === State.OPENED){
            this.items++;
            socket.write('Added\n');
            return;
        }
        socket.write('Order not opened / already processed\n');
    }
    processOrder(socket){
        if (this.state === State.OPENED){
            this.state = State.PROCESSED;
            socket.write('Order processed with ' + this.items + ' items\n');
            return;
        }
        socket.write('Order not opened / already processed\n');
    }
}
