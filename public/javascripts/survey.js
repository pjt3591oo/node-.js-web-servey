$('document').ready(function(){

  $('a.btn.btn-default.recieve').click(function(){
    var answers = new Array();
    var questionId = new Array();
    var type = new Array();
    var surveyId = $('a.btn.btn-default.recieve').attr('id');

    $.each($('.surveyQuestion'),function(index){
      var types =$('.surveyQuestion').eq(index).find('tr').attr('class');
      type.push(types);
      questionId.push($('.surveyQuestion').eq(index).attr('id'));
      if(types=='sel'){//객관식
        var answer=$('.surveyQuestion').eq(index).find("tr input[type='checkbox']:checked").val();
        answers.push(answer);
      }else if(types==='text'){ //주관식
        var answer=$('.surveyQuestion').eq(index).find("textarea").val();
        answers.push(answer);
      }else if(types==='selnum'){ //리커트척도
        var answer=$('.surveyQuestion').eq(index).find("tr input[type='checkbox']:checked").val();
        answers.push(answer);
      }


    })

    $.ajax({
        url :'/submit/'+surveyId,
        data: {questionId:questionId, type: type, answers: answers},
        type:'POST',
  			dataType:'json',
        sussecc:function(data){
          alert('asdf');
        }
      });

  });

})
