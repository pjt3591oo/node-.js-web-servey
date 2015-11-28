$('document').ready(function(){

  $('.login').click(function(){
    var password = $('#password').val();
    var email = $('#email').val();

    $.ajax({
      url:'/signin/'+email,
      data:{password: password},
      type:'POST',
      dataType:'json',
      success:function(data){
        if(data){
          alert(data);
        }else{ //로그인 성공
          $(location).attr('href','/posts');
        }
      }
    });

  });

})
