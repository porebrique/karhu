(function(ng){

	var mdl = ng.module('BlogModule');


mdl.factory('Blog', ['API_URL', '$resource', function(API_URL, $resource) {
	var R =  $resource(API_URL + 'blog/:id', { id: '@id' }, {update: {method: 'POST'}})
	     
	
	return R;
	
}]);



})(angular);