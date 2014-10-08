'use strict';

describe('Auth module"s', function(){

	var ctrl, scope, $httpBackend, srv, request, anon;

beforeEach(function(){
   this.addMatchers({
     toEqualData: function(expected) {
       return angular.equals(this.actual, expected);
     }
   });
 });	


	beforeEach(module('App'));
	
	beforeEach(inject(function($controller, $rootScope, $injector, _$httpBackend_){
		anon = {username: '', password: '', rememberme: false};
		scope = $rootScope.$new();
		ctrl = $controller('auth.LoginCtrl', {$scope: scope});
		srv = $injector.get('Auth')
		$httpBackend = _$httpBackend_;
		
		$httpBackend.when('GET', '/static/ngapp/app/src/templates/app-template.html').respond('<div/>');
		$httpBackend.when('GET', '/static/ngapp/app/src/templates/two-columns-layout.html').respond('<div/>');
		$httpBackend.when('GET', '/static/ngapp/app/src/events/templates/events-list.html').respond('<div/>');
		$httpBackend.when('GET', '/static/ngapp/app/src/events/templates/events-list-filter.html').respond('<div/>');
		
		request = $httpBackend.expectPOST('/login', {username: 'username', password: 'password', remember: false});
	}))
	
describe('auth.LoginCtrl', function(){
	
	it('should receive user object as answer to correct login', function(){
		//console.log("!!!!!!!!!!!!!!", request)
		request.respond(200, {username: 'username', role: 2, name: 'Friedrich'});
		
		//console.log(scope.user)
		expect(scope.user).toEqualData(anon);
		
		scope.user.username = 'username';
		scope.user.password = 'password';
		scope.login();
		$httpBackend.flush();
		
		expect(srv.user.name).toBe('Friedrich');
		
	});
	it('should handle responded 403 error', function(){

		request.respond(403,  {status: 'error', message: '403'});
		expect(scope.user).toEqualData(anon);
		scope.user.username = 'username';
		scope.user.password = 'password';
		scope.login();
		$httpBackend.flush();
		expect(scope.error).toBe('403')	
	})
	
})
	
	

	
	
});