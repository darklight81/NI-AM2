const express = require('express');
const Redis = require('ioredis');

const client = new Redis(6379, 'my-redis-server');

const app = express();

// Define the API endpoint
app.get('/person/:name/address', (req, res) => {
    const { name } = req.params;
    console.log(`Looking up address for ${name}...`);
    client.get(name, (err, address) => {
        if (address){
            res.send(address + '\n');
            } else {
            res.status(404).send(`No address found for person ${name}`);
        }
    });
});

// Start the server
app.listen(8080, () => {
    console.log('Server listening on port 8080');
});
