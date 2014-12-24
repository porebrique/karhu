/*global angular, console */
(function (ng) {
    'use strict';
    
    var mdl = ng.module('EventsModule');



    mdl.factory('Event', ['Restangular', 'RestangularResourceTemplate',
        function (Restangular, Resource) {
            /*
	var optionalRestangularInstance =  Restangular.withConfig(function(RestangularConfigurer) {
			RestangularConfigurer.setParentless()
			});
	*/
            //return Resource.provideResource('post', optionalRestangularInstance)
            return Resource.provideResource('events');

        }]);

}(angular));