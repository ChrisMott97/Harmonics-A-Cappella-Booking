var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var fresher = require('./models/fresher');

/* Admin splashpage */
router.get('/', function (req, res, next) {
  var all = {"Monday": {}, "Tuesday": {}, "Wednesday": {}};
  var days = ["Monday", "Tuesday", "Wednesday"];
  var times = [1100, 1130, 1200, 1230, 1300, 1330];
  fresher.find({},function(err, results){
    if(err) return handleError(err);
    for (let i = 0; i < days.length; i++) {
      const day = days[i];
      for (let j = 0; j < times.length; j++) {
        const time = times[j];
        for (let k = 0; k < results.length; k++) {
          const result = results[k];
          
          if(result.day == day && result.time == time){
            all[day][time] = result;
            break;
          }
        }
      }
    }
    res.render("results", {"all": all});
  })
  
});

router.post('/times', function(req, res, next){
  fresher.count({time: req.body.time, day: req.body.day}, function(err, count){
    if(err) return handleError(err);
    res.send({"count": count});
  })
})


/* Login page for admin */
router.get('/login', function (req, res, next) {
  res.send('login page');
});

module.exports = router;