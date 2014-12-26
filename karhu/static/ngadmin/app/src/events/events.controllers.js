/*global angular, console */
(function (ng) {
    'use strict';
    
    var mdl = ng.module('EventsModule');

    function EventsListCtrl($scope, $state, Event, resolvedData) {
        
       //console.log('from ctrl', resolvedData);
        
        $scope.events = resolvedData;
        /*
        Event.getList()
            .then(function (response) {
                $scope.events = response;
            });
            */
    }

    function EventCtrl($scope, $state, Event, resolvedData) {
        
        //var event_id = $stateParams.event_id;
        
        //console.log('ctrl', resolvedData);
        
        $scope.save = function () {
            $scope.is.saving = true;
            Event.save($scope.event)
                .then(function (response) {
                    $scope.is.saving = false;
                    if ($scope.event.id) {
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
        $scope.toolbar = [
            ['h1', 'h2', 'h3', 'p'],
            ['bold', 'italics', 'underline'],
            ['ul', 'ol'],
            ['justifyLeft', 'justifyCenter', 'justifyRight'],
            ['insertImage', 'insertLink'],
            ['html']
            
        ];
        $scope.event = resolvedData;
        /*
        Event.getOne(event_id)
            .then(function (response) {
                $scope.event = response;
            });
        */
        
    }
    
    mdl.controller('EventsListCtrl',
                   ['$scope', '$state', 'Event', 'resolvedData', EventsListCtrl]);
    mdl.controller('EventCtrl',
                   ['$scope', '$state', 'Event', 'resolvedData', EventCtrl]);

}(angular));