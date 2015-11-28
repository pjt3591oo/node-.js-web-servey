var express = require('express');
var router = express.Router();
var crypto= require('crypto');
var Users = require('../models/users');

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

router.post('/signin/:email', function(req, res, next) {
    console.log(req.body.password);
    console.log(req.param('email'));
    var password = cryp(req.body.password, null);

    Users.findOne({email:req.param('email'), password:password},function(err,data){
      if(err){
        return next(err);
      }else{
        data = data || "0";
        if(data==="0"){
          res.json('해당 정보가 일치하지 않습니다.');
        }else if(data.auth==="0"){
          res.json('이메일 인증을 하셔야 됩니다.');
        }else{
          res.json(0);
        }

      }
    })
    //res.redirect('/posts');
});
//암호화
function cryp(data, options){
  var s = crypto.createHash('sha1');
        s.update(data);
        data = s.digest('hex');
        return data;
}
module.exports = router;
