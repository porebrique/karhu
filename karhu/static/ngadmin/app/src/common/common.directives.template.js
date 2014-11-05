'use strict';
(function(ng){
	
var mdl = ng.module('CommonModule');

/*
 * Usage: <button spinner-on="isSaving">original content</button>
 * isSaving: boolean
 * original content may be either plain text or html 
 */
mdl.directive('spinnerOn', ['APP_ROOT_FOLDER',  function(ROOT){

	return {
		restrict: 'A',
		scope: {
			condition: '=spinnerOn'
		},
		link: function($scope, elt, args) {

			var spinner = ng.element('<span class="spinner"/>')
							.css('opacity', 0);
			var originalContent = ng.element('<span/>')
											.first()
											.html(elt.html());
			elt.html(spinner)
			elt.append(originalContent)

			$scope.$watch(function(){return $scope.condition}, function(newValue){
				if (newValue === true) {
					spinner.css('opacity', 1);
					originalContent.css('opacity', 0);
				} else if (newValue === false) {
					spinner.css('opacity', 0);
					originalContent.css('opacity', 1);
				}
				
			});
		}
		
	}
}]);


/*
 * Usage: <image-placeholder  width="$scope.width" height="$scope.height" [fontsize="scope.fontsize"] />
 * fontsize is optional and controls glyphicon size
 */
mdl.directive('imagePlaceholder', ['APP_ROOT_FOLDER',  function(ROOT){

	return {
		restrict: 'E',
		template:   '<span class="placeholder" style="width: {{size.width}}px; height: {{size.height}}px;">' +
					'<span class="glyphicon glyphicon-picture" style="font-size: {{size.font}}em; line-height: {{size.height}}px"></span></span>',
		scope: {
			fontsize: '=',
			height: '=',
			width: '='
		},
		link: function($scope, element) {
			
			$scope.size = {
					width: $scope.width,
					height: $scope.height
			}
			
			if ($scope.fontsize) {
				$scope.size.font = $scope.fontsize
			} else {
				$scope.size.font = 8
			}
			
		}
		
	}
}]);

/*
 * Usage: <help-button source="some_id"></help-button>
 * some_id is id of element containing help 
 */
mdl.directive('helpButton', ['$modal', 'APP_ROOT_FOLDER', '$sce',  function($modal, ROOT, $sce){
	var modalOptions = {
		templateUrl: ROOT +  'common/templates/modal-help.html'
	};

	return {
		restrict: 'E',
		template: '<span class="helpbutton"><span class="glyphicon glyphicon-question-sign"></span></span>',
		scope: {
			source: '@'
		},
		link: function($scope, element) {
			
			var help_html = ng.element('#' + $scope.source);
			
			$scope.help_html = $sce.trustAsHtml(help_html.html());
			
			
			element.click(function(){
				var modal = $modal.open({
					templateUrl: ROOT +  'common/templates/modal-help.html',
					scope: $scope
				});
				modal.result.then(function(result){
					console.log('closed!')
				})				
				
			})
			
		}
		
	}
}]);


mdl.directive('modalSort', ['$modal', 'APP_ROOT_FOLDER',  function($modal, ROOT){
	var modalOptions = {
		templateUrl: ROOT +  'common/templates/modal-sorting.html'
	}

	
	return {
		restrict: 'E',
		scope: {
			sourceItems: '=items',
			map: '=',
			buttontext: '@'
		},
		template: '<button type="button" class="btn btn-primary"><span class="glyphicon glyphicon-sort"></span>{{buttontext}}</button>',
		//templateUrl: ROOT +  'common/templates/modal-sorting.html',
		link: function($scope, element) {
			
			function updateOrder(){
				ng.forEach($scope.items, function(item, index){
					console.log(item.text, item.order,  index)
				})
			}
			
			function getMappedItems() {
				var mappedItems = [];
				ng.forEach($scope.sourceItems, function(item, a){
					console.log(item, a);
					mappedItems.push({
						id: item.id,
						text: item.name,
						order: item.order
					})
				})
				return mappedItems;
			}

			var sortableOptions = {
					update: updateOrder,
					helper: 'clone',
					axis: 'y'
			}			
			$scope.sortableOptions = sortableOptions;
			
			element.click(function(){
				$scope.items = getMappedItems();
				var modal = $modal.open({
					templateUrl: ROOT +  'common/templates/modal-sorting.html',
					controller: function(){},
				    scope: $scope				
					
				});
				
				modal.result.then(function(result){
					console.log('closed!')
				})
			})
		}
	}
	
}]);

/*
 * Usage: <button confirmable-click="methodToBeConfirmed()"></button>
 */
mdl.directive('confirmableClick', ['$modal', 'APP_ROOT_FOLDER',  function($modal, APP_ROOT_FOLDER){
	
	var modalOptions = {
			size: 'sm',
	        templateUrl: APP_ROOT_FOLDER +  'common/templates/confirmation.html'
	}
	
	return {
		restrict: 'A',
		scope: {
			//action: '=' // for action="someFunction"
			//action: '&' //for action="someFunction()"
			action: '&confirmableClick'
		},
		link: function($scope, element, attrs) {
			var popup;
			element.click(function(event){
				popup = $modal.open(modalOptions);
			    popup.result.then(function (result) {
			    	$scope.action();  
			    	//console.log('confirmed!', result)
				    }, function (reason) {/* dismiss */});
			})

		}
	}
}])	


/*
 * $scope.resolvedConfig comes from parent RootCtrl's scope
 */
mdl.directive('navigationMenu', ['APP_ROOT_FOLDER', function(APP_ROOT_FOLDER){

	return  {
		restrict: "E",
		//template: '<div>config: {{config}} <br/></div>',
		templateUrl: APP_ROOT_FOLDER + 'templates/nav.html',
		link: function($scope) {
			
			$scope.config = $scope.resolvedConfig
			
			var buttons = [
			               {icon: 'home', sref: 'home'},
			               {icon: 'usergroup', sref: 'lineup.list'},
			               {icon: 'musicnote', sref: 'music.list'},
			               {icon: 'photos', sref: 'gallery'},
			               {icon: 'calender', sref: 'events'},
			               {icon: 'write', sref: 'blog.list'},
			               {icon: 'copydocument', sref: 'pagelets.list'}
			               ]
			$scope.buttons = buttons;
			
		}
	}
}]);

mdl.directive('globalThrobber', ['_START_REQUEST_', '_END_REQUEST_', function (_START_REQUEST_, _END_REQUEST_) {
	    return {
	        restrict: "E",
	        template: '<div class="page-throbber"></div>',
	        link: function (scope, element) {
		            element.hide();
		            scope.$on(_START_REQUEST_, function () {
		                element.show();
		            });
	
		            scope.$on(_END_REQUEST_, function () {
		                element.hide();
		            });
	        }
	    };
	}]);
	

})(angular);
