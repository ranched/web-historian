var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  
  if ( req.method === 'GET' ) {
    res.writeHead(200, archive.headers);
    res.setHeader('Content-Type', 'text/html');  
    readThenSend = () => {
      res.end();
    };
    fs.readFile('./public/index.html', 'utf8', function(err, data, readThenSend) {
      if (err) {
        return console.log(err);
      }
      res.write(data);
      readThenSend();
    });
    
  }

  // res.end(archive.paths.list);
};
