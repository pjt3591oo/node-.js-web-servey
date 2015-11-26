var express = require('express');
var router = express.Router();
var user = require('../models/users');

/* GET home page. */
router.get('/', function(req, res, next) {

      res.render('index', { title: 'Express' });

  });


router.get('/signout', function(req, res, next) {
     res.render('index', { title: 'Express' });
});

router.get('/signin', function(req, res, next) {

    res.render('signin',  { title: 'Express' });

});

router.post('/signin', function(req, res, next) {
    console.log(req.body);
    res.redirect('/posts');

});
module.exports = router;
