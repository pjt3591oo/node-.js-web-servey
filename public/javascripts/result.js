$('document').ready(function(){
  //alert('test');



  $.each($('.surveyQuestion'),function(index){
    var Graphs = new Array();
    var op= new Array();
    var c = $('.surveyQuestion').eq(index).find('#myCanvas')[0];

    $.each($('.surveyQuestion'),function(index){
      var temp = $(this);
      $.each($('.surveyQuestion').eq(index).find('tr'),function(ind){
        if($('.surveyQuestion').eq(index).attr('class')==='surveyQuestion 객관식'){
          var num=$('.surveyQuestion').eq(index).find('tr').eq(ind).find('td').data().id;
          //alert(typeof Graphs[num]==="undefined");
          if(typeof Graphs[num]==="undefined"){
            Graphs[num]=1;
            op[num]=$('.surveyQuestion').eq(0).find('tr').eq(0).find('td').text();
          }else{
            Graphs[num]+=1;
          }
          Graphs[num] = (typeof Graphs[num]==="undefined")?  0: Graphs[num]++ ;
        //  alert(Graphs[num]+1);
        }
      })
      //$('.surveyQuestion').eq(index).find('#myCanvas')[0]
    })

    draw(Graphs, index,c,op );

  })

})

function draw(Graphs, index,c,op){
  for(var i in Graphs){
    //alert(Graphs[i]);
    $('.surveyQuestion').eq(index).find('#myCanvas')[0].style.height="200";
    var ctx = c.getContext("2d");
    if(i%4==1){
      ctx.fillStyle = "#F00000";
    }else if(i%4==2){
      ctx.fillStyle = "#0FF000";
    }else if(i%4==3){
      ctx.fillStyle = "#00FF00";
    }else if(i%4==0){
      ctx.fillStyle = "#000F00";
    }
    ctx.font = "10pt sans-serif";

    ctx.fillRect(20+10,60*i,30*Graphs[i],25);
    if(i!=='0'){
      ctx.fillText(Graphs[i]+'명', 2, 70*i);
      ctx.fillText(op[i], 2, 70*i+30);
    }else{
      ctx.fillText(Graphs[i]+'명', 2, 70*i+15);
      ctx.fillText(op[i], 2, 70*i+40);
    }
  }
}
