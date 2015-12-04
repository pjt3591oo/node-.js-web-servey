$('document').ready(function(){

  $.each($('.surveyQuestion'),function(index){
    var chart = new Array(); //객관식
    var rank = Array(); //리커트 척도

    var op= new Array();
    var c = $('.surveyQuestion').eq(index).find('#myCanvas')[0];


      var temp = $(this);
      //chart=[];
      //rank=[];
      //num=0;
      $.each($('.surveyQuestion').eq(index).find('tr'),function(ind){
        //객관식 그래프
        if($('.surveyQuestion').eq(index).attr('class')==='surveyQuestion 객관식'){
          var num=$('.surveyQuestion').eq(index).find('tr').eq(ind).find('td').data().id;
          //alert(typeof Graphs[num]==="undefined");
          if(typeof chart[num]==="undefined"){
            chart[num]=1;
            op[num]=$('.surveyQuestion').eq(0).find('tr').eq(0).find('td').text();
          }else{
            chart[num]+=1;
          }
          chart[num] = (typeof chart[num]==="undefined")?  0: chart[num]++ ;

            //리커트 척도 그래프
        }else if($('.surveyQuestion').eq(index).attr('class')==='surveyQuestion 리커트척도'){
          var num = $('.surveyQuestion').eq(index).find('tr').eq(ind).data().id;

          if(typeof rank[num]==="undefined"){
            //
            rank[num]=1;

          }else{
            //alert('asasdasd');
            rank[num]+=1;
          }
          rank[num] = (typeof rank[num]==="undefined")?  0: rank[num]++ ;
        }

      })

      if($('.surveyQuestion').eq(index).attr('class')==='surveyQuestion 객관식'){
        chartDraw(chart, index,c,op );

      }else if($('.surveyQuestion').eq(index).attr('class')==='surveyQuestion 리커트척도'){

       graphDraw(rank, index,c);
      }

    })

})
function graphDraw(Graphs, index,c,op){
  var temp = [1,2,3,4,5];
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

    ctx.fillRect(50*i-50,60,20,25*Graphs[i]);
    for(var i in temp){
      var count = temp[i];
      ctx.fillText(count+'점', 50*i, 55);

      if(typeof Graphs[count]==="undefined"){
        Graphs[count]=0;
      }

      ctx.fillText(Graphs[count]+'명', 50*i, 30);
    }
  }
}
function chartDraw(Graphs, index,c,op){
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
    var temp = Graphs[i] || 0;
    if(i!=='0'){
      ctx.fillText(temp+'명', 2, 70*i);
      ctx.fillText(op[i], 2, 70*i+30);
    }else{
      ctx.fillText(temp+'명', 2, 70*i+15);
      ctx.fillText(op[i], 2, 70*i+40);
    }
  }
}
