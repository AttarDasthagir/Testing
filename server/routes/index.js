var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("prince..1");
  res.render('index', { title: 'prince' });
});

module.exports = router;
