var express = require('express');
var Users = require('../models/users');
var Surveys = require('../models/survey');
var Questions = require('../models/question');
var Options = require('../models/option');
var Answers = require('../models/answer');

var crypto = require('crypto');
var LoopNext = require('loopnext');
var router = express.Router();

router.get('/', function(req, res, next) {  // /posts로 들어왔을 경우
  //email:req.cookies.user
    console.log('asd');
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

router.get('/result/:id', function(req, res, next) { // 결과 보기
  Surveys.find({_id:req.param('id')},function(err,survey){
    console.log(survey[0]._id);
    Questions.find({surveyId:survey[0]._id},function(err,question){

      result(req,survey,question,res,'resultview');

    });
  });
});

router.post('/new', function(req, res, next) { // 설문 작성 페이지 전송
      var head=heads(req.body); //각 양식 제목 추출
      var option = options(req.body); // 각 양식의 옵션들 추출
      var type = types(req.body);

      console.log(option);

      if(!head.length || 2>req.body.questionCount || !req.body.subject){
          res.json("설문 제목이 비었거나, 설문 양식이 없습니다, 현재 양식 하나를 가지고 설문을 만들경우 버그로 인하여 만들수 없습니다.");
      }else{
          var survey = new Surveys({
            email : req.body.email,
            subject : req.body.subject || "제목없음!"
          });

          survey.save(function (err) {
            if (err) {
              console.log(err);
            } else {
              //console.log(head);
              saveQuestion(survey.id, head, option, type);
              res.json({surveyId:survey.id});
          }
        });
      }
});

router.get('/search/:email',function(req,res,next){

  Surveys.find({email:req.param('email')},function(err,data){
    console.log(data);
    var pagination={ "numPosts" :data.length};
    res.render('./posts/index', { posts: data, email : req.param('email'),  pagination : pagination, currentUser:'1' });
  });
})

//삭제
router.delete('/delete/:id',checkPassword,function(req,res,next){
  /*
  Surveys
  Questions
  */
  var surveyId = req.param('id');
  var questionId ;

  Questions.find({surveyId:surveyId},function(err,question){
    if(err){
      return next(err);
    }else{
      questionId = question[0]._id;
      console.log(questionId);
      deleteData(res,surveyId, questionId, next);
    }
  })
})

//수정
router.post('/update/:id',checkPassword, function(req, res, next) {

  Surveys.find({_id:req.param('id')},function(err,survey){
    console.log(survey[0]._id);
    Questions.find({surveyId:survey[0]._id},function(err,question){
      result(req,survey,question,res,'updateview');
    });
  });

});

//데이터 제거
function deleteData(res, surveyId, questionId){
  Surveys.remove({_id:surveyId},function(err){
    if(err){
      return next(err);
    }else{
      Questions.remove({_id:questionId},function(err){
        if(err){
          return next(err);
        }else{
          Options.remove({_id:questionId},function(err){
            if(err){
              return next(err);
            }else{
              Answers.remove({_id:questionId},function(err){
                if(err){
                  return next(err);
                }else{
                  console.log('데이터가 정상적으로 제거 되었습니다.');
                  res.json({status:200, data:'해당 설문이 삭제 되었습니다.'});
                }
              });
            }
          });
        }
      });
    }
  });
}

function checkPassword(req,res,next){
  var email = req.body.email;
  var password = cryp(req.body.password,null);

  Users.findOne({email:email},function(err,data){
    if(err){
      return next(err);
    }
    else if(data.password===password ){
      next();
    }else{
      res.json({status:400, data:"비밀번호가 일치하지 않습니다."})
    }
  });
}

function cryp(data, options){
  var s = crypto.createHash('sha1');
        s.update(data);
        data = s.digest('hex');
        return data;
}

function answerResult(questionId, answer){
  var an = new Answers({
    questionId: questionId,
    answer: answer
  });
  an.save(function(err){
    if(err){
      return next(err);
    }else{
      console.log(an);
    }
  });
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
            serveyview(req,res,survey, op, question);
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
    }else if("updateview"===viewType){
      Options.find({questionId:question[count]._id},function(err,option){
        console.log('asd');
        console.log(option);
        op.push(option);
        count++;
        if(count>=question.length){
          console.log('testtesttest');
            updateview(req,res,survey, op, question);
        }
        n.next();
      });
    }
  });
}

function updateview(req,res,survey, op, question){
  console.log('설문 수정 페이지');
  console.log(op);
  console.log(question);
  res.json('asd');
  res.render('./posts/edit',{survey:survey, question:question, op:op,currentUser:req.cookies.user});
}

function serveyview(req,res,survey, op, question){
  console.log('설문 페이지');
  console.log(op);
  console.log(question);
  res.render('./posts/show',{survey:survey, question:question, op:op,currentUser:req.cookies.user});
}

function resultview(req,res,survey, an,op, question){
  console.log('======'+op+'===');
  res.render('./posts/result',{survey:survey, question:question,op:op, an:an,currentUser:req.cookies.user});
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
    });
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
        count++;
        n.next();
      }
    });
  });
}

function heads(body){
  var array =  [];
  for(var i in body){
    for(var j in body[i]){
      if(i==="he[]"){

        array.push(body[i][j]);
      }
    }
  }

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
  return array;
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


module.exports = router;
