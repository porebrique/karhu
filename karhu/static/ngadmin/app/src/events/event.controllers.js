'use strict';
(function(ng){
	
var mdl = ng.module('EventModule');

mdl.controller('Events.ListCtrl', ['$scope', 'Event', 'Env', function($scope, Event, Env){

	$scope.resource = Event;
	$scope.rows = [];
	$scope.itemsPerPage = 10;

	/*
	$scope.selectitems = ['first', 'second', 'third']
	$scope.selected = ''
	$scope.setSelected = function(item){
		$scope.selected = item;
	}
	*/
	//Data.getCustomers().success(parseCustomers);
	
	Env.getEnv(['agents', 'somethingelse'], function(response){
		//$scope.agents = response.agents
		
		$scope.filterSettings = {
				resource: Event,
				onSubmit: updateEventList,
				//collection: $scope.rows,
				fields: [
				         /*
		 		{	label: 'Только дата',
					type: 'date',
					mapsTo: 'ignore_this_date'
				},*/
/*				
				{	label: 'Только время',
					type: 'time',
					mapsTo: 'ignore_this_time'
				},*/
		 		{	label: 'Дата, от',
					type: 'datetime',
					mapsTo: 'from_dt'
				},				         
		 		{	label: 'Дата, до',
					type: 'datetime',
					mapsTo: 'to_dt'
				},
				{	label: 'Тип',
					type: 'text',
					mapsTo: 'type_name'
				},
				{label: 'Объект',
					type: 'text',
					mapsTo: 'object_name'
				},
				{label: 'Агент',
					type: 'select',
					mapsTo: 'agent',
					options: response.agents
				}		
				]
			}		
	})
	

	function updateEventList(args){
		Event.query(args, function(response) {
			$scope.rows.length = 0
			$scope.rows = response.collection
		});			
		
	}
	
	/*
	function getBlankFilterData(){
		return {
			from_dt: null,
			to_dt: null,
			type_name: null,
			object_name: null,
			agent: null
		}
	}	 * 
	
	$scope.filter = {
		data: getBlankFilterData(),
		reset: function(){ 
			ng.extend($scope.filter.data, getBlankFilterData()); 
			var args = {limit: $scope.itemsPerPage};
			updateEventList(args);
		},
		isEmpty: function(){ 
			return ng.equals($scope.filter.data, getBlankFilterData()) 
		},
		sendRequest: function(){
			var args = ng.copy($scope.filter.data);
			args.limit = $scope.itemsPerPage;
			updateEventList(args);
		}		
	}
	*/
	
	
	
	
}])


/*
mdl.controller('ListCtrl', ['$scope', 'Event', function($scope, Event){
	$scope.itemResource = Event;
	$scope.events = Event.data
	$scope.$watch(function(){return Event.data}, function(update){
		$scope.events = update
	})
	
}]);


mdl.controller('ListFilterCtrl', ['$scope', 'Event', function($scope, Event){
	
	var filter = {
			data: null
	}
	
	filter.reset = function(){ filter.data = null }
	filter.isEmpty = function(){ return ng.equals(filter.data, null) }
	filter.sendRequest = function(){ Event.refresh({filter: true}) }

	$scope.filter = filter;
	
}]);

*/
	
})(angular)
