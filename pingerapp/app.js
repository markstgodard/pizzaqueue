'use strict'
/*eslint-env node*/
var express = require('express'),
    cfenv   = require('cfenv'),
    util    = require('util'),
    _       = require('lodash'),
    request = require('superagent');

var REQUEST_HEADER = 'x-request-start',
    target         = 'https://AH-Q-Time.mybluemix.net',
    app            = express(),
    appEnv         = cfenv.getAppEnv(),
    results        = [];

var pinger;
function start() {
    console.log('Starting.')
    pinger = setInterval(function(){
        var t1 = Date.now();
        request.get(target).end(function(err, res){
            var delta = Date.now()-t1,
                result = {
                    time: Date.now(),
                    iso: (new Date()).toISOString(),
                    delta: delta
                };
            console.log('Response time: ' + delta);
            if (err) {
                result.error = err;
                console.error('Error: ' + err);
            } else {
                console.log('-----------')
                console.log('Result Body')
                console.dir(res.body);
                result.body = res.body;
            }
            console.log('=====================');
            console.dir(result);
            console.log('=====================');
            results.push(result);
            if (results.length > 25) {
                results.shift();
            }
        });
    }, 5000);
}
app.get('/', function (req, res) {
    console.log('Results: ')
    console.dir(results);
    res.status(200).json(results);
});

app.get('/start', function (req, res) {
    console.log('Starting.')
    clearInterval(pinger);
    start();
    res.status(200).send('ok');
});

app.get('/stop', function (req, res) {
    console.log('Starting')
    clearInterval(pinger);
    res.status(200).send('ok');
});

app.listen(appEnv.port, function () {
  console.log("server starting on " + appEnv.url);
});
