var express = require('express');
var router = express.Router();

/* GET Landing Page */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/** Success page */

router.get('/success', function(req, res, next){
  res.send('success!');
});

/* Send data to database */
router.post('/', function(req, res, next){
  res.send("Sent!");
});


module.exports = router;
