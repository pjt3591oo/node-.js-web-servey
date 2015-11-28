var express = require('express');
var router = express.Router();
var Users = require('../models/users');
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
/*
  * 공백 확인
  * 아이디 이메인 중복 유뮤
  * 저장
  * 이메일 인증
*/
router.post('/new/:name', function(req, res,next) {
  var err = checkNewCustom(req.body, null);

  if(!err){
    res.json('공백이 있습니다.');
  }
  else{

    Users.findOne({email:req.body.email}, function(err,data){

      if(err){
        next(err);
      }else{
        console.log(data);
        data = data ||"0";
        //console.log(data);
        if(data==="0"){ //이메일이 존재하지 않을때
          console.log('a');
          var newUser = new Users({
            email: req.body.email,
            //password: req.body.password,
            name : req.param('name')
          });
          //비밀번호 암호화
          newUser.password =cryp(req.body.password);
          console.log(newUser);
          newUser.save(function(err){
            if(err){
              console.log(err);
              next(err);
            }else{
             res.redirect('/signin');
           }
         });

        }else{  //이메일이 존재 할 때
          res.json('이메일이 이미 존재합니다.');
        }
      }
    });
  }
});

// 이메일 비밀번호 공백 확인
function checkNewCustom(user, options){
  //console.log(user.email);
  var email = user.email || '0';
  var password = user.password ||'0';
  if(email==0 || password==0) return 0;
  return 1;
}

//암호화
function cryp(data, options){

  var s = crypto.createHash('sha1');
    /*  s.update(data);
      data = s.digest('hex');*/
      return data;
}

router.get('/:id', function(req, res, next) {

});

router.get('/emailAuth', function(req, res, next) {

  res.render('index', { title: 'Express' });

});

module.exports = router;
