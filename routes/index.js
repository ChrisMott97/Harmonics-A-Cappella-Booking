var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var fresher = require('./models/fresher');

/* GET Landing Page */
router.get('/', function(req, res, next) {
  res.render('index');
});

/** Success page */

router.get('/thankyou/:name-:day-:time', function(req, res, next){
  res.render("thankyou", {name: req.params.name, day: req.params.day, time: req.params.time});
});

router.post('/times', function(req, res, next){
  // fresher.count({time: req.body.time, day: req.body.day}, function(err, count){
  //   if(err) return handleError(err);
  //   res.send({"count": count});
  // })
  fresher.find({day: req.body.day}, function(err, freshers){
    if(err) return handleError(err);
    res.send({"freshers": freshers})
  })
})

/* Send data to database */
router.post('/', function(req, res, next){
  fresher.create({ firstName: req.body.firstName , lastName: req.body.lastName, email: req.body.email, day: req.body.day, time: req.body.time}, function (err, new_fresher) {
    // if (err) return console.log(err);
    res.redirect('/thankyou/'+new_fresher.firstName+'-'+new_fresher.day+'-'+new_fresher.time);
  });
});

router.post('/empty', function(req, res, next){
  console.log(req.body.day)
  console.log(req.body.time)
  fresher.create({ firstName: "Empty" , lastName: "Empty", email: req.body.day+req.body.time, day: req.body.day, time: req.body.time}, function (err, new_fresher) {
    res.send({success: true})
    // if (err) return handleError(err);
  });
});


module.exports = router;
