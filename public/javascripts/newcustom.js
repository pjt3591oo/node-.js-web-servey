$('document').ready(function(){

  $('#load').removeClass('loader9');

  $('button.btn.btn-primary').click(function(){
    buttonHide();
    $('#load').addClass('loader9');

    var name = $('.name').val() ;
    var email = $('.email').val();
    var password = $('.password').val();
    var password_confirmation = $('.password_confirmation').val();

    if(!checkData(name,email,password, password_confirmation)){
      buttonShow();
      $('#load').removeClass('loader9');
      return 0;
    }

    $.ajax({
      url:'/users/new/'+name,
      type:'POST',
      data:{password: password, email:email},
      success:function(data){
        if(!data){ //회원가입 성공 이메일 인증

          alert('회원가입이 되셨습니다. 이메일 인증을 한후 로그인을 하세요');
          location.replace("/");
        }else{ //회원가입 실패
          buttonShow();
          $('#load').removeClass('loader9');
          alert(data);
        }
      }
    })


  });
})

function checkData(name,email,psw,pswCh){
  if(psw!=pswCh){
    alert('패스워드가 일치하지 않습니다.');
    return 0;
  }else if(!name){
    alert('사용자 이름을 입력 하지 않았습니다');
    return 0;
  }else if(email.split('@').length<2){
    alert('이메일 형식이 맞지 않습니다.');
    return 0;
  }else if(!email){
    alert('이메일을 입력하지 않았습니다.');
    return 0;
  }else if(!psw){
    alert('패스워드을 입력하지 않았습니다.');
    return 0;
  }
  return 1;
}


function buttonShow(){
  $('button.btn.btn-primary.regi').show();

}

function buttonHide(){
  $('button.btn.btn-primary.regi').hide();

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
