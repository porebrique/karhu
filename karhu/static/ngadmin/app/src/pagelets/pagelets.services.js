/*global angular, console */
(function (ng) {
    'use strict';


    var mdl = ng.module('PageletsModule');

    mdl.factory('Pagelet', ['RestangularResourceTemplate',
        function (RestangularResourceTemplate) {

            var R = RestangularResourceTemplate.provideResource('pagelets');

            return R;

        }]);
    
    mdl.factory('Slot', ['RestangularResourceTemplate',
        function (RestangularResourceTemplate) {

            var R = RestangularResourceTemplate.provideResource('slots');

            return R;

        }]);
    
    
    /*


mdl.factory('Slot', ['API_URL', '$resource',  function(API_URL, $resource) {

	var R =  $resource(API_URL + 'pagelets/slots/:id', { id: '@id' }, {update: {method: 'POST'}})

	return R

}]);


mdl.factory('Pagelet', ['API_URL', '$resource',  function(API_URL, $resource) {

	var R =  $resource(API_URL + 'pagelets/:id', { id: '@id' }, {update: {method: 'POST'}})

	return R

}]);
*/

}(angular));