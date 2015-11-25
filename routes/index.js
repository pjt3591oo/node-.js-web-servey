var express = require('express');
var router = express.Router();
var po = require('../models/Post');

/* GET home page. */
router.get('/', function(req, res, next) {

      res.render('index', { title: 'Express' });

  });


router.get('/signout', function(req, res, next) {
     res.render('index', { title: 'Express' });
});

router.get('/signin', function(req, res, next) {

    res.render('signin', { });

});


module.exports = router;
