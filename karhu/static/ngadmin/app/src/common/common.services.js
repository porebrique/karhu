(function(ng){


var mdl = ng.module('CommonModule');

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



})(angular);