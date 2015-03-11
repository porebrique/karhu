/*global describe, beforeEach, module, it, inject, expect, angular, console, jasmine */

describe('RestangularResourceTemplate', function () {
    'use strict';
    
    console.log('spec file');
    
    var $httpBackend, ResourceProvider, R,
        sampleObject = {id: 1},
        customMatchers, testUtils;
    
    beforeEach(module('App'));
    beforeEach(module('stateMock'));
    
    beforeEach(inject(function ($injector) {
        ResourceProvider = $injector.get('RestangularResourceTemplate');
        $httpBackend = $injector.get('$httpBackend');
    }));
    
    it('should has provideResource method', function () {
        expect(typeof ResourceProvider.provideResource).toBe('function');
    });
    
    describe('provided resource', function () {
        
        beforeEach(function () {
            R = ResourceProvider.provideResource('teapot');
        });
        
        it('should has CRUD methods', function () {
            expect(typeof R.getOne).toBe('function');
            expect(typeof R.getList).toBe('function');
            expect(typeof R.save).toBe('function');
            expect(typeof R.patch).toBe('function');
            expect(typeof R.remove).toBe('function');
            expect(typeof R.removeFromList).toBe('function');
        });
        
        it('should get list from server', function () {
            $httpBackend.expect('GET', R.baseUrl).respond([sampleObject]);
            var list;
            R.getList()
                .then(function (response) {
                    list = response;
                    expect(list.length).toEqual(1);
                    expect(list).toBeRestangularCollection();
                });
            $httpBackend.flush();
        });
        
        it('should get single object from server', function () {
            var object;
            $httpBackend.expect('GET', R.baseUrl + sampleObject.id + '/').respond(sampleObject);
            R.getOne(sampleObject.id)
                .then(function (response) {
                    object = response;
                    expect(object.id).toBe(1);
                    expect(object).toBeRestangularObject();
                });
            $httpBackend.flush();
        });
        
        it('should create blank restangularized object', function () {
            var object = R.getOne().$object;
            expect(object).toBeRestangularObject();
            expect(object.id).toBe(undefined);
        });
    });
    

});