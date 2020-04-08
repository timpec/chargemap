const httpPort = 3000;
const httpsPort =  8000;
const http = require('http');
const https = require('https');
const fs = require('fs');

const sslkey = fs.readFileSync('../../ssl-key.pem');
const sslcert = fs.readFileSync('../../ssl-cert.pem')

const options = {
      key: sslkey,
      cert: sslcert
};

module.exports = (app, httpsPort, httpPort) => {
    https.createServer(options, app).listen(httpsPort);
    //app.listen(httpPort)
    http.createServer((req, res) => {
        res.writeHead(301, { 'Location': 'https://localhost:' + httpsPort + req.url });
        res.end();
    }).listen(httpPort);
};
   