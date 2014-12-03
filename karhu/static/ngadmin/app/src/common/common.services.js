/*global angular, console */
(function (ng) {
    'use strict';

    var mdl = ng.module('CommonModule');


    // THIS ONE IS FOR SomeService.save($scope.object);
    /*
     * Provides API for handling typical operations on typical RESTful resource
     *
     * Usage: resource = ResourceTemplate.provideResource('somename', [optionalRestangularInstance])
     *
     *  optionalRestangularInstance =  Restangular.withConfig(function(RestangularConfigurer) {
     *	     RestangularConfigurer.setBaseUrl('/some/other/url/');
     *      });
     * Provided resource has these methods:
     * .getList() returns restangular's .getList() (with .then() method)
     * .getOne(id) (if id is undefined returns {}, otherwise returns restangulars's .one().get() (with .then())
     * .save(dataToBeSaved), returns .put() or .post(), depending on dataToBeSaved.id (and .then() again)
     *
     *  Resource.getList().then(function(response){
     *		$scope.list = response;
     *	});
     *
     *  Resource.getOne(some_id).then(function(response){
     *		$scope.object = response
     *	});
     *
     *	Resource.save($scope.object).then(function(response){
     *			$scope.object = response;
     *		});
     *
     */
    mdl.factory('RestangularResourceTemplate', ['$q', 'Restangular',
        function ($q, Restangular) {

            var resourceName = 'post';

            function provideResource(resourceName, customRestangular) {

                if (customRestangular) {
                    Restangular = customRestangular;
                }

                var Resource = Restangular.service(resourceName),
                    api = {};
                
                function save(data) {
                    return data.id ? data.put() : Resource.post(data);
                }
                
                function getOne(id) {
                    return $q.when(id ? Resource.one(id).get() : Resource.one());
                }
                
                //not tested yet
                function saveBatch(arr) {
                    var requests = [];
                    ng.forEach(arr, function (item) {
                        requests.push(save(item));
                    });
                    return $q.all(requests);
                }
                
                function patch(item, data) {
                    var request = item.patch(data).then(function (response) {
                        console.log('Patched', response);
                    });
                    return {
                        then: function (callback) {
                            return callback(request);
                        }
                    };

                }
                
                function remove(item) {
                    return item.remove();
                }
                // not tested yet
                function removeBatch(arr) {
                    var requests = [];
                    ng.forEach(arr, function (item) {
                        requests.push(remove(item));
                    });
                    return $q.all(requests);
                }
                function removeFromList(list, item) {
                    return item.remove().then(function (response) {
                        var index = list.indexOf(item);
                        if (index > -1) {
                            list.splice(index, 1);
                        }
                    });
                }
                
                api.baseUrl =  Restangular.configuration.baseUrl + '/' + resourceName + '/';
                api.getList = Resource.getList;
                api.getOne = getOne;
                api.save = save;
                api.saveBatch = saveBatch;
                api.patch = patch;
                api.remove =  remove;
                api.removeFromList = removeFromList;
                return api;
            }

            return {
                provideResource: provideResource
            };


        }]);


    mdl.service('configService', ['$resource', 'API_URL',
        function ($resource, API_URL) {
            var self = this,
                R = $resource(API_URL + 'config'),
                stored = null;
            self.get = function () {
                if (stored) {
                    //console.log('stored is true and is ', stored)
                    return stored;
                } else {
                    //console.log('config wasnt stored...')
                    stored = R.get();
                    //console.log('...and now is ', stored)
                    return stored;
                }
            };

        }]);


}(angular));