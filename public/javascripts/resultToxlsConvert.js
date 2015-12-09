$('document').ready(function(){
  $('.convert').click(function(e){
     window.open('data:application/vnd.ms-excel,' +escape($('h1.page-header').html()));
    //e.preventDefault('utf-8');
  })
});
