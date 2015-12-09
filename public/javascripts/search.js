$('document').ready(function(){
  $('.templatePassword').hide();
  //email찾기 버튼 클릭
  $('.emailserch.send').click(function(){
    $('button.btn.btn-default.emailserch.send').attr('disabled',true);
    var name = $('.emailserch').val();

    $.ajax({
      url:'/search/emailsearch',
      data:{name: name},
      type:'POST',
      dataType:'json',
      success:function(data){
        //alert(data);
        if(data.status==='200'){
          alert(name+'님의 email은'+data.email+'입니다.');
          $('button.btn.btn-default.emailserch.send').attr('disabled',false);
          $('.templateEmail').hide();
          $('.templatePassword').show();

        }else if(data.status==='400'){
          alert('해당 이름은 존재하지 않습니다.');
          $('button.btn.btn-default.emailserch.send').attr('disabled',false);
        }

      }
    })

  });

  //password찾기 버튼 클릭
  $('.passwordserch.send').click(function(){
    var email = $('.passwordserch').val();
    $.ajax({
      url:'/search/passwordsearch',
      data:{email: email},
      type:'POST',
      dataType:'json',
      success:function(data){
        if(data.status==='200'){
          alert(data.email+'해당 이메일로 임시비밀번호를 발송하였습니다');

        }else if(data.status==='400'){
          alert('해당 이메일은 존재하지 않습니다.');
        }
      }
    })
  });

})
