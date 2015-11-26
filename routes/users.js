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
        res.render('users/list', {user: userList})
      }
    })
});

router.post('/', function(req, res, next) {

    var newUser = new user({
      email: req.body.email,
      password: req.body.password,
      name : req.body.name
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
        next(err);
      }else{
        res.redirect('/signin');
      }
    })

});

router.get('/new', function(req, res, next) {

    res.render('./users/new', { title: 'Express' });

});


router.get('/:id', function(req, res, next) {
  po.find({},function(err,data){
    if(err){
      return next(err);
    }else{
      console.log(data);
      res.render('index', { title: 'Express' });
    }
  });
});

router.get('/emailAuth', function(req, res, next) {

  res.render('index', { title: 'Express' });

});

module.exports = router;
