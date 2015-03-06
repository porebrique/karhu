/*global angular, console */
(function (ng) {
    'use strict';
    
    var mdl = ng.module('EventsModule');

    function EventsListCtrl($scope, $state, Event, resolvedData) {
        
        $scope.events = resolvedData;
        
    }

    function EventCtrl($scope, $state, Event, resolvedData) {
        
        
        $scope.save = function () {
            $scope.is.saving = true;
            return Event.save($scope.event)
                .then(function (response) {
                    $scope.is.saving = false;
//                    if ($scope.event.id) {
//                        $scope.event = response;
//                        $state.go('events.list');
//                    } else {
//                        $state.go('events.event', {event_id: response.id});
//                    }
                    $state.go('events.list');
                });
        
        };
        
        $scope.deleteEvent = function () {
            $scope.is.deleting = true;
            return Event.remove($scope.event)
                .then(function (response) {
                    $scope.is.deleting = false;
                    $state.go('events.list');
                });
        };
        
        $scope.is = {
            saving: false,
            deleting: false
        };
        
        $scope.event = resolvedData;
        
        if (!$scope.event.id && $state.current.name === 'events.event') {
            $state.go('events.list');
        }
        
        
    }
    
    mdl.controller('EventsListCtrl',
                   ['$scope', '$state', 'Event', 'resolvedData', EventsListCtrl]);
    mdl.controller('EventCtrl',
                   ['$scope', '$state', 'Event', 'resolvedData', EventCtrl]);

}(angular));