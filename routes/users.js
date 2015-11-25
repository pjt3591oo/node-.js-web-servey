var express = require('express');
var router = express.Router();

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
*/
router.get('/', function(req, res, next) {

    res.render('index', { title: 'Express' });

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
