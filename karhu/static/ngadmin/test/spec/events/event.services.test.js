/*global describe, beforeEach, module, it, inject, expect, angular, console */
describe("Calendar", function () {
    'use strict';
    var $httpBackend, Event, singleEvent,
        sampleEvent = {id: 1, title: 'Event title'};

    
    beforeEach(module('App'));
    beforeEach(module('stateMock'));
    
    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        
        Event = $injector.get('Event');
        $httpBackend.when('GET', Event.baseUrl).respond([sampleEvent]);
        $httpBackend.when('GET', Event.baseUrl + sampleEvent.id + '/').respond(sampleEvent);

    }));
    

    describe('Event resource', function () {
        it('should request existing event from server', function () {
            Event.getOne(sampleEvent.id)
                .then(function (response) {
                    singleEvent = response;
                    
                    expect(singleEvent.id).toEqual(1);
                });
            $httpBackend.flush();
        });
        
        
    
    });
    
});