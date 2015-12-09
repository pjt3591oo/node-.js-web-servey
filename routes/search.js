var express = require('express');
var Users = require('../models/users');
var nodemailer = require('nodemailer');
var crypto = require('crypto');
var router = express.Router();

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'pjt3591oo@gmail.com',
        pass: 'qkrwjdxo1'
    }
});

/*
 **비밀번호 찾기 시나리오**
  1. 가입 했을떄의 이름을 통해 이메일을 찾는다.
  2. 이메일을 통해 임시비밀번호를 발급받는다.
  3. 임시비밀번호를 통해 로그인을 한다.
  4. 비밀번호를 변경한다.

  -> 암호화가 되있기 때문에 비밀번호를 알 수 없다.
  -> 임시비밀번호로 update를 한 후 사용자가 스스로 비밀번호를 다시 입력할수 있도록 한다.
*/

router.get('/',function(req,res){
  res.render('./search/searchmain',{});
});

//이메일 찾기 페이지 전환
router.get('/emailsearch',function(req,res){
  res.render('./search/email',{});
});

//비밀번호 찾기 페이지 전환
router.get('/passwordsearch',function(req,res){
  res.render('./search/password',{});
});

//이메일 찾기
router.post('/emailsearch',function(req,res,next){
  console.log(req.body.name);
  Users.findOne({name:req.body.name},function(err,data){
    console.log(data);
    if(err){
      return next(err);
    }else{
      if(data){
        console.log(typeof data);
        res.json({status:'200', email:data.email});
      }else{
        res.json({status:'400', data:"해당 이름이 존재 하지않습니다."});
      }
    }

  })
});

//비밀번호 찾기
//https://thawing-shore-4680.herokuapp.com
router.post('/passwordsearch',function(req,res,next){
  var tempPassword = new Date().getTime();
  var transferPassword = cryp(toString(tempPassword),null);

  Users.findOne({email:req.body.email},function(err,data){
    console.log(data);
    if(err){
      return next(err);
    }else{
      if(data){
        Users.update({email:req.body.email},{password:transferPassword},function(err){
          if(err){
            return next(err);
          }else{
            var mailOptions = {
                to:data.name+'<'+req.body.email+'>',  // list of receivers
                from: '박정태 <pjt3591oo@naver.com>', // sender
                subject: '임시비밀번호 발송', // Subject line
                text: '임시비밀번호를 발송하였습니다 해당 비밀번호로 로그인후 비밀번호를 바꿔주세요 ㅎㅎ', // plaintext body
                html: '<h1>임시비밀번호 발송</h1>'+
                      '<h3>'+tempPassword+'</h3>'+
                      '<a href=https://thawing-shore-4680.herokuapp.com/signin>클릭을 하면 로그인 페이지로 가게 됩니다.</a>'+ // html body https://thawing-shore-4680.herokuapp.com
                      '<h2><<<->>></h2>'
            };
            transporter.sendMail(mailOptions, function (err, info) {
                  if (err) {
                      console.log(err);
                      return next(err);
                  } else {
                      console.log('Message sent: ' + info.response);
                      res.json({status:'200', email:data.email});
                  }
            });
          }
        });
      }else{
        res.json({status:'400', data:"해당 이메일이 존재 하지않습니다."});
      }
    }
    });


});

//암호화
function cryp(data, options){
  var s = crypto.createHash('sha1');
        s.update(data);
        data = s.digest('hex');
        return data;
}
router.get('')

module.exports = router;
