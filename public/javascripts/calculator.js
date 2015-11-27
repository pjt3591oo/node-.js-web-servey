$('document').ready(function(){

	$('#optionadd').click(function() {
		$("active").removeClass("active");
		$(".optionTbody.active").append($('#optiontemplate').html());

	});

	$('#contentadd').click(function() {
		$(".contentTbody").append($('#contenttemplate').html());
	});

	$('.contentdel').click(function(){
		var self=$(this);

		 $(this).parent("td").parent("tr").empty();


	})

})
