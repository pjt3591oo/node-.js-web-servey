var express = require('express');
var router = express.Router();
var user = require('../models/users');
var crypto = require('crypto');
/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
*/
router.get('/', function(req, res, next) {
    user.find({},function(err, userList){
      if(err){
        return next(err);
      }else{
        console.log(userList);
        res.render('users/list', {user: userList});
      }
    });
});

//회원가입 페이지 전환
router.get('/new', function(req, res, next) {

    res.render('./users/new', { title: 'Express' });

});

//회원가입
router.post('/new/:name', function(req, res, next) {
  console.log(req.param('name'));
  res.json('asd');
/*
    var newUser = new user({
      email: req.body.email,
      password: req.body.password,
      name : req.param('name')
    });

    //비밀번호 암호화
 var password = req.body.password;
    var s = crypto.createHash('sha1');
        s.update(password);
        password = s.digest('hex');
    newUser.password = password;
    console.log(password);
    console.log(newUser);


    newUser.save(function(err){
      if(err){
        console.log(err);
        next(err);
      }else{
       res.redirect('/signin');
      }
    });
*/
});



router.get('/:id', function(req, res, next) {

});

router.get('/emailAuth', function(req, res, next) {

  res.render('index', { title: 'Express' });

});

module.exports = router;
