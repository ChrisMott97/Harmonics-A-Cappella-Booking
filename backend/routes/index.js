var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// Define schema
var Schema = mongoose.Schema;

var AuditionModel = new Schema({
  username: String,
  name: String,
  day: String,
  time: String
});

var SlotModel = new Schema({
  day: String,
  time: String,
});

//logic should check against both models

// Compile model from schema
var Audition = mongoose.model('Audition', AuditionModel );
var Slot = mongoose.model('Slot', SlotModel );

/* GET home page. */
router.get('/', function(req, res, next) {
  Audition.findOne({}, (err, audition)=>{
    if (err) return handleError(err);
    res.json(audition)
  })
});

router.get('/create', function(req, res, next) {
  Audition.create({
    username: "cm740",
    name: "Chris M",
    day: "Tuesday",
    time: "12:00"
  })
});

module.exports = router;
