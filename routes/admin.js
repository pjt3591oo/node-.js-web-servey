var express = require('express');
var router = express.Router();
var Users = require('../models/users');
var nodemailer = require('nodemailer');
var crypto = require('crypto');

//권한 페이지 띄우기
router.get('/', function(req, res, next) {
    Users.find({},function(err, userList){
      if(err){
        return next(err);
      }else{
        res.render('users/list', {user: userList, currentUser:'1'});
      }
    });
});

//이름 검색
router.post('/users/searchName', function(req, res, next) {

    Users.find({name:req.body.searchName},function(err, userdata){
      if(err){
        return next(err);
      }else{
        var user =[userdata];
        console.log(user);
        res.render('users/list', {user: user, currentUser:'1'});
      }
    });
});

//권한 검색
router.post('/users/searchlv', function(req, res, next) {
    Users.find({auth:req.body.searchlv},function(err, userdata){
      if(err){
        return next(err);
      }else{
        console.log(userdata);
        var user =[userdata];
        res.render('users/list', {user: userdata, currentUser:'1'});
      }
    });
});

//권한 상승
router.get('/users/levelup/:id', function(req, res, next) {
    Users.update({_id:req.param('id')},{auth:"1"},function(err){
      if(err){
        return next(err);
      }else{
        res.redirect('/admin');
      }
    });
});

//권한 하락
router.get('/users/leveldown/:id', function(req, res, next) {
  Users.update({_id:req.param('id')},{auth:"0"},function(err){
    if(err){
      return next(err);
    }else{
      res.redirect('/admin');
    }
  });
});

//탈퇴
router.get('/users/del/:id', function(req, res, next) {
    Users.remove({_id:req.param('id')},function(err, user){
      if(err){
        return next(err);
      }else{
        res.redirect('/admin');
      }
    });
});

module.exports = router;
