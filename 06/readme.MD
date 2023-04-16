# HW6
Sorry for a late submission.

To run the http/2 server we need to generate a certifacte, to do this run the following commands:

`openssl req -newkey rsa:2048 -nodes -keyout server.key -out server.csr`

`openssl x509 -req -sha256 -days 365 -in server.csr -signkey server.key -out server.crt`

Then run `index.js` file for the http/2 server and `http1/server.js` for the http/1 server.

The differences in loading the images can be found in screenshots in `results/` folder.
