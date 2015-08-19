/*eslint-env node*/

require('newrelic');

var express = require('express');

var cfenv = require('cfenv');

var app = express();

var emoji = require('node-emoji');


var REQUEST_HEADER = 'x-request-start'
var QUEUE_HEADER = 'x-queue-start'

var pizza = emoji.get('pizza')

// serve pizza
app.get('/', function (req, res) {

    var startTime = req.headers[REQUEST_HEADER]
    var now = Date.now()

    res.send(pizza + ' X-Request-Start: ' + startTime + ' now: ' + now)
});

var appEnv = cfenv.getAppEnv();

app.listen(appEnv.port, function() {
  console.log("server starting on " + appEnv.url);
});
