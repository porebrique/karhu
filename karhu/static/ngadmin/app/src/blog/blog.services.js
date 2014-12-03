/*global $, angular*/

(function (ng) {
    'use strict';
    var mdl = ng.module('BlogModule');



    mdl.factory('Blog.Post', ['Restangular', 'RestangularResourceTemplate',
        function (Restangular, Resource) {
            /*
	var optionalRestangularInstance =  Restangular.withConfig(function(RestangularConfigurer) {
			RestangularConfigurer.setParentless()
			});
	*/
            //return Resource.provideResource('post', optionalRestangularInstance)
            return Resource.provideResource('blog/posts');

        }]);



}(angular));