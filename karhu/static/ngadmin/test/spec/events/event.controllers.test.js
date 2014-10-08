'use strict';

describe('Event module"s', function(){

  beforeEach(function(){
	    this.addMatchers({
	      toEqualData: function(expected) {
	        return angular.equals(this.actual, expected);
	      }
	    });
	  });	

	beforeEach(module('App'));

	
	var sampleTable = [['row1cell1', 'row1cell2'], 
				          ['row2cell1', 'row2cell2']
						];		
		
	/*
describe('ListCtrl', function(){
	
	var ctrl, scope, $httpBackend;
	
	beforeEach(inject(function($controller, $rootScope, _$httpBackend_, Auth){
		scope = $rootScope.$new();
		ctrl = $controller('ListCtrl', {$scope: scope});
		Auth.changeUser({role: 4})
		$httpBackend =  _$httpBackend_;
		$httpBackend.expectGET('/get_events').respond(sampleTable);
		ctrl = $controller('ListCtrl', {$scope: scope});
		console.log('before')
				
	}));
	

	it('should receive table data from server', function(){
		expect(scope.events.data).toEqualData([]);
		
		console.log(1)
		$httpBackend.flush();
		console.log('ok')
		var r2c1 = scope.events.data[1][0];
		expect(r2c1).toEqual('row2cell1');
	});
	
});
*/

describe('ListFilterCtrl', function(){
	
	
	var ctrl, scope, $httpBackend;	
	
	beforeEach(inject(function($controller, $rootScope,  _$httpBackend_){
		scope = $rootScope.$new();
		ctrl = $controller('ListFilterCtrl', {$scope: scope});
		$httpBackend =  _$httpBackend_;
		$httpBackend.expectGET('/get_events', {filter: true})
					.respond(sampleTable);
		
	}));
	
	it('should do filter list', function(){
		//this ctrl's scope doesnt know about list so I dont know what to check
	});
	
});
	
	
});