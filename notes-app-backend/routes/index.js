const { json } = require('body-parser');
const express = require('express');
const router = express.Router();

const noteRouter = require('./noteRoute');
const tagRouter = require('./tagRoute');

router.get('/api/v1/notes', function(req, res, next) {
  noteRouter;
});

router.get('/api/v1/tags', function(req, res, next) {
  tagRouter;
});

router.get('/', function(req, res, next) {
  noteRouter;
});

/* GET home page. */
module.exports = router;
