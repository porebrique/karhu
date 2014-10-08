'use strict';
(function(ng){
	
var mdl = ng.module('CommonModule');


mdl.directive('formFilter', ['APP_ROOT_FOLDER', function(ROOT){
	return {
		restrict: 'E',
		templateUrl: ROOT + 'common/templates/form-list-filter.html',
		scope: {
			settings: '=',
			collection: '='
		},
		link: function(scope, element, args) {
			scope.fields = scope.settings.fields;

			ng.forEach(scope.fields, function(field, i){
				switch(field.type) {
					case 'text':
						field.initialValue = '';
						break;
					case 'date':
						field.initialValue = null;
						break;
					case 'time':
						field.initialValue = null;
						break;
					case 'datetime':
						field.initialValue = null;
						break;						
					case 'select':
						//field.initialValue = null;
						field.initialValue = {id: null, name: 'Выберите...'}
						break;
					default: 
						break;
						
				}
				field.value = field.initialValue;
			});
			
			scope.isEmpty = function(){
				var result = true;
				ng.forEach(scope.fields, function(item){
					if ( item.value != item.initialValue) {
						result = false;
					}
				});		
				return result;
			}
			
			
			function updateCollection(args){
				scope.settings.resource.query(args, function(response) {
					/*
					console.log(scope.settings.collection)
					scope.settings.collection.length = 0;
					scope.settings.collection = response.collection
					console.log('After', scope.settings.collection)
					*/
					console.log(scope.collection)
					scope.collection.length = 0;
					scope.collection = response.collection
					console.log('After', scope.collection)					
				});			
			}
			
			scope.resetForm = function(){
				ng.forEach(scope.fields, function(field){
					field.value = field.initialValue;
				});
				var args = getMappedFields();
				scope.settings.onSubmit(args)
			}
			
			function getMappedFields(){
				var m = {};
				ng.forEach(scope.fields, function(item){
					if ( item.value != item.initialValue) {
						
						if (item.type === 'select') {
							m[item.mapsTo] = item.value.id;
						} else {
							m[item.mapsTo] = item.value;	
						}
						
					}
				});
				return m;
			}
			
			scope.sendRequest = function() {
				var args = getMappedFields();
				//console.log('args:',  args)
				//updateCollection(args)
				scope.settings.onSubmit(args)
			}
			
			
		}
	}
	
}]);

/*
 * <form-dropdown options="field.options" model="field.value"></form-dropdown> 
 * options должно быть списком [{id: 42, name: 'some text'}]
 * Value будет одним из элементов этого списка
 * 
 */

mdl.directive('formDropdown', ['APP_ROOT_FOLDER', function(ROOT){
	return {
		restrict: 'E',
		templateUrl: ROOT + 'common/templates/dropdown.html',
		scope: {
			model: '=',
			options: '='
		},
		link: function($scope, element){
			$scope.initialValue = $scope.model;
			$scope.reset = function() {
				ng.extend($scope.model, $scope.initialValue);
			}
			$scope.setSelected = function(item) {
				$scope.selectedText = item.name;
				$scope.model = item;
			}
			
			}
		}
}]);

/*
 * <form-datetimepicker datetimemodel="field.value">
 * 
 */

mdl.directive('formDatetimepicker', ['APP_ROOT_FOLDER', function(ROOT){
	return {
		restrict: 'E',
		templateUrl: ROOT + 'common/templates/datetimepicker.html',
		scope: {
			datetimemodel: '='
		},
		link: function($scope, element, args) {
			
			$scope.dp = {opened: false};
			$scope.datepickerIsOpen = false;
			$scope.open = function(event) {
				event.stopPropagation();
				$scope.datepickerIsOpen = true
			  };
			
			$scope.datetime = {
				date: null,
				time: new Date()
			}
			
			$scope.datetime.time.setHours(0);
			$scope.datetime.time.setMinutes(0);
			
			$scope.dateSet = function() {
				return ng.isDate($scope.datetime.date) ? true:false;
			} 
			
			$scope.$watch(function(){return $scope.datetime.date}, function(newValue){
				compileDatetime(); 
			});
			
			$scope.$watch(function(){return $scope.datetime.time}, function(newValue){
				compileDatetime(); 
			});
			
			function compileDatetime() {
				if ($scope.dateSet()) {
					//console.log('compiling datetime from ', $scope.datetime.date, $scope.datetime.time)
					var d = $scope.datetime.date,
						h = $scope.datetime.time.getHours(),
						m = $scope.datetime.time.getMinutes();
					d.setHours(h);
					d.setMinutes(m);
					$scope.datetimemodel = d.getTime();
				} else {
					$scope.datetimemodel = null;
				}
			}
			
		}
	}
}]);

/*
 * Бросил, поскольку сомневаюсь, что оно вообще нужно без даты
 */
mdl.directive('formTimepicker', ['APP_ROOT_FOLDER', function(ROOT){
	
	return {
		restrict: 'E',
		templateUrl: ROOT + 'common/templates/timepicker.html',
		scope: {
			timemodel: '='
		},
		link: function(scope, element, args) {
			var d = new Date();
			
			//console.log(scope.timemodel)
			scope.time = {
				display: new Date()
			}
			scope.time.display.setHours(0);
			scope.time.display.setMinutes(0);
			
			scope.changed = function() {
				//scope.time.target = moment(scope.time.display).unix();
				scope.timemodel = moment(scope.time.display).unix();
				//console.log('changed, value is', scope.time.value)
			}
		}
	}
}])

/*
 * <form-datepicker datemodel="field.value"></widget-datepicker>
 *
 */
mdl.directive('formDatepicker', ['APP_ROOT_FOLDER', function(ROOT){
	return {
		restrict: 'E',
		templateUrl: ROOT + 'common/templates/datepicker.html',
		scope: {
			datemodel: '='
		},
		controller: function($scope) {
			$scope.dp = {opened: false};
			$scope.open = function(event) {
			   // event.preventDefault();
			   event.stopPropagation();
			    $scope.dp.opened = true;
			  };
		}, 
		link: function(scope, element, args, ctrl) {
			scope.date = scope.datemodel;
			//scope.dateParsed = null
			scope.$watch(function(){return scope.date}, function(newValue){
				if (ng.isDate(newValue)) {
					//scope.datemodel = moment(newValue).unix();
					scope.datemodel = newValue.getTime()
					//scope.dateParsed = moment(newValue).toString('DD.MM.YYYY')
				} else {
					scope.datemodel = null;
				}
			})
		}
	}
	
}])



})(angular);
