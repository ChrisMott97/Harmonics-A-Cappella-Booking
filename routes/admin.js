var express = require('express');
var router = express.Router();

/* Admin splashpage */
router.get('/', function(req, res, next) {
  res.send('logged in!');
});

/* Login page for admin */
router.get('/login', function(req, res, next){
  res.send('login page');
});

module.exports = router;
