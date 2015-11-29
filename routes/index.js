var express = require('express');
var router = express.Router();
var crypto= require('crypto');
var Users = require('../models/users');

function logincheck(req,res,next){

  if(!req.cookies.user){
    res.render('index', { title: 'Express'});
  }else{
    next();
  }
}
/* GET home page. */
router.get('/',logincheck, function(req, res, next) {

    Users.findOne({email:req.cookies.user},function(err,user){
      if(err){
        return next(err);
      }else{
        res.render('index', { title: 'Express', currentUser:user});

      }
    });

});


router.get('/signout', function(req, res, next) {
     res.clearCookie('user');
     res.render('index', { title: 'Express' });
});

router.get('/signin', function(req, res, next) {

    res.render('signin',  { title: 'Express' });

});

router.post('/signin/:email',check, function(req, res, next) {
      res.json(0);
    //res.redirect('/posts');
});

function check(req,res,next){
  var password = cryp(req.body.password, null);
  console.log(password);
  Users.findOne({email:req.param('email'), password:password},function(err,data){
    if(err){
      return next(err);
    }else{
      data = data || "0";
      if(data==="0"){
        res.json('해당 정보가 일치하지 않습니다.');
      }else if(data.emailAuth==="0"){
        res.json('이메일 인증을 하셔야 됩니다.');
      }else{ //로그인 성공
          res.cookie('user', req.param('email'));
          next();
      }

    }
  });
}

//암호화
function cryp(data, options){
  var s = crypto.createHash('sha1');
        s.update(data);
        data = s.digest('hex');
        return data;
}
module.exports = router;
