/*global angular, console */
(function (ng) {
    'use strict';
    
    var mdl = ng.module('EventsModule');

    mdl.controller('EventsListCtrl', ['$scope', '$state', 'Event', function ($scope, $state, Event) {
        $scope.test = 'test';
        
        Event.getList()
            .then(function (response) {
                $scope.events = response;
            });
        
    }]);
    
    
    mdl.controller('EventCtrl', ['$scope', '$state', '$stateParams', 'Event', function ($scope, $state, $stateParams, Event) {
        
        var event_id = $stateParams.event_id;
        
        $scope.save = function () {
            $scope.is.saving = true;
            Event.save($scope.event)
                .then(function (response) {
                    $scope.is.saving = false;
                    if (event_id) {
                        $scope.event = response;
                        $state.go('events.list');
                    } else {
                        $state.go('events.event', {event_id: response.id});
                    }
                });
        
        };
        
        $scope.deleteEvent = function () {
            $scope.is.deleting = true;
            Event.remove($scope.event)
                .then(function (response) {
                    $scope.is.deleting = false;
                    $state.go('events.list');
                });
        };
        
        $scope.is = {
            saving: false,
            deleting: false
        };
        
        Event.getOne(event_id)
            .then(function (response) {
                $scope.event = response;
            });
        
    }]);

}(angular));