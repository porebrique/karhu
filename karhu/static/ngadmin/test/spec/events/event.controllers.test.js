/*global describe, beforeEach, module, it, inject, expect, angular, console */
describe("Calendar", function () {
    'use strict';
    var $controller, $scope, $state, $httpBackend, Event,
        sampleEvent = {id: 1, title: 'Event title'};

    
    beforeEach(module('App'));
    beforeEach(module('stateMock'));
    
    beforeEach(inject(function ($injector) {
        $scope = $injector.get('$rootScope').$new();
        $controller = $injector.get('$controller');
        $httpBackend = $injector.get('$httpBackend');
        $state = $injector.get('$state');
        Event = $injector.get('Event');
    }));
    
    describe('EventCtrl', function () {
        beforeEach(function () {
            $httpBackend.when('GET', Event.baseUrl + sampleEvent.id + '/').respond(sampleEvent);
            
            $state.current = {name: 'blog.Event'};
            
            Event.getOne(sampleEvent.id)
                .then(function (response) {
                    $controller('EventCtrl', {$scope: $scope, resolvedData: response});
                });
            $httpBackend.flush();
        });
        
        it('should initially has Event with id 1', function () {
            expect($scope.event.id).toEqual(1);
        });
        
        it('should save Event, then clear is.saving flag and go to blog.list', function () {
            $httpBackend.when('PUT', Event.baseUrl + sampleEvent.id + '/').respond(sampleEvent);
            $state.expectTransitionTo('events.list');
//            console.log($scope.event, $scope.save);
            $scope.save()
                .then(function (response) {
                    expect($scope.is.saving).toBe(false);
                });
            $httpBackend.flush();
        });
        
        it('should send DELETE request, then clear is.deleting flag and go to blog.list', function () {
            $httpBackend.when('DELETE', Event.baseUrl + sampleEvent.id + '/').respond('deleted');
            $state.expectTransitionTo('events.list');
            $scope.deleteEvent()
                .then(function () {
                    expect($scope.is.deleting).toBe(false);
                });
            $httpBackend.flush();
        });
        
    });
    
    describe('EventListCtrl', function () {
        
        beforeEach(function () {
            $httpBackend.when('GET', Event.baseUrl).respond([sampleEvent]);
            Event.getList()
                .then(function (response) {
                    $controller('EventsListCtrl', {$scope: $scope, resolvedData: response});
                });
            $httpBackend.flush();
        });
    
        it('should has one Event with id "1"', function () {
            expect($scope.events.length).toEqual(1);
            expect($scope.events[0].id).toEqual(1);
        });
        

    });

    
    
    
});