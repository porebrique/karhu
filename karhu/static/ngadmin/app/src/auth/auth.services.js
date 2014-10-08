(function(ng){

var mdl = ng.module('AuthModule');


mdl.factory('Auth', ['$http', '$rootScope', '$cookieStore', '$state', '$timeout', function($http, $rootScope, $cookieStore, $state, $timeout){
	
	//console.log('Instatiating Auth service');

    var accessLevels = routingConfig.accessLevels, 
    	userRoles = routingConfig.userRoles,
    	blankUser = {username: '', role: userRoles.public, name: '', password: ''},
    	user = $cookieStore.get('user') || blankUser;
    
    
    function changeUser(newUser){
        ng.extend(user, newUser);
        $cookieStore.put('user', user);
    }
    
	function isLoggedIn() {
		return user !== undefined && user.role > 1;
	}
	
	function login(user, success, error) {
		$http.post('/login', user)
		.success(function(user){
			changeUser(user);
			$cookieStore.put('user', user);
			success(user);
		})
		.error(error)
	};
		
	function logout(){
		//console.log('Logout from service...');
    	ng.extend(user, blankUser)
  		$cookieStore.remove('user');
		//$timeout(function(){
		$state.go('system.login')
		//}, 1000)
		
	    //console.log('...logged out.');
	}        
	
	
    var A = {
    		user: user,
    		desiredState: null,
    		login: login,
    		changeUser: changeUser,
    		isLoggedIn: isLoggedIn,
    		logout: logout
    }
    
    return A;

}]);
})(angular);