var express = require('express');
var router = express.Router();
var Users = require('../models/users');
var nodemailer = require('nodemailer');
var crypto = require('crypto');
var loginAuth = require('../routes/auth/loginAuth');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'pjt3591oo@gmail.com',
        pass: 'qkrwjdxo1'
    }
});



//회원가입 페이지 전환
router.get('/new', function(req, res, next) {
    //Users.remove({email:'pjt3591oo@naver.com'},function(){});
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
          var name = req.param;
          console.log(name);
          var newUser = new Users({
            email: req.body.email,
            password: req.body.password,
            name : req.param('name')
          });
          //비밀번호 암호화
          newUser.password = cryp(req.body.password);

          console.log(newUser);
          newUser.save(function(err){
            if(err){
              console.log(err);
              next(err);
            }else{
              Users.findOne({email: req.body.email},function(err,userEmail){
                var mailOptions = {
                    to:req.param('name')+'<'+req.body.email+'>',  // list of receivers
                    from: '박정태 <pjt3591oo@naver.com>', // sender
                    subject: 'Hello 가입을 축하합니다', // Subject line
                    text: 'Hello 가입을 축하합니다 아래 링크를 누르시면 가입이 됩니다.', // plaintext body
                    html: '<h1>가입을 축하합니다.</h1>'
                          +'<a href=http://127.0.0.1:3000/users/regi/'+userEmail._id+'>인증을 하려면 눌러주세요</a>' // html body https://thawing-shore-4680.herokuapp.com
                          +'<h2>asd</h2>'
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                        return next(error);
                    } else {
                        console.log('Message sent: ' + info.response);
                        res.json(0);
                    }
                });
              });
           }
         });

        }else{  //이메일이 존재 할 때
          res.json('이메일이 이미 존재합니다.');
        }
      }
    });
  }
});

router.get('/regi/:id', function(req, res,next){
  console.log(req.param('id'));

  Users.update({_id:req.param('id')},{emailAuth:"1"},function(err){
    if(err){
      return next(err);
    }else{
      Users.find({},function(err,data){
        console.log(data);
        res.redirect('/signin');
      });
      //res.redirect('/signin');
    }
  });
});

// 이메일 비밀번호 공백 확인
function checkNewCustom(user, options){
  //console.log(user.email);
  var email = user.email || '0';
  var password = user.password ||'0';
  if(email==="0" || password==="0") {return 0;}

  return 1;
}

//암호화
function cryp(data, options){
  var s = crypto.createHash('sha1');
        s.update(data);
        data = s.digest('hex');
        return data;
}

//프로필 페이지 띄우기
router.get('/:id',loginAuth.loginAuth, function(req, res, next) {
  Users.findOne({_id:req.param('id')},function(err,user){
      if(err){
        return err;
      }else{
        res.render('./users/profile',{user:user, currentUser:1});
      }
  });
});

//프로필 변경 - 비밀번호만 바꾼다.
router.post('/:email',loginAuth.loginAuth, function(req, res, next) {
  var password = req.body.password;
  password = cryp(password,null);
  Users.update({email:req.param('email')},{password:password},function(err){
      if(err){
        return err;
      }else{
        Users.find({email:req.param('email')},function(err,data){
          console.log(data);
          res.json(0);
        });

      }
  });
});

router.get('/emailAuth', function(req, res, next) {

  res.render('index', { title: 'Express' });

});

module.exports = router;
