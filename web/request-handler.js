var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var fs = require('fs');
//var validUrl = require('valid-url');
//var re = new RegExp(/\w\.\w+/, 'g');
var re = /\.+/g;
//var re = /^(https?|ftp)://[^/$.?#].[^\s]*$/iS
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  var validUrl = re.test(req.url);
  if ( req.method === 'GET' ) {
    if ( req.url === '/' ) {
      fs.readFile(archive.paths.siteAssets + '/index.html', 'utf8', function(err, data) {
        if (err) {
          return console.log(err);
        }
        res.writeHead(200, httpHelpers.headers);
        res.end(data);
      });
    } else if ( validUrl ) {
      console.log('inside re test');
      fs.readFile(archive.paths.archivedSites + req.url, 'utf8', function(err, data) {
        if (err) {
          return console.log(err);
        }
        res.writeHead(200, httpHelpers.headers);
        res.end(data);
      });
    } else {
      res.writeHead(404);
      res.end();
    }
  } else if ( req.method === 'POST') {
    console.log('1');
    archive.addUrlToList(req.url, function() {
      console.log('4');
      res.writeHead(302, httpHelpers.headers);
      res.end();
    });
  }

  // res.end(archive.paths.list);
};
