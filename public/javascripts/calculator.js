$('document').ready(function(){

	$('#optionadd').click(function() {

		$(".active").append($('#optiontemplate').html());

	});

	$('#contentadd').click(function() {
		$(".active").removeClass("active");
		$(".contentTbody").append($('#contenttemplate').html());
	});

	$('.contentdel').click(function(){
		var self=$(this);

		 $(this).parent("td").parent("tr").empty();


	})

})
