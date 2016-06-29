var express = require('express');
var router = express.Router();
var serveIndex = require('serve-index');
var fs = require('fs')
var path = require('path');
var yaml = require('js-yaml');

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
    var parsed = parseContent(data);
    parsed.path = req.params.file;
    res.render('file', { data: parsed });
  });
});

// PATCH/PUT /files/:id
router.put('/:file(*)', function (req, res, next) {
  var yamlObj = {};
  Object.keys(req.body).forEach(function (element) {
      yamlObj[element] = req.body[element];
  });
  var yamlStr = yaml.safeDump(yamlObj);
  var merged = '---\r\n' + yamlStr + '\r\n---\r\n' + req.body.content;
  var filepath = path.join(config.contentPath, req.params.file);
  fs.writeFile(filepath, merged, function (err) {
    if (err) { return console.log(err); }
    req.flash('success', 'File saved!');
    var parsed = parseMeta(req.body);
    parsed.path = req.params.file;
    res.render('file', { data: parsed });
  });
});

// POST /files
router.post('/', function (req, res, next) {
    res.send('create');
});

function parseContent (content) {
  var chunks = content.split('---');

  // First line will always be a delimter, so just throw it away
  chunks.shift();

  // Second chunk is the YAML
  var yamlStr = chunks.shift();

  // The rest is Markdown, maybe there's a better way than this.
  var markdown = chunks.join('---');

  var meta = {};
  try {
    meta = yaml.safeLoad(yamlStr);
  } catch (e) {
    parsed.error = e;
    return parsed;
  }

  var parsed = parseMeta(meta);
  parsed.content = markdown;
  return parsed;
}

function parseMeta(meta) {
    // These are used in the template specifically, so define them here
    // Any additional properties will just get tacked on to the end.
    var parsed = {
      error: null,
      content: '',
      title: '',
      date: '1/1/1970',
      url: '',
      excerpt: false,
      tags: '',
      categories: '',
      meta: []
    };

    var mainItems = Object.keys(parsed);
    Object.keys(meta).forEach(function (element) {
      parsed[element] = meta[element];
      if (mainItems.indexOf(element) < 0) {
        parsed.meta.push(element);
      }
    });

    return parsed;
}

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

module.exports = router;
