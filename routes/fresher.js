var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var fresher = require('./models/fresher');

/* Login page for admin (/fresher/)*/
router.get('/:email', function (req, res, next) {
    fresher.findOne({"email": req.params.email}, function(err, result){
        if(err) return handleError(err);
        if(result){
            res.send(result);
        }
    })
});

router.post('/:email', function(req, res, next){
    fresher.remove({"email": req.params.email}, function(err, result){
        if(err) return handleError(err);
        if(result){
            res.send(true);
        }
    })
})

module.exports = router;