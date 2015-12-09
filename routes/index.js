var express = require('express');
var router = express.Router();
var crypto= require('crypto');
var Users = require('../models/users');
var Surveys = require('../models/survey');
var Questions = require('../models/question');
var Options = require('../models/option');
var Answers = require('../models/answer');

var LoopNext = require('loopnext');
function logincheck(req,res,next){

  if(!req.cookies.user){
    res.render('index', { title: 'Express',currentUser:req.cookies.user});
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

//로그인 페이지 접속
router.get('/signin', function(req, res, next) {
  /*======태스트용 아이디 생성======*/

  /*var test = new Users({
      name : "test",
      email : "test@test.com",
      password : cryp("test",null),
      auth : 0,
      emailAuth : 1
    })
    Users.findOne({name:"test"},function(err,user){
      console.log(test);
    })*/

  /*======태스트용 아이디 생성======*/

  /*게시글 다 지우기*/
  /*Surveys.remove(function(){});
  Questions.remove(function(){});
  Options.remove(function(){});
  Answers.remove(function(){});*/
  /*게시글 다 지우기*/

    res.render('signin',  { title: 'Express', email : req.cookies.email });

});

//로그인 시도
router.post('/signin/:email',check, function(req, res, next) {

      res.json(0);


    //res.redirect('/posts');
});

function check(req,res,next){
  var password = cryp(req.body.password, null);
  console.log(password);
  Users.findOne({email:req.param('email'), password:password},function(err,data){

    if(err){
        res.json('err');
      return next(err);
    }else{

      data = data || "0";
      if(data==="0"){

        Users.findOne({email:req.param('email'), password:cryp(toString(req.body.password), null)},function(err,data){
            data = data || "0";
            if(data==="0"){
              res.json('해당 정보가 일치하지 않습니다.');
            }else{ //로그인 성공
                res.cookie('user', req.param('email'));
                next();
            }
        });

      }else if(data.emailAuth==="0"){
        res.json('이메일 인증을 하셔야 됩니다.');
      }else if(req.param('email').length===0){
        res.json('이메일을 입력하셔야 합니다.');
      }
      else{ //로그인 성공
        console.log('tttt');
          res.cookie('user', req.param('email'));

          next();
      }

    }
  });
}

router.get('/views/:id', function(req, res, next) { // 설문지 보기

  Surveys.find({_id:req.param('id')},function(err,survey){
    console.log(survey[0]._id);
    Questions.find({surveyId:survey[0]._id},function(err,question){

      result(req,survey,question,res, 'surveyview');

    });
  });
});

router.post('/submit/:id', function(req, res, next) { // 설문지 제출 하기
    var questionId = decompositionsId(req.body);
    var type= types(req.body);
    var answer =  decompositionsAnswer(req.body);
    console.log(type);
    console.log(questionId);
    console.log(answer);

    var loop = new LoopNext();
    var count=0;
    loop.syncLoop(questionId.length, function(n){
      answerResult(req,questionId[count], answer[count],next)
      count++;
      n.next();
    });

    res.json('0');

});

function serveyview(req,res,survey, op, question){
  console.log('rrr');
  console.log(op);
  console.log(question);
  res.render('./posts/show',{survey:survey, question:question, op:op,currentUser:req.cookies.user});
}

function resultview(req,res,survey, an,op, question){
  console.log('======'+op+'===');
  res.render('./posts/result',{survey:survey, question:question,op:op, an:an,currentUser:req.cookies.user});
}


function result(req,survey, question,res, viewType){
  var loop = new LoopNext();
  var count=0;
  var op = [];
  var an = [];
  loop.syncLoop(question.length, function(n){
    console.log(question[count]._id);
    if("surveyview"===viewType){
      Options.find({questionId:question[count]._id},function(err,option){
        console.log('asd');
        console.log(option);
        op.push(option);
        count++;
        if(count>=question.length){
            serveyview(req, res,survey, op, question);
        }
        n.next();
      });
    }else if("resultview"===viewType){
      Options.find({questionId:question[count]._id},function(err,option){
        console.log(option);
        Answers.find({questionId:question[count]._id},function(err,answer){
          console.log('asd');
          console.log(answer);
          an.push(answer);
          op.push(option);
          count++;
          if(count>=question.length){
              resultview(req,res,survey, an,op, question);
          }
          n.next();
        });
      });
    }
  });
}

function types(body){
  var array = [];
  for(var i in body){

    for(var j in body[i]){
      if(i==="type[]"){
        array.push(body[i][j]);
      }
    }
  }
  return array;
}

function answerResult(req,questionId, answer,next){
  var an = new Answers({
    questionId: questionId,
    answer: answer
  });
  an.save(function(err){
    if(err){
      return next(err);
    }else{

    }
  });
}


function decompositionsId(body){
  var array = [];
  for(var i in body){

    for(var j in body[i]){
      if(i==="questionId[]"){
        array.push(body[i][j]);
      }
    }
  }
  return array;
}


function decompositionsAnswer(body){
  var array = [];
  for(var i in body){

    for(var j in body[i]){
      if(i==="answers[]"){
        array.push(body[i][j]);
      }
    }
  }
  return array;
}

//암호화
function cryp(data, options){
  var s = crypto.createHash('sha1');
        s.update(data);
        data = s.digest('hex');
        return data;
}
module.exports = router;
