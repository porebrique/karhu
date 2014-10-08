
$(function(){

	$('.add_image').add_image_button();
	


	topicAdding();

	$('.notes .delete_note').click(function(e){
		
		var link = $(e.target),
			tr = link.closest('tr'),
			textarea = $('textarea', tr);
		
		if (textarea.data('empty')) {
			link.text('Удалить заметку');
			textarea.val(textarea.data('text'));
			textarea.data('empty', false);
		} else {
			link.text('Вернуть заметку');
			textarea.data('text', textarea.val());
			textarea.val('');
			textarea.data('empty', true);
			
		}
		return false;
	})

	$('.elrte_default textarea').elrte();
	
	
	//$('body').decorateContainedSelects();
})


// -------------------------------------------------

function topicAdding(){
	var div = $('#add_topic_form'), 
		form = div.closest('form'),
		input = $('#new_topic', div),
		button = $('button', div);

	
	button.click(function(e){
		var title = input.val(); 
		if (title == '') {
			return false;
		}
	})
	
}




$.fn.checkbox_toggle = function() {
	if (this.attr('checked')) {
		this.removeAttr('checked');
	} else {
		this.attr('checked', 'checked');
	}
}


// ------------ Folder-edit page scripts ------- 

function folder_edit_scripts(urls) {

	var box = $('.photos .items'),
		items = $('.item', box),
		inputs = $('.item input:checkbox', box),
		//cover_button = $("#set_as_cover"), //nb to kill
		cover_buttons = $(".cover_button", items),
		move_button = $("#move_to_folder"),
		delete_button = $("#delete_photos"),
		throbber_options = {
						backgroundColor: 'rgba(255, 255, 255, 0.7)',
						position: 'absolute',
						zIndex: 2,
						top: 0,
						height: 0,
						width: '100%',
						height: '100%'
					};		

	var csrf = $('input[name=csrfmiddlewaretoken]').val();
			
	//console.log(csrf);
	
	//items.click(set_buttons);
	inputs.change(set_buttons);
	
	box.sortable({
		cancel: '.panel',
		deactivate: sortPhotos
	});
	
	
	
	move_button
		.button({icons: {primary: "ui-icon-folder-open"}})
		.click(get_folders_list);
	

	cover_buttons
		.click(set_cover);
		
	delete_button.
		button()
		.click(image_mass_delete);
		
	
	inputs
		.button()
		.removeAttr('checked')
		.button('refresh');
		
	
	set_buttons();
	

	function sortPhotos(e, ui) {
		
		var	photos = box.children(), 
			photos_array = [];
			
		photos.each(function(i, n){
			var pk = n.id.split('_')[1]
			photos_array.push(pk);
		});
		
		$.post(urls.sorting_url, {order: photos_array}, function(data){
//			console.log('ok')
		})
	}
	
// Enable/disable buttons as there is correct number of checked photos	
	function set_buttons(){
		var checked = get_checked().inputs
		if (checked.length < 1) {
			delete_button.button('disable');
			move_button.button('disable');
		} else {
			delete_button.button('enable');
			move_button.button('enable');
		}	

	}
		
	
// Returns checked photos - items and inputs
	function get_checked() {
		var checked = {};
		checked.items = items.has('input:checked');
		checked.inputs = $('input', checked.items);
		checked.ids = [];
		checked.cover = checked.items.filter('.cover').length > 0;
		
		checked.inputs.each(function(i,input){
				var photo_id = $(input).attr('name').split('_')[1];
				checked.ids.push(photo_id);			
			
		});	
		
		return checked
	}

	$.fn.customDelete = function(){
		var items = this,
			folder = $(items[0]).closest('.photos');
		items.effect('explode', function(){
			$(this).remove();
			set_buttons();
			if (!folder.is(':has(.item)')) {
				folder.remove();
			}
		});
	}
	

// Mass delete selected images
	
	function image_mass_delete(e) {
		var checked = get_checked();
		$.post(urls.delete_url, {csrfmiddlewaretoken: csrf, photos: checked.ids}, function(data){
			if (data.status=='success') {

				if (checked.cover) {
					location.href = location.href;					
				} else {				
					checked.items.customDelete();
				}
			}
		});
	}
	
	
// Get folders list	
	function get_folders_list() {
		
		var	button = $(this);
	
		if (button.data('foldersList')){
			button.data('foldersList').show()
			return false
		}
			
		coords = move_button.offset()		
	
		var list = $('<div/>')
				.addClass('folder-edit_folder-list')
				.addClass('throbber')
				.css({
						left: coords.left,
						bottom: $('body').height() - coords.top + 5
					})
				.mouseleave(function(){list.hide()})
				.appendTo('body');
		button.data('foldersList', list);
		
		$.get(urls.migrate_url, {exclude_folder: urls.current_folder_pk}, function(data){
				list.removeClass('throbber');
				list.html(data);
	
				$('.item', list).click(move_photos)
									
			});
	}
	

	
// Move selected photos to other folder
	function move_photos() {
		
		var checked = get_checked(), 
			target_folder_id = this.id.split('_')[1],
			list = $(this).closest('.folder-edit_folder-list');

		list.addClass('has_throbber');
		
		$.post(urls.migrate_url, {csrfmiddlewaretoken: csrf, photos: checked.ids, folder: target_folder_id}, function(data){
				
				if (checked.cover) {
					location.href = location.href;					
				} else {
					list.removeClass('has_throbber');
					list.hide();
					checked.items.customDelete();	
				}
				
			})
	}

// Set selected photo as folder's cover
	function set_cover(e) {
		e.preventDefault();
		
		var url = this.href,
			button = $(this),
			item = button.closest('.item'),
			pk = item.attr('id').split('_')[1];

		var throbber = $('<span/>')
				.addClass('throbber')
				.css(throbber_options)
				.appendTo(item);
		
		//button.button('disable');
		move_button.button('disable');

		$.post(url, {csrfmiddlewaretoken: csrf}, function(data){
			throbber.remove();
			if (data.status == 'success') {
				
				cover = items.filter('.cover')
				if (cover.length>0) {
					cover.removeClass('cover');
					item.addClass('cover');
					urls.cover_image.reload();	
				} else {
					location.href = location.href;
				}
				
				
			}
			}); 

	}


}

