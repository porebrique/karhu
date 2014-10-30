'use strict';
(function(ng){
	
var mdl = ng.module('PageletsModule');

mdl.controller('PageletsListCtrl', ['$scope', 'Slot', 'Pagelet', function($scope, Slot, Pagelet){
	
	$scope.slots = Slot.query();
	$scope.pagelets = Pagelet.query();
	
	
	$scope.marked = {
			pagelet: null,
			slot: null
	}
	
	$scope.highlightPagelet = function(p) {
		$scope.highlighted_pagelet = p.id;	
	}
	
	
	
}]);



mdl.controller('PageletsPageletCtrl', ['$scope', '$state', '$stateParams', 'Slot', 'Pagelet', function($scope, $state, $stateParams, Slot, Pagelet){
	
	
		
	$scope.pagelet = $stateParams.pagelet_id ?  Pagelet.get({id: $stateParams.pagelet_id}) : $scope.pagelet = new Pagelet();
	
	$scope.save = function(){
		$scope.pagelet.$save().then(function(response){
			//ng.extend($scope.pagelet, response)
			$state.go('pagelets.list')
		});
	};
	
	$scope.delete = function(){
		$scope.pagelet.$delete()
		.then(function(){
			$state.go('pagelets.list');
		});		
	};
	
}]);

	


mdl.controller('PageletsSlotCtrl', ['$scope', '$state', '$stateParams', 'Slot', 'Pagelet', function($scope, $state, $stateParams, Slot, Pagelet){
	
	$scope.available_pagelets = Pagelet.query();
	
		
	$scope.slot = $stateParams.slot_id ?  Slot.get({id: $stateParams.slot_id}) : $scope.slot = new Slot();
	
	$scope.save = function(){
		
		$scope.slot
			.$save()
			.then(function(response){
				//console.log('saved', response)
				//ng.extend($scope.slot, response);
				$state.go('pagelets.list');
				
			})
		
	};
	$scope.delete = function(){
		$scope.slot.$delete()
			.then(function(){
				$state.go('pagelets.list');
			});
		
	};
	
}]);

	
})(angular)
