/*global angular, console */
(function (ng) {
    'use strict';

    var mdl = ng.module('CommonModule');

    
    /*   Creating uploader: 
    
            $scope.uploader = SingleFileUploader.create({
                uploadTo: function () {
                    return Lineup.Person.getUploadUrl($scope.person.id);
                },
                onSuccess: function (item, response) {
                    $scope.is.saving = false;
                    $scope.person.photo = SingleFileUploader.randomizeUrl(response);
                },
                onError: function (item, response) {
                    $scope.is.saving = false;
                }
            });
        
        ...after resource save:
        
       .then(function () {
            $scope.uploader
                .uploadIfReady()
                .or(function () {
                    $scope.is.saving = false;
                });
        });
    */

    mdl.factory('SingleFileUploader', ['$q', '$cookies', 'FileUploader',
        function ($q, $cookies, FileUploader) {
            var F = {},
                default_options = {
                    url: '',
                    queueLimit: 1,
                    method: 'PATCH',
                    removeAfterUpload: true,
                    headers: {
                        'Accept': 'application/json',
                        'X-CSRFToken': $cookies.csrftoken
                    },
                    onAfterAddingFile: function (item) {
                        //$scope.upload()
                    },
                    onSuccessItem: function (item, response) {
                    },
                    onErrorItem: function (item, response) {
                    }
                };

            FileUploader.prototype.ready = function () {
                var self = this;
                return self.queue.length > 0;
            };
            
            FileUploader.prototype.uploadIfReady = function () {
                var self = this,
                    answer = {};
                
                
                if (self.ready()) {
                    self.queue[0].url = self.uploadTo();
                    self.uploadAll();
                    answer.or = function () {};
                } else {
                    answer.or = function (action) {
                        action();
                    };
                }
                
                //return A;
                return answer;
            };
            
            FileUploader.prototype.upload = function () {
                var self = this,
                    answer;
                
                console.log(self.onSuccessItem);
                answer = $q.when();
                return answer;
            };
            
            F.create = function (options) {
                var opts = ng.copy(default_options),
                    U;  //uploader
                opts = ng.extend(opts, options);
                U = new FileUploader(opts);
                U.onSuccessItem = function (item, response) {
                    //U.onSuccessfulUpload(item, response);
                    options.onSuccess(item, response);
                };
                
                U.onErrorItem = function (item, response) {
                    options.onError(item, response);
                };
                
                U.obj = options.obj;
                
                U.uploadTo = options.uploadTo;
                return U;
            };

            F.randomizeUrl = function (url) {
                return url + '?' + (Math.ceil(Math.random() * 10000)).toString();
            };
            
            return F;
        }]);

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
     * .saveBatch([item1, item2])
     * .saveBatchIf([item1, item2], conditionFunction)
     *
     * some methods return object with .andGo('api/somewhere') method
     */
    mdl.factory('RestangularResourceTemplate', ['$q', '$timeout', '$state', '$http', 'Restangular',
        function ($q, $timeout, $state, $http, Restangular) {

            var resourceName = 'post';

            function provideResource(resourceName, customRestangular) {

                if (customRestangular) {
                    Restangular = customRestangular;
                }

                var Resource = Restangular.service(resourceName),
                    api = {};
                
                // private
                function andGo(destination, promise) {
                    return promise.then(function () {
                        $state.go(destination);
                    });
                }

                //private
                function extendPromise(promise) {
                    return ng.extend(promise, {
                        andGo: function (dest) {
                            return andGo(dest, promise);
                        }
                    });
                }

                function getOne(id) {
                    var elt = id ? Resource.one(id).get() : Resource.one(),
                        response = $q.when(elt);
                    response.$object = elt;
                    response.catch(function (error) {
                        if (error.status === 404) {
                            //$state.go('404');
                        }
                    });
                    return response;
                }

                function grepFromCollection(collection, id) {
                    var match = null,
                        index;
                    
                    //console.log(id, 'and', ng.isNumber(id) && !isNaN(id));
                    
                    if (id === null || id === '' || id === undefined) {
                        return Resource.one();
                    } else {
                        id = parseInt(id, 10);
                        if (ng.isNumber(id) && !isNaN(id)) {
                            
                            ng.forEach(collection, function (item) {
                                if (item.id === id) {
                                    match = item;
                                }
                            });

                            if (match) {
                                index = collection.indexOf(match);
                                collection.splice(index, 1);
                            }
                            return match;
                        } else {
                            throw new Error('.grepFromCollection(id) should get null, empty string or something that can be parsed as int');
                        }
                    }
                }
                function save(data) {
                    return data.id ? data.put() : Resource.post(data);
                }

                //not tested yet
                function saveBatch(arr) {
                    var requests = [];
                    ng.forEach(arr, function (item) {
                        requests.push(save(item));
                    });
                    return $q.all(requests);
                }

                //not tested yet
                function saveBatchIf(arr, condition) {
                    var cleanArr = [];
                    ng.forEach(arr, function (item) {
                        if (condition(item)) {
                            cleanArr.push(item);
                        }
                    });
                    return saveBatch(cleanArr);
                }

                function patch(item, data) {
                    var request = item
                            .patch(data)
                            .then(function (response) {
                                //console.log('Patched', response);
                                return response;
                            });
                    //console.log(request);
                    return request;
                }

                function remove(item) {
                    return extendPromise(item.remove());
                }
                // not tested yet
                function removeBatch(arr) {
                    var requests = [];
                    ng.forEach(arr, function (item) {
                        requests.push(remove(item));
                    });
                    return extendPromise($q.all(requests));
                }

                function removeFromList(list, item) {
                    var promise = item.remove().then(function (response) {
                        var index = list.indexOf(item);
                        if (index > -1) {
                            list.splice(index, 1);
                        }
                    });

                    return extendPromise(promise);
                }
                function removeFromListWithoutDeleting(list, item) {
                    var index = list.indexOf(item);
                    if (index > -1) {
                        list.splice(index, 1);
                    }

                }
                
                function customPatch(url, data) {
                    return $http.patch(url, data);
                }


                api.baseUrl = Restangular.configuration.baseUrl + '/' + resourceName + '/';
                api.getList = Resource.getList;
                api.getOne = getOne;
                api.grepFromCollection = grepFromCollection;
                api.save = save;
                api.saveBatch = saveBatch;
                api.customPatch = customPatch;
                api.saveBatchIf = saveBatchIf;
                api.patch = patch;
                api.remove = remove;
                api.removeFromList = removeFromList;
                api.removeFromListWithoutDeleting = removeFromListWithoutDeleting;
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