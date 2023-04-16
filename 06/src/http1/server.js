const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile('./index.html', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            }
        });
    } else if (req.url.match(/.jpg/)) {
        const imagePath = path.join(__dirname, 'images', req.url);
        const imageStream = fs.createReadStream(imagePath);
        res.writeHead(200, {'Content-Type': 'image/jpg'});
        imageStream.pipe(res);
    } else {
        res.writeHead(404);
        res.end('File not found');
    }
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});
