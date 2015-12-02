var express = require('express');
var Users = require('../models/users');
var Surveys = require('../models/survey');
var Questions = require('../models/question');
var Options = require('../models/option');
var router = express.Router();

router.get('/', function(req, res, next) {  // /posts로 들어왔을 경우
  //email:req.cookies.user

    Users.find({},function(err,data){ //쿠키에 맞는 유저의 설문만 추출해서 보여준다.
      if(err){
        return next(err); //에러났을경우 에러 핸들러로 next시킴
      }else{
        var pagination={ "numPosts" :data.length}; //data(게시글 수)

        res.render('./posts/index', { posts: data, email : req.cookies.user,  pagination : pagination, currentUser:'1' }); //게시글의 데이터와 갯수를 랜더링한다.
      }
    });

});

router.get('/new', function(req, res, next) { // 설문 작성 페이지

      res.render('./servey/servey', { post: '', currentUser:'1', email:req.cookies.user}); //글쓰기 페이지를 렌더링 한다.
});

router.post('/new', function(req, res, next) { // 설문 작성 페이지
      console.log(req.body.email);
      console.log(req.body);
      var survey = new Surveys({
        email:req.body.email,
        head: req.body.head
      });



      survey.save(function(err,data){

      });
      res.json('a');
      //res.render('./servey/servey', { post: '', currentUser:'1'}); //글쓰기 페이지를 렌더링 한다.
});

module.exports = router;
