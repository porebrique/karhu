'use strict';
(function(ng){
	
var mdl = ng.module('AuthModule');

mdl.directive('authCurrentUserName', ['Auth', function(Auth){
	return {
		restrict: 'E',
		template: '<strong>User: {{user.name}}</strong>',
        link: function (scope, element) {
        	scope.user = Auth.user;
        }
	}
	
}]);

mdl.directive('authLogout', ['Auth', function(Auth){
	return {
		restrict: 'A',
        link: function (scope, element) {
        	
        	element.click(function(){
        		console.log('clicked')
        		Auth.logout()
        	})
        }
	}
	
}]);


})(angular)
