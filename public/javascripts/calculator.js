$('document').ready(function(htmldata){
	var addContentCount=0;
	var addOptionCount=0;
	var delContentCount=0;
	var delOptionCount=0;

	$(document).on('click','.opdel',function(){
		$(this).parent('li').remove();
	})

	$(document).on('click','.serveySave',function(){
		var subject =$('#subject').val();
		alert(subject);
		$.ajax({
			url:'/posts/new',
			data:{subject: subject },
			type:'POST',
			dataType:'json',
			success:function(data){
					//alert(data);
			}
		});
	})
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

	//설문 유형 선택
	$(document).on("change",".active select.form-control",function(){
		$('.active').find('.option').remove();
		optionEdit($(this).val());
	})

	//option 추가
	$('#optionadd').click(function() {
		var type = $(".active select").val();
		optionEdit(type);
		//alert(document.documentElement.innerHTML);
	});

	// 수정
	$(document).on('click','.contentiupdate',function(){
			var data= $(this);
			$(".active").removeClass("active");
			data.parent("table").addClass("active");

			$(this).parents("table").addClass('active');
	})

	//content 추가
	$('#contentadd').click(function() {
		//$(document).find('.active').removeClass();
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
