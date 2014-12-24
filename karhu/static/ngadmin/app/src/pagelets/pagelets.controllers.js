/*global angular, console */
(function (ng) {
    'use strict';

    var mdl = ng.module('PageletsModule');
    mdl.controller('PageletsListCtrl', ['$q', '$scope', 'Slot', 'Pagelet',
        function ($q, $scope, Slot, Pagelet) {

            $q.all([Pagelet.getList(), Slot.getList()])
                .then(function (response) {
                    $scope.pagelets = response[0];
                
                
                    $scope.slots = response[1];
                
                    ng.forEach(response[1], function (slot) {
                        ng.forEach(response[0], function (pagelet) {
                            if (slot.pagelet === pagelet.id) {
                                slot.pagelet = pagelet;
                            }
                        });
                    });
                });


            $scope.marked = {
                pagelet: null,
                slot: null
            };

            $scope.highlightPagelet = function (p) {
                $scope.highlighted_pagelet = p.id;
            };

        }]);




    mdl.controller('PageletsPageletCtrl', ['$scope', '$state', '$stateParams', 'Slot', 'Pagelet',
        function ($scope, $state, $stateParams, Slot, Pagelet) {

            var pagelet_id = $stateParams.pagelet_id;
            
            Pagelet
                .getOne(pagelet_id)
                .then(function (response) {
                    $scope.pagelet = response;
                });

            
            $scope.is = {
                saving: false,
                deleting: false
            };
            
            $scope.save = function (form) {
                if (form.$valid) {
                    $scope.is.saving = true;
                    Pagelet
                        .save($scope.pagelet)
                        .then(function (response) {
                            form.$setPristine();
                            //form.$setUntouched();
                            $scope.pagelet = response;
                            $scope.is.saving = false;
                            $state.go('pagelets.list');
                        });
                }
            };

            $scope.deletePagelet = function () {
                $scope.is.deleting = true;
                Pagelet
                    .remove($scope.pagelet)
                    .andGo('pagelets.list');
            };

        }]);


    mdl.controller('PageletsSlotCtrl', ['$scope', '$state', '$q', '$stateParams', 'Slot', 'Pagelet', function ($scope, $state, $q, $stateParams, Slot, Pagelet) {
        
        var slot_id = $stateParams.slot_id;
        
        $scope.remove = function () {
            Slot
                .remove($scope.slot)
                .andGo('pagelets.list');
        };
        
        $scope.save = function () {
            $scope.slot.pagelet = $scope.local.selectedPagelet.id;
            $scope.is.saving = true;
            Slot
                .save($scope.slot)
                .then(function (response) {
                    $scope.slot = response;
                    $scope.is.saving = false;
                    $state.go('pagelets.list');
                });
        };
        
        $scope.deleteSlot = function () {
            $scope.is.deleting = true;
            Pagelet
                .remove($scope.slot)
                .andGo('pagelets.list');
        };

        $scope.local = {};
        $scope.is = {saving: false, deleting: false};
        
        $q.all([Pagelet.getList(),
                Slot.getOne(slot_id)])
            .then(function (response) {
                $scope.available_pagelets = response[0];
                $scope.slot = response[1];
                
                ng.forEach($scope.available_pagelets, function (item) {
                    if (item.id === $scope.slot.pagelet) {
                        $scope.local.selectedPagelet = item;
                    }
                });
            
            });

    }]);
	


    /*



mdl.controller('PageletsPageletCtrlOld', ['$scope', '$state', '$stateParams', 'Slot', 'Pagelet', function($scope, $state, $stateParams, Slot, Pagelet){
	
	
		
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

	


mdl.controller('PageletsSlotCtrlOld', ['$scope', '$state', '$stateParams', 'Slot', 'Pagelet', function($scope, $state, $stateParams, Slot, Pagelet){
	
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

*/

}(angular));