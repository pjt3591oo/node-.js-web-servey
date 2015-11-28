$('document').ready(function(){
  $('button.btn.btn-primary').click(function(){

    var name = $('.name').val() ;
    var email = $('.email').val();
    var password = $('.password').val();
    var password_confirmation = $('.password_confirmation').val();

    if(!checkData(name,email,password, password_confirmation)){
      return 0;
    }

    $.ajax({
      url:'/users/new/'+name,
      type:'POST',
      data:{password: password, email:email},
      success:function(data){
        if(!data){ //회원가입 성공 이메일 인증

        }else{ //회원가입 실패
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
