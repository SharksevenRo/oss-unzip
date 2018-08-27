require('./env')
var getRawBody = require('raw-body');
var getFormBody = require("body/form");
var body = require('body');

var unzip = require('./lib/unzip');

module.exports.handler = function (req, resp, context) {
    var params = {
        path: req.path,
        queries: req.queries,
        headers: req.headers,
        method: req.method,
        requestURI: req.url,
        clientIP: req.clientIP,
    }
    // ip白名单
    var IP_WHITELIST = process.env.IP_WHITELIST.split(',')
    if(IP_WHITELIST.indexOf(params.ip) < 0) {
        resp.send(JSON.stringify(params, null, '    '));
        return;
    }

    getFormBody(req, function (err, body) {
        for (var key in req.queries) {
            var value = req.queries[key];
            resp.setHeader(key, value);
        }
        unzip(body.bucket, body.prefix, body.url)
        .then(() => {
            resp.send(JSON.stringify(params, null, '    '));
        })
    });
}