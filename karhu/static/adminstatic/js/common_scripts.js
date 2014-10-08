
$(function(){
	
	
	$.datepicker.setDefaults({
		showAnim: 'drop',
		//dateFormat: 'mm/dd/yy'  //Because of date format problem in Event model. How about custom ModelForm or hidden input?
		dateFormat: 'dd.mm.yy'
	})
	
	$('.date input').datepicker();	//Because I dont want to to make custom form for DateTime field
	
	$('.dateWidget').initDateWidget();

	var buttons = $('button, .button'); 
	
	buttons.filter('[title^="ui"]')
		.each(function(i,n){
			$n = $(n);
			var text = $n.hasClass('icon-only') ? false : $n.text();  
			$n.button({
				icons: {
	               primary: n.title
	            },
	            text: text
			})
			.attr('title', $(n).text());
		});
	$('button, .button')
		.not('[title^="ui"]')
		.button();
	

	$('.confirm').click(function(e){
		var button = $(e.currentTarget);
		
		if (button.hasClass('ui-button-disabled')) {
			return false
		} else if (!confirm("Вы собираетесь сделать что-то необратимое \n(обычно это удаление чего-то, но может быть и иначе). \n Вы уверены?")) {
			e.stopImmediatePropagation();
			return false;
		} 
		
	
	});
		
$('.help_summoner').areHelpSummoners()
	
});

$.fn.initDateWidget = function(){
	var box = this,
		fake = $('.fakeDate input', box),
		actual = $('.actualDate input', box);
	
	fake.datepicker({
		altField: actual,
		altFormat: "mm/dd/yy"		
	});	
	
}


$.fn.reload = function() {
	var img = this,
		src =  img.attr('src'),
		m = src.indexOf('?'),
		random = m>0 ? '&random_crop=' : '?random_crop=';
		
	img.attr('src', src + random + Math.random());	
}

$.fn.areHelpSummoners = function(options) {
	
	function HelpSummoner(item) {
		
		var self = this,
			id = 'help_' + item.id.split('_')[1];
		
			
		self.button = $(item);
		if (!self.button.hasClass('button')) {
				self.button.button({
					text: false,
					icons: {
						primary: 'ui-icon-help'
					}
				});
		}
		
		
		self.help = $(document.getElementById(id))
						.dialog({
							modal: true,
							width: 500,
							autoOpen: false,
							title: self.button.text()
						});
		
		self.button.click(function(e){
			e.preventDefault();
			
			self.help.dialog('open');
			
		})
		
	}
	
	this.each(function(i, n){
		var a = new HelpSummoner(n);
	})
	
}



// ------------  Crop functions ------------------

$.fn.areCropButtons = function(options){
	
	options = $.extend({
		reloadImage: $()
	}, options);
	
	
	function CropButton(button){
		var self = this;
		self.button = button;
		
		$(self.button).click(function(e){
			e.preventDefault();
			self.summon(e);
		});
		
		//self.reloadImage = typeof(options.reloadImage) == 'function' ?  options.reloadImage(self.button) : options.reloadImage;
		self.reloadImage = typeof(options.reloadImage) == 'function' ?  options.reloadImage(self.button) : $(options.reloadImage);
		
		self.dialog = $('<div class="crop_dialog"/>')
					.dialog({
							width: 900,
							//height: 700,
							position: 'top',
							modal: true,
							dialogClass: 'crop_interface',
							autoOpen: false,
							buttons: {
								'ok': function(){
									var form = $('form', self.dialog);
									form.ajaxSubmit(function(data){
										/*
										var src =  self.reloadImage.attr('src'),
											m = src.indexOf('?'),
											random = m>0 ? '&random_crop=' : '?random_crop=';
											
										self.reloadImage.attr('src', src + random + Math.random());
										*/
										self.reloadImage.reload();
										self.dialog.dialog('close');
									})
									
									
								},
								'Cancel': function(){
									self.dialog.dialog('close');
								}
							},
							close: function(){
								var form = $('form', self.dialog),
									ias = form.data('ias');		
								ias.cancelSelection();
								self.dialog.empty();

								}
						});		
	}

	CropButton.prototype.summon = function(e){
		var self = this;
		e.preventDefault();
		url = self.button.href;
		self.dialog.dialog('open');
		$.get(url, {}, function(data){
				self.dialog.html(data);
			});
	
	}

	
	$(this).each(function(i,n){
		var s = new CropButton(n);
	})

}

$.fn.crop_engine = function(options){

	options = $.extend({
		onSelectEnd: cropSubmit,
		handles: true,
		instance: true
	}, options);
	
	var source = this,
		form = source.closest('form'),
		crop_url = form.attr('action');
	 
	var ias = source.imgAreaSelect(options);
	
	form.data('ias', ias);
	
	function cropSubmit(img, selection){
		
		send = {
				width: selection.width,
				height: selection.height,
				x1: selection.x1,
				y1: selection.y1,
				x2: selection.x2,
				y2: selection.x2
		}
		
		$('[name=x1]', form).val(selection.x1);
		$('[name=y1]', form).val(selection.y1);
		$('[name=x2]', form).val(selection.x2);
		$('[name=y2]', form).val(selection.y2);
		$('[name=width]', form).val(selection.width);
		$('[name=height]', form).val(selection.height);
		
		//console.log(crop_url, img, selection);

	}
	
}

// ------------  /Crop functions ------------------

// -------------- Sorting 



$.fn.areSortSummoners = function(options) {
	
	
	SortSummoner = function(item) {
		var self = this;
		self.button = item;
		self.url = self.button.href;
		self.dialog = div = $('<div/>')
				.data('summoner', self)
				.dialog({
						width: 400,
						autoOpen: false,
						modal: true,
						resizable: false,
						title: 'Сортировка',
						buttons: {
							'Угу': self.send_order,
							'Пожалуй, не надо': function(){$(this).dialog('close');}
						}
					})	
					
		$(self.button)
			.data('summoner', self)
			.click(self.summon)
		
	}
	
	SortSummoner.prototype.summon = function(e) {
		var self = $(this).data('summoner');
		e.preventDefault();
		$.get(self.url, function(data){
			self.dialog
				.html(data)
				.dialog('open');
			$('.items', self.dialog).sortable({
				
				placeholder: 'ui-state-highlight',
				axis: 'y',
				containment: 'parent'
				
			});
		});
		
	}
	
	SortSummoner.prototype.send_order = function() {
		var self = $(this).data('summoner'),	
			items = $('.item', self.dialog), 
			items_array = [];
			
		items.each(function(i, n){
			var pk = n.id.split('_')[1]
			items_array.push(pk);
		});
		$.post(self.url, {order: items_array}, function(data){
			location.href = location.href;
			//self.dialog.dialog('close');
		})	
	}
	
	
	this.each(function(i,n){
		
		var s = new SortSummoner(n);
	})
	
}
// -------------------------------------------------