'use strict';
(function(ng){
	
var mdl = ng.module('CommonModule');

/*
 *
 * <widget-pagination
 *  items="rows"   -> [] 
 * 	resource="resource" - > должен иметь метод .query, возвращающий коллекцию (или объект с коллекцией, недоработано)
 *	itemsperpage="itemsPerPage" -> размер страницы
 *	filterparams="filter.data"  -> объект параметров, передаваемых в .query вместе с параметрами пагинации
 *
 */
mdl.directive('widgetPagination', ['APP_ROOT_FOLDER', function(ROOT){
	return {
		restrict: 'E',
		scope: {
			items: '=',
			resource: '=',
			itemsperpage: '=',
			filterparams: '='
		},
		templateUrl : ROOT + 'common/templates/pagination.html',
		link: function(scope) {
			
			//console.log(scope.resource)
			
			//console.log(scope.itemsperpage, scope.filterparams)
			scope.itemsPerPage = scope.itemsperpage;
			scope.currentPage = 0;
			scope.isInfinite = true //whether or not it is possible to go on specific page
			
			
			scope.prevPage = function(){
				if (scope.currentPage > 0) {
					scope.currentPage--;
				}
			}
			
			scope.prevPageDisabled = function(){
				return  scope.currentPage === 0
			}
			
			scope.nextPage = function(){
				if (scope.isInfinite || scope.currentPage < scope.pageCount() - 1) {
					scope.currentPage++;
				}
			}
			scope.nextPageDisabled = function(){
				//console.log(!scope.isInfinite)
				return !scope.isInfinite || scope.currentPage === scope.pageCount() - 1;
			}
			
			scope.pageCount = function(){
				return Math.ceil(scope.total / scope.itemsPerPage);
			}
			
			scope.setPage = function(page){
				scope.currentPage = page
			}
			
			
			scope.$watch('currentPage', function(newValue){
				var args = {offset: newValue * scope.itemsPerPage, 
							limit: scope.itemsPerPage		
				}
				ng.extend(args, scope.filterparams)
				var request = scope.resource.query(args);
				
				request.$promise.then(function(answer){
					//console.log(answer.length)
					scope.items.length = 0
					ng.extend(scope.items, answer.collection)
					
					if (answer.length === null) {
						scope.total = answer.length;
						scope.isInfinite = true
					} else {
						scope.isInfinite = false
					}
					/*
					scope.isInfinite = false;
					scope.total = 10
					*/
				})
			})
			
		}
			
	}
	
}])

/* SIMPLE TABLE DIRECTIVE
 * Usage: <simple-table rows="scope.array" columns="[col1, col2]"/>
 * column item can be simple string with column's name
 * or object {name: 'Awesome column', css: 'width: 100px', klass: 'classy messy awesome'}
 * Note "klass", not "class" and remember about " and ' in argument's value
 */
mdl.directive('simpleTable', ['$parse', 'APP_ROOT_FOLDER', function($parse, APP_ROOT_FOLDER){
	
	return  {
		restrict: 'E',
		templateUrl : APP_ROOT_FOLDER + 'common/templates/simple-table.html',
		scope: {
			columns: '=',
			rows: '=',
			pagination: '='
		},
		link: function(scope, elt, args) {
			
			var parsedColumns = []
			ng.forEach(scope.columns, function(item){
				var c = {}
				c.text = item.text || item;
				c.klass = item.klass || null;
				c.css = item.css || null;
				parsedColumns.push(c);
			});
			
			
			scope.parsedColumns = parsedColumns;
		}
		
	}
	
}])


})(angular);
