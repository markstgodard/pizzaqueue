'use strict'
/*eslint-env node*/
var express = require('express'),
    cfenv   = require('cfenv'),
    util    = require('util'),
    _       = require('lodash'),
    pizza   = require('node-emoji').get('pizza');

var REQUEST_HEADER = 'x-request-start',
    app            = express(),
    appEnv         = cfenv.getAppEnv();

// serve pizza
app.get('/', function (req, res) {
    var startTime    = parseInt(req.get(REQUEST_HEADER)),
        now          = Date.now(),
        mem          = process.memoryUsage();
    if (!startTime) {
        next(new Error('No X-Request-Start header found.'));
        return;
    }
    var stats = {
        startTime: startTime,
        now: now,
        diff: now-startTime,
        mem: mem
    };
    res.status(200).json(stats);
});
app.use(function(err, req, res, next) {
    res.status(500).json({
        error: err.message
    })
});

app.listen(appEnv.port, function () {
  console.log("server starting on " + appEnv.url);
});
