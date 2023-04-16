const http2 = require('http2');
const fs = require('fs');

const server = http2.createSecureServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.crt')
});

server.on('error', (err) => console.error(err));

server.on('stream', (stream, headers) => {

    const path = headers[':path'];
    if (path === '/') {
        const fileStream = fs.createReadStream('index.html');
        fileStream.pipe(stream);
    } else {
        const fileStream = fs.createReadStream(path.slice(1));
        fileStream.pipe(stream);
    }
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
