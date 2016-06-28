var express = require('express');
var router = express.Router();

// GET /posts
// router.get('/', function (req, res, next) {
//   res.render('posts/index');
// });

// GET /posts/:id
router.get('/:id', function (req, res, next) {
    res.render('show', {});
});

// GET /posts/:id/edit
router.get('/:id/edit', function (req, res, next) {
    res.send('edit');
});

// DELETE /posts/:id
router.delete('/:id', function (req, res, next) {
    res.send('destroy');
});

// GET /posts/new
router.get('/new', function (req, res, next) {
    res.send('new');
});

// POST /posts
router.post('/', function (req, res, next) {
    res.send('create');
});

// PATCH/PUT /posts/:id
router.put('/:id', function (req, res, next) {
    res.send('update');
});

module.exports = router;
