(function(ng){


var mdl = ng.module('CommonModule');

mdl.service('configService', ['$resource', 'API_URL', function($resource, API_URL){
	var self  = this;
	var R = $resource(API_URL + 'config', {customerId: '@id'})
	var stored = null;
	
	self.get = function(){
		if (stored) {
			//console.log('stored is true and is ', stored)
			return stored
		} else {
			stored = R.get();
			//console.log('store was false and now is ', stored)
			return stored
		}
	}
	
}]);

/*
mdl.factory('Env', ['$resource', function($resource) {

	var R = $resource('/api/env', {}, {
		query: {method: 'GET', params: {}, isArray: false}
	})
	
	function getEnv(args, callback) {
		// args = ['item1', 'item2']
		R.query({items: args}, callback)
	}
	
	return {
		getEnv: getEnv
	}

}]);
*/


})(angular);