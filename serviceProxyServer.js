const express = require('express');
const httpProxy = require('http-proxy');
const bodyParser = require('body-parser');

module.exports = function (proxyPort) {
    if(typeof proxyPort !== 'number') {
        proxyPort = 51234;
    }
    // const apiForwardingUrl = 'https://vatsla-test.apigee.net/getaccounttransactions?iban=NL83ABNA0597536138';

    const proxyOptions = {
        changeOrigin: true
    };

    httpProxy.prototype.onError = function (err) {
        console.log(err);
    };

    let apiProxy = httpProxy.createProxyServer(proxyOptions);

    // Node express server setup.
    let server = express();
    server.set('port', proxyPort);
    server.use(express.static(__dirname + '/dist'));

    /*server.all("/getLeaveList/!*", function(req, res) {
        apiProxy.web(req, res, {target: apiForwardingUrl});
    });*/
    server.all("/*", function(req, res) {
        apiProxy.web(req, res, {target: 'http://localhost:8080'});
    });

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({
        extended: true
    }));

    return {
        server: server
    }
};