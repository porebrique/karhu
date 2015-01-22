/*global angular, console*/
(function (ng) {
    'use strict';
    
    var mdl = ng.module('BlogModule');

    mdl.factory('Blog.Post', ['Restangular', 'RestangularResourceTemplate', 'configService',
        function (Restangular, Resource) {
            return Resource.provideResource('blog/posts');
        }]);

}(angular));