'use strict';
(function(ng){
	
var mdl = ng.module('AuthModule');


mdl.controller('auth.LoginCtrl', ['$scope', '$location', 'Auth', '$state', function($scope, $location, Auth, $state){
	
	$scope.user = {username: '', password: '', rememberme: false}
	
	//Временная штука для удобства разработки
	$scope.fillForm = function(user) {
		if (user == 'user') {
			$scope.user.username = 'user';
			$scope.user.password = 'user';
		} else {
			$scope.user.username = 'admin';
			$scope.user.password = 'admin';
		}
		
	}
	
	$scope.login = function() {
		Auth.login({
			username: $scope.user.username,
			password: $scope.user.password,
			remember: $scope.user.rememberme
		},function(res){
			$scope.error = '';
			
			if (Auth.desiredState) {
				$state.go(Auth.desiredState)
			} else {
				$state.go('events') //nb to set to actual home
			}
			
		}, function(err, a,b,c){
			$scope.error = err.message
		});
	}	
		

}]);


	
})(angular)
