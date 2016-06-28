var express = require('express');
var router = express.Router();
var serveIndex = require('serve-index');
var fs = require('fs')
var path = require('path');

var config = require('../configs');

// GET /files
router.get('/*', serveIndex(config.contentPath, {
  view: 'details'
}));

// GET /files/:file
// If a file is discovered with serve-index it will proceed to the next
// middleware, where it will be fetched and displayed
router.get('/:file(*)', function (req, res, next) {
  var filepath = path.join(config.contentPath, req.params.file);
  fs.readFile(filepath, 'utf8', function (err,data) {
    if (err) { return console.log(err); }
    res.render('file', {
      title: req.params.file,
      path: req.params.file,
      content: data
    });
  });
});

// GET /files/:id/edit
// router.get('/:id/edit', function (req, res, next) {
//     res.send('edit');
// });

// DELETE /files/:id
// router.delete('/:id', function (req, res, next) {
//     res.send('destroy');
// });

// GET /files/new
// router.get('/new', function (req, res, next) {
//     res.send('new');
// });

// POST /files
// router.post('/', function (req, res, next) {
//     res.send('create');
// });

// PATCH/PUT /files/:id
// router.put('/:id', function (req, res, next) {
//     res.send('update');
// });

module.exports = router;
