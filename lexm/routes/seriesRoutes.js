'use strict';

var fs = require('fs');
// var http = require('http');
var Router = require('../lib/router');
var seriesRouter = new Router();
var nextId = 0;

var writeLog = function(id, chunk) {
  var padId = ('000000'+ id).substr(-6, 6);
  var newFilename = __dirname + '/../data/' + padId + 'series.json';
  fs.writeFile(newFilename, chunk.toString(), () => {
    console.log(newFilename + ' finished writing');
  });
};


seriesRouter.post('/series/', (req, res) => {
  console.log('/series POST hit');
  req.on('data', (data) => {
    if(nextId == 0) {
      fs.readdir('./data', (err, files) => {
        if(err) {
          console.error(err);
        } else {
          nextId = files.length + 1;
          console.log('new ID' + nextId);
        }
        writeLog(nextId, data);
        nextId++;
        res.end();
      });
    } else {
      console.log('what is up: ' + nextId);
      writeLog(nextId, data);
      nextId++;
      res.end();
    }
  });
});



seriesRouter.get('/series/', (req, res) => {
  console.log('/series GET hit');
  fs.readdir(__dirname + '/../data', (err, files) => {
    if(err) {
      console.log(err);
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      files.forEach( (cur) => {
        res.write(cur + '\n');
      });
      res.end();
    }
  });
  console.log(req.url);
});

exports.seriesRouter = seriesRouter;
// http.createServer(seriesRouter.route()).listen(3000, () => {
//   console.log('server up on 3000');
// });
