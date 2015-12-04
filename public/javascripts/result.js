$('document').ready(function(){
  //alert('test');

  $.each($('.surveyQuestion'),function(index){
    var Graphs = new Array();

    var c = $('.surveyQuestion').eq(index).find('#myCanvas')[0];

    $.each($('.surveyQuestion'),function(index){
      var temp = $(this);
      $.each($('.surveyQuestion').eq(index).find('tr'),function(ind){
        if($('.surveyQuestion').eq(index).attr('class')==='객관식'){
          alert(ind);
        }
      })
      //$('.surveyQuestion').eq(index).find('#myCanvas')[0]
    })


    var ctx = c.getContext("2d");
    ctx.fillStyle = "#FF0000";
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(0,0,50,100);

  })


})

function Graph(option, num ){

  this.PositionX=30*option;
  this.PositionY=0;
  this.height =10*num;
}
