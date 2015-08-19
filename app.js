/*eslint-env node*/

require('newrelic');

var express = require('express');

var cfenv = require('cfenv');

var app = express();

var emoji = require('node-emoji');


var REQUEST_HEADER = "x-request-start"
var QUEUE_HEADER = "x-queue-start"

// serve pizza and timings
app.get('/', function (req, res) {

    var queueTime
    var qtime = req.headers[REQUEST_HEADER] || req.headers[QUEUE_HEADER]
    if (qtime) {
      var split = qtime.split('=')
      if (split.length > 1) {
        qtime = split[1]
      }

      var start = parseFloat(qtime)

      if (isNaN(start)) {
        logger.warn('Queue time header parsed as NaN (' + qtime + ')')
      } else {
        // nano seconds
        if (start > 1e18) start = start / 1e6
        // micro seconds
        else if (start > 1e15) start = start / 1e3
        // seconds
        else if (start < 1e12) start = start * 1e3

        queueTime = Date.now() - start
      }
    }

    res.send(emoji.get('pizza') + ' queue time: ' + queueTime);
});

var appEnv = cfenv.getAppEnv();

app.listen(appEnv.port, function() {
  console.log("server starting on " + appEnv.url);
});
