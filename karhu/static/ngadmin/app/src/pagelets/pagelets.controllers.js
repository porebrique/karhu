/*global angular, console */
(function (ng) {
    'use strict';

    var mdl = ng.module('PageletsModule');
    mdl.controller('PageletsListCtrl', ['$scope', 'Slot', 'Pagelet', 'resolvedData',
        function ($scope, Slot, Pagelet, resolvedData) {

            var pagelets = resolvedData[0],
                slots = resolvedData[1];

            ng.forEach(slots, function (slot) {
                ng.forEach(pagelets, function (pagelet) {
                    if (slot.pagelet === pagelet.id) {
                        slot.pagelet = pagelet;
                    }
                });
            });
            $scope.pagelets = pagelets;
            $scope.slots = slots;
            

            $scope.marked = {
                pagelet: null,
                slot: null
            };

            $scope.highlightPagelet = function (p) {
                $scope.highlighted_pagelet = p.id;
            };

        }]);




    mdl.controller('PageletsPageletCtrl', ['$scope', '$state',  'Slot', 'Pagelet', 'resolvedData',
        function ($scope, $state, Slot, Pagelet, resolvedData) {

            $scope.pagelet = resolvedData;
            
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
//                            console.log(response);
                            form.$setPristine();
                            //form.$setUntouched();
//                            $scope.pagelet = response;
                            $scope.is.saving = false;
                            if ($scope.pagelet.id) {
//                                console.log('id', $scope.pagelet.id);
                                $scope.pagelet = response;
                            } else {
//                                console.log('no id', $scope.pagelet.id);
                                $state.go('pagelets.pagelet', {pagelet_id: response.id});
                            }
//                            $state.go('pagelets.list');
                        });
                }
            };

            $scope.deletePagelet = function () {
                $scope.is.deleting = true;
                Pagelet
                    .remove($scope.pagelet)
                    .andGo('pagelets.list');
            };
//            $scope.toolbar = [
//                ['h1', 'h2', 'h3', 'p'],
//                ['bold', 'italics', 'underline'],
//                ['ul', 'ol'],
//                ['justifyLeft', 'justifyCenter', 'justifyRight'],
//                ['insertImage', 'insertLink'],
//                ['html']
//
//            ];

        }]);


    mdl.controller('PageletsSlotCtrl', ['$scope', '$state', 'Slot', 'Pagelet', 'resolvedData',
        function ($scope, $state, Slot, Pagelet, resolvedData) {
        
        
            $scope.remove = function () {
                Slot
                    .remove($scope.slot)
                    .andGo('pagelets.list');
            };

            $scope.save = function () {
                if ($scope.local.selectedPagelet) {
                    $scope.slot.pagelet = $scope.local.selectedPagelet.id;
                }
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

            $scope.available_pagelets = resolvedData[0];
            $scope.slot = resolvedData[1];

            ng.forEach($scope.available_pagelets, function (item) {
                if (item.id === $scope.slot.pagelet) {
                    $scope.local.selectedPagelet = item;
                }
            });


        }]);
	


}(angular));