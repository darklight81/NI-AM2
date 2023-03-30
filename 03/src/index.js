const http = require('http');
const PORT = 8080;
const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url.startsWith('/')) {
        const name = req.url.slice(1);
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(`Hello ${name}`);
    }
});

server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