// -------------------------------------------------


$.fn.add_image_button = function() {
	
	this.click(function(e){
			e.preventDefault();
			var url = this.href,
				div = $('<div/>')
						.dialog({
								autoOpen: false,
								modal: true,
								resizable: false,
								title: 'Загрузка изображения'
							})
			$.get(url, {ajax: true}, function(data){
					div.html(data).dialog('open');
				});
			
		})

}		





/*
 * Украшает все селекты, содержащиеся в коллекции, от которой было вызвано
 */
$.fn.decorateContainedSelects = function() {
	
	var container = this;
	
	selects = $('select', container);

	/*
	if (typeof(forced) == 'undefined' || forced == false) {
		selects = selects.not('.ugly');
	}
	*/
	$.ech.multiselect.prototype.options.minWidth = 'auto';
	$.ech.multiselect.prototype.options.position = {my: 'top', at: 'bottom'};
	
	/*
	 * Лютый костыль, перекладывающий виджет из body в контейнер селекта и отключающий position: fixed
	 * Причина -- диковатое поведение при скролле 
	 */
	
	/*
	$.ech.multiselect.prototype.options.create = function(event, ui){
		//return false;
		var source = $(this),
		 	widget = source.multiselect('widget'),
		 	box = $(source.parents()[0]),
		 	wrapper,
		 	notNeeded;
		
		source.parents().each(function(i, node){
			
			var $node = $(node),
				inPopup = $node.hasClass('ui-dialog'),
				inPaging = $node.hasClass('paging');
		//	console.log(node, d)
			if (inPopup || inPaging) {
				notNeeded = true;
			}
		});
		
		if (notNeeded) {
			//Если исходный селект в попапе или пейджинге, ничего никуда переносить не надо, поскольку возможны странности
			return false;
		}
		
		
		if (box.is('td') || box.is('th')) {
			wrapper = $('<span class="wrapper"/>');
			box.wrapInner(wrapper);
			//console.log('td');
		} else {
			wrapper = box;
			//console.log('not td');
		}
		if (wrapper.css('position') == 'static') {
			wrapper.css({
				position: 'relative'
			});
		}
		widget.detach();
		widget.insertAfter(source);
		widget.css({
			position: 'absolute',
			left: 0,
			top: 0
		});
	}
	*/
	
	
	
	
	selects.filter("[multiple='multiple']").each(function(i, select){
		$(select).multiselect({
		minWidth: 'auto', 
		  checkAllText: 'Всё',
		  uncheckAllText: 'Всё',
		  noneSelectedText: "", //Иначе начинаются косяки с одиночными селектами
		  selectedList: 3   //selectetText почему-то игнорит этот параметр, срабатывая всегда
	  });
	});
			
	selects.not("[multiple='multiple']").each(function(i, select){
		$(select).multiselect({
		  minWidth: 'auto',
		  header: false,
		  selectedList: 1,
		  noneSelectedText: "", //Иначе начинаются косяки с одиночными селектами
		  multiple: false
	  });
	});
	
	return container;
};
