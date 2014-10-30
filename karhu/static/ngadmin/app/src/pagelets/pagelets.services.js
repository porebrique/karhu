(function(ng){


var mdl = ng.module('PageletsModule');

mdl.factory('Slot', ['API_URL', '$resource',  function(API_URL, $resource) {

	var R =  $resource(API_URL + 'pagelets/slots/:id', { id: '@id' }, {update: {method: 'POST'}})

	return R

}]);


mdl.factory('Pagelet', ['API_URL', '$resource',  function(API_URL, $resource) {

	var R =  $resource(API_URL + 'pagelets/:id', { id: '@id' }, {update: {method: 'POST'}})

	return R

}]);


})(angular);