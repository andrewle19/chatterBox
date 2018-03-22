var http = require('http');
var fs = require('fs');
// var path = require('path'); replace with tthe extract function
var extract = require('./extract');
// eslint-disable-next-line no-unused-vars
var wss = require('./websockets-server');
const mime = require('mime');


var server = http.createServer(function (req, res){


    console.log('Responding to a request');

    // replace with extract
    // res.end('<h1>Testing</h1>');
    // var url = req.url;
    // var fileName = 'index.html';
    // if(url.length > 1){
    //   fileName = url.substring(1);
    // }
    // var filePath = path.resolve(__dirname, 'app', fileName);
    //console.log(fileName);

    var handleError = function (err, res){
        res.writeHead(404);
        fs.readFile('app/error.html', function(err,data){
            res.end(data);
        });
    };

    // extract the path to file
    var filePath = extract(req.url);

    fs.readFile(filePath, function(err, data){

        if(err){
            handleError(err, res);
            return;
        } else {
            console.log(mime.getType(filePath));
            res.setHeader('Content-Type',mime.getType(filePath));
            res.end(data);
        }

    });
});

server.listen(3000);
