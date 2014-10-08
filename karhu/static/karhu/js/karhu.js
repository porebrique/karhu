
$(function(){
	
	
	//console.log('This is karhu!')
	
	$("#main .gallery-folder .item a, .lineup .img").colorbox({
		opacity: 0.7
	});
	

	$('.music .lyrics a.summon').colorbox({
			inline:true, 
			href: function(){
					var href = $(this).attr('href');
	 				return href;
				}
			});

	
})