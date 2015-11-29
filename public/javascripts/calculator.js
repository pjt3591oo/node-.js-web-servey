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

	$(document).on("change",".active select.form-control",function(){
		alert($(this).val());
	})
	//설문 유형 선택


	//option 추가
	$('#optionadd').click(function() {
		var type = $(".active select").val();

		optionEdit(type);

		//alert(document.documentElement.innerHTML);
	});

	// 수정
	$(document).on('click','.contentiupdate',function(){
			var data= $(this);

			$(document).find('.active').removeClass();
			$(this).parents("").addClass('active');
	})

	//content 추가
	$('#contentadd').click(function() {
		$(".active").removeClass("active");
		$(".contentTbody").append($('#contenttemplate').html());
	});

	//삭제
	$(document).on('click','.contentdel',function(){
		var data= $(this);
		data.parents('table').remove();

	})


})

function optionEdit(type){
	if(type==="객관식"){
		$(".active").append($('#optiontemplate').html());
	}else if(type==="주관식"){
		$(".active").append($('#optiontemplate1').html());
	}else if(type==="리커트척도"){
		$(".active").append($('#optiontemplate2').html());
	}
}
