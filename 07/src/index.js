const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });

    const intervalId = setInterval(() => {
        const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'});

        res.write(`${time}\n`);
        console.log(`Sent: ${time}`)
    }, 2000);
    req.on('close', () => {
        clearInterval(intervalId);
    });
});

server.listen(8080, () => {
    console.log(`Server listening on port 8080`);
});
