$('document').ready(function(){

	var addContentCount=0;
	var addOptionCount=0;
	var delContentCount=0;
	var delOptionCount=0;

	$("#optionadd").hover(function(){
		if(!addOptionCount){
			$("tip").append($("#addContentTip").html());
			$("tip").fadeOut(5000);
			addOptionCount++;
		}
	});
	$("#optiondell").hover(function(){
		if(!delOptionCount){
			$("tip").append($("#delOptionTip").html());
			$("tip").fadeOut(5000);
			delOptionCount++;
		}
	});
	$("#contentadd").hover(function(){
		if(!addContentCount){
			$("tip").append($("#addContentTip").html());
			$("tip").fadeOut(5000);
			addContentCount++;
		}
	});
	$("#contentdel").hover(function(){
		if(!delContentCount){
			$("tip").append($("#delContentTip").html());
			$("tip").fadeOut(5000);
			delContentCount++;
		}
	});
	$('.active.select').change(function(){
		alert('test');
	})
	//설문 유형 선택


	//option 추가
	$('#optionadd').click(function() {
		$(".active").append($('#optiontemplate').html());
	});

	//content 추가
	$('#contentadd').click(function() {
		$(".active").removeClass("active");
		$(".contentTbody").append($('#contenttemplate').html());
	});

	$('.contentdel').click(function(){
		alert('asd');
	})

})
