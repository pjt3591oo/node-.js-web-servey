$('document').ready(function(){
  lodingHide();
  $('.login').click(function(){
    $('.load').show(function(){
      var password = $('#password').val();
      var email = $('#email').val() || '0';


        buttonLock();
        if(check(email,password)){
          $.ajax({
            url:'/signin/'+email,
            data:{password: password},
            type:'POST',
            dataType:'json',
            success:function(data){
              if(data){
                lodingHide();
                alert(data);

              }else{ //로그인 성공
                $(location).attr('href','/');
              }
            }
          });
        }else{
          lodingHide();
        }
    })

  });

})

function buttonLock(){
  $('button.btn.btn-lg.btn-primary.btn-block.login').attr('disabled',true);
}

function buttonUnLock(){
  $('button.btn.btn-lg.btn-primary.btn-block.login').attr('disabled',false);
}

function lodingShow(){

}

function lodingHide(){
  $('.load').hide(function(){
    buttonUnLock();
  })
}
function check(email, password){
  if(!email.length){
    alert('이메일을 입력하셔야 합니다.');
    return 0;
  }else if(!password.length){
    alert('비밀번호를 입력하셔야 합니다.');
    return 0;
  }
  return 1;
}
