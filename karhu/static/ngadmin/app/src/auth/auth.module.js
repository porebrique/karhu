'use strict';
(function(ng){

var mdl = ng.module('AuthModule', []);
// all module's dependencies must be here, not in other files  || ORLY? I doubt now.



mdl.run(['$rootScope', '$state', 'Auth', function($rootScope, $state, Auth){
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
			//console.log('User role: [', Auth.user.role, '], target is [' + toState.name + '], its level is: [', toState.data.access + ']')
			if (Auth.user.role < toState.data.access) {
				event.preventDefault();
				if (!Auth.isLoggedIn()) {
					//console.log('User is [not logged] and must be redirected to login page');
					Auth.desiredState = toState;
					$state.go('system.login')
				} else {
					//console.log('User access level is too small and shoul be redirected to [403]')
				}				
			} else {
				//console.log('User has enough rights to go on')
			}
		});
		
		
}])




})(angular)
