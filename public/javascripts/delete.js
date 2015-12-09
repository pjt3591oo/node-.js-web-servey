$('document').ready(function (){

  $('.update').click(function(){
    var password = prompt("password를 입력하세요");
    var id = $(this).data('id');
    var email = $('.update').data('user');

  //  alert(email);
    $.ajax({
      url:'/posts/update/'+id,
      data:{password:password, email:email},
      type:'post',
      dataType:'json',
      success:function(data){
        if(data.status===400){
          alert(data.data);
        }else{
          alert(data);
        }
      }
    })

  });

    $('.delete').click(function(){
      var password= prompt("password를 입력하세요");
      var id = $(this).data('id');
      var email = $('.update').data('user');
      var self = $(this);
      //alert(data);
    $.ajax({
        url:'/posts/delete/'+id,
        data:{password:password, email:email},
        type:'delete',
        dataType:'json',
        success:function(data){
          if(data.status===200){
            var $index = self.html("clicked: "+ event.target);
            $index.parent("td").parent("tr").empty();
            $('total').text($('total').text().split(' ')[0]-1+' posts');

            alert(data.data);
          }else if(data.status===400){
            alert(data.data);
          }
        }
      })

    });


})
