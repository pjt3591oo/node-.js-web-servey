

exports.loginAuth =function (req,res,next){

  if(!req.cookies.user){
    res.render("signin", { title: 'Express'});
  }else{
    next();
  }
};

exports.test =function (){
  console.log('test');
};
//module.exports = loginAuth;
