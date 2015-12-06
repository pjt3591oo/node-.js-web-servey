
var users = require('../../models/users');

exports.adminAuth =function (req,res,next){



  console.log(req.cookies.user);
  users.findOne({email:req.cookies.user},function(err,data){
    console.log(data.auth);
    if(data.auth==="2"){
      next();
    }else{
      res.redirect('/')
    }
  })

};
