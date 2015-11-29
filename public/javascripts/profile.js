$('document').ready(function(){
  alert($('p'));
  $('button.btn.btn-primary').click(function(){

    var name = $('.name').text() ;
    var email = $('.email').text();
    var password = $('.password').val();
    var password_confirmation = $('.password_confirmation').val();

    if(!checkData(name,email,password, password_confirmation)){
      return 0;
    }

   $.ajax({
      url:'/users/'+email,
      type:'POST',
      data:{password: password},
      success:function(data){
        if(!data){ //변경 성
          alert('비밀번호가 정상적으로 바뀌었습니다.')
          location.replace("/");
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
  }
  return 1;
}
