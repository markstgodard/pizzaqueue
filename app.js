/*eslint-env node*/

require('newrelic');

var express = require('express');
var cfenv = require('cfenv');
var app = express();
var pizza = require('node-emoji').get('pizza')

var REQUEST_HEADER = 'x-request-start'

// serve pizza
app.get('/', function (req, res) {
    var startTime = req.headers[REQUEST_HEADER]
    var now = Date.now()

    res.send(pizza + ' X-Request-Start: ' + startTime + ' - now: ' + now + ' = ' + (now - startTime) +'\n')
});

var appEnv = cfenv.getAppEnv();

app.listen(appEnv.port, function() {
  console.log("server starting on " + appEnv.url);
});
