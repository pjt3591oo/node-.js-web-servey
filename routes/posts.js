var express = require('express');
var Users = require('../models/users');
var Surveys = require('../models/survey');
var Questions = require('../models/question');
var Options = require('../models/option');
var LoopNext = require('loopnext');
var router = express.Router();

router.get('/', function(req, res, next) {  // /posts로 들어왔을 경우
  //email:req.cookies.user
    
    Surveys.find({},function(err,data){ //쿠키에 맞는 유저의 설문만 추출해서 보여준다.
      if(err){
        return next(err); //에러났을경우 에러 핸들러로 next시킴
      }else{
        var pagination={ "numPosts" :data.length}; //data(게시글 수)

        res.render('./posts/index', { posts: data, email : req.cookies.user,  pagination : pagination, currentUser:'1' }); //게시글의 데이터와 갯수를 랜더링한다.
      }
    });

});

router.get('/new', function(req, res, next) { // 설문 작성 페이지

      res.render('./servey/servey', { post: '', currentUser:'1', email:req.cookies.user});
});

router.get('/:id', function(req, res, next) { // 설문지 보기


  Surveys.find({_id:req.param('id')},function(err,survey){
    console.log(survey[0]._id);
    Questions.find({surveyId:survey[0]._id},function(err,question){

      result(survey,question,res);

    });
  });
});

function result(survey, question,res){
  var loop = new LoopNext();
  var count=0;
  var op = new Array();
  loop.syncLoop(question.length, function(n){
    console.log(question[count]._id);
    Options.find({questionId:question[count]._id},function(err,option){
      console.log('asd');
      console.log(option);
      op.push(option);
      count++;
      if(count>=question.length){
        view(res,survey, op, question)
      }
      n.next();
    });
  })
}

function view(res,survey, op, question){
  console.log('rrr');
  console.log(op);
  console.log(question);
  res.render('./posts/show',{survey:survey, question:question, op:op});
}

router.post('/new', function(req, res, next) { // 설문 작성 페이지 전송
      var head=heads(req.body); //각 양식 제목 추출
      var option = options(req.body); // 각 양식의 옵션들 추출
      var type = types(req.body);

      var survey = new Surveys({
        email : req.body.email,
        subject : req.body.subject || "제목없음!"
      });

      survey.save(function (err) {
        if (err) {
          console.log(err);
        } else {
          //console.log(head[1]);
          saveQuestion(survey.id, head, option, type);
          console.log('asd');
          end(res);
      }
    });
});

function end(res){
  res.json('');
}

function saveQuestion(surveyId, head, option, type){
  var Loop =new LoopNext();
  var headCount=0;
  Loop.syncLoop(head.length, function (l) {


    var opCount=0;
    var question = new Questions({
        surveyId : surveyId,
        head : (head.length<2)? head : head[headCount],
        type : (type.length<2)? type : type[headCount]
    });
    console.log('==question=='+question);
    if(question.type==="객관식" ){
      saveOption(question.id, option[1][headCount], type[headCount]);

    }

    question.save(function(err){
      if(err){
        return next(err);
      }else{
          headCount++;
          l.next();
      }
    })
  });
}

function saveOption(questionId, option, type){
  console.log('=============');
  console.log(questionId);
  console.log(option);
  console.log(type);
  var opLoop = new LoopNext();
  var count = 0;
  opLoop.syncLoop(option.split(',').length,function(n){
    var o = new Options({
      questionId:questionId,
      option: option.split(',')[count]
    });
    console.log('==option=='+o);
    o.save(function(err){
      if(err){
        return next(err);
      }else{
        //console.log(o);
        count++;
        n.next();
      }
    });
  })
}

function heads(body){
  var array = new Array();
  for(var i in body){
    for(var j in body[i]){
      if(i==="he[]"){
        array.push(body[i][j]);
      }
    }
  }
  console.log(array);
  return array;
}
function options(body){
  var array = new Array(new Array(), new Array());
  var count=0;

  for(var i in body){

    for(var j in body[i]){
      if(i==="op[]"){
        var pattern = /[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9-,)]/gi;
        array[count][j]=body[i][j].replace(pattern,"");
      }
    }
    count++;
  }

  //console.log(array.replace(pattern,""));


  return array;
}

function types(body){
  var array = new Array();
  for(var i in body){

    for(var j in body[i]){
      if(i==="type[]"){
        array.push(body[i][j]);
      }
    }
  }
  return array;
}

module.exports = router;
