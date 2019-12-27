var express = require('express');
var router = express.Router();

const message = {
  title: 'TODO REST server',
  p1: "This is the index page at /",
  p2: "The TODO REST server is at /api/todos"
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', message);
});

module.exports = router;
