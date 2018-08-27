require('./env')
var getRawBody = require('raw-body');
var getFormBody = require("body/form");
var body = require('body');

var unzip = require('./lib/unzip');

module.exports.handler = function (req, resp, context) {
    console.log("hello world");

    var params = {
        path: req.path,
        queries: req.queries,
        headers: req.headers,
        method: req.method,
        requestURI: req.url,
        clientIP: req.clientIP,
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

    /*
    getFormBody(req, function(err, formBody) {
        for (var key in req.queries) {
          var value = req.queries[key];
          resp.setHeader(key, value);
        }
        params.body = formBody;
        console.log(formBody);
        resp.send(JSON.stringify(params));
    }); 
    */
}