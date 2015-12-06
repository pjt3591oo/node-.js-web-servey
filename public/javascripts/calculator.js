$('document').ready(function(htmldata){
	$('.layer').hide();

	var addContentCount=0;
	var addOptionCount=0;
	var delContentCount=0;
	var delOptionCount=0;

	$('.load').hide(function(){});

	$(document).on('click','.opdel',function(){
		$(this).parent('li').remove();
	})

 //양식 저장하기
	$(document).on('click','.serveySave',function(){
		$('.load').show();
		$('button.btn.btn-default.serveySave').hide(function(){});
		var survey = new Array;

		var email = $('#user').text();

		var type   = new Array;
		var header = new Array;
		var option = new Array;

		var questionCount =0;

		$.each($('.tem'),function(index){
			questionCount++;
			header.push( $(this).find('.header').val());
			type.push( $(this).find('select').val());

			//객관식 json으로 만든다.
			var q = $(this).find('select').val();

				if(q==="객관식"){
					var temp = new Array;

					$.each($('.tem').eq(index).find('.message'),function(i){
						temp.push($('.tem').eq(index).find('.message').eq(i).val());
					});

				}else if(q==="주관식"){
					var temp = new Array;
					temp.push(" ");
				}else if(q==="리커트척도"){
					var temp = new Array;
					temp.push(" ");
				}
				option[index]=JSON.stringify(temp);

		});

		question = new Object({
			option : option,
			header : header,
			type : type
		})
		survey.push(question);
		alert(questionCount);
		$.ajax({
			url:'/posts/new',
			data:{type:question.type, op:question.option, he:question.header, email:email ,subject:$('#subject').val(),questionCount:questionCount},
			type:'POST',
			dataType:'json',
			success:function(data){
				if(data.surveyId){
					var url = "http://127.0.0.1:3000/posts";
					var trb =	"http://127.0.0.1:3000/views/"+data.surveyId;
					copy_trackback(url,trb);
					$('.load').hide(function(){});
					//$(location).attr('href',url);
				}else{
					alert(data);
					$('.load').hide(function(){
						$('button.btn.btn-default.serveySave').show();
					});

				}
			}
		});
	})

	$(document).on('click','.clipBoardCopy',function(){
			window.clipboardData.setData("asd","asd");
			var a='asdsad';
			a.execCommand('copy')
	})
	$(document).on('click','.closeCopy',function(){
			$('.layer').hide();
			$('.load').hide(function(){
				$('button.btn.btn-default.serveySave').show();
			});
	})

	$("#optionadd").hover(function(){
		if(!addOptionCount){
			$("tip").append($("#addContentTip").html());
			$("tip").fadeOut(5000);
			addOptionCount++;
		}
	});

	$("#contentadd").hover(function(){
		if(!addContentCount){
			$("tip").append($("#addContentTip").html());
			$("tip").fadeOut(5000);
			addContentCount++;
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
		$(".active").append($('#optiontemplate').html());
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

function copy_trackback(url,trb) {
	var IE=(document.all)?true:false;
	if (IE) {
		if(confirm("이 설문 URL 주소압니다 클립보드에 복사하시겠습니까?"))
		window.clipboardData.setData("Text", trb);
	} else {
		$('.layer p.ctxt.mb20').append(trb);

		$('.layer').show();
		window.clipboardData.setData("Text", url);
		//temp = prompt("이 글의 트랙백 주소입니다. Ctrl+C를 눌러 클립보드로 복사하세요", trb);
		if(temp){
			$(location).attr('href',url);
		}else{

				$('.load').hide(function(){
					$('button.btn.btn-default.serveySave').show();
				});

		}
	}
}
