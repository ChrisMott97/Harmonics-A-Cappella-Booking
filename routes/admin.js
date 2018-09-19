var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var fresher = require('./models/fresher');
var user = require('./models/user');
var passport = require('passport');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/admin/login')
}

/* Admin splashpage */
router.get('/', ensureAuthenticated, function (req, res, next) {
  var all = {"Sunday": {}, "Wednesday": {}};
  var days = ["Sunday", "Wednesday"];
  var times = [];
  for (let i = 900; i < 2100; i=i+100) {
    for(let j = i; i<i+60; i=i+15){
      times.push(j);
    }
  }
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
    // console.log(all);
    res.render("results", {"all": all, "times": times});
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
  res.render("login");
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/admin', failureRedirect: '/admin/login'
}))

router.get('/logout', function(req, res, next){
  req.logout();
  res.redirect('/');
})

router.get('/init', function (req, res, next){
  user.count({}, function(err, count){
    if(err) return handleError(err);
    if(!count){
      user.create({username: "admin", password: "acapellaharmonics97"}, function(err, new_user){
        if(err) return handleError(err);
        res.send(new_user);
      })
    }else{
      res.redirect('/admin/login')
    }
  })
})

module.exports = router;