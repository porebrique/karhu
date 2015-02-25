/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('LineupModule');

    mdl.controller('LineupListCtrl',
                   ['$scope', '$q', 'Lineup', 'resolvedData',
            function ($scope, $q, Lineup, resolvedData) {

                $scope.modalItemAddSettings = {
                    title: 'Новый участник',
                    service: Lineup.Person,
                    fields: [
                        ['name', 'Имя'],
                        ['role', 'Роль']
                    ],
                    redirectTo: {
                        stateName: 'lineup.person',
                        stateParams: function (response) {
                            return {person_id: response.id};
                        }
                    }
                };
                
                $scope.config = Lineup.Person.config;
                
                $scope.lineup = resolvedData;

                function sortingDone(event) {
                    var reqs = [];
                    ng.forEach($scope.lineup, function (item, index) {
                        item.order = index;
                        item.local.pending = true;
                        reqs.push(Lineup.Person.patch(item, {order: index}));
                    });

                    $q.all(reqs)
                        .then(function () {
                            ng.forEach($scope.lineup, function (item) {
                                item.local.pending = false;
                            });
                        });
                }
                
                $scope.sortableOptions = {
                    orderChanged: sortingDone,
                    containment: '.sortable-container',
                    containerPositioning: 'relative'
                };
                

            }]);

    mdl.controller('LineupPersonCtrl', ['$scope', '$q', '$timeout', '$state', '$modal', 'APP_ROOT_FOLDER', 'Lineup', 'SingleFileUploader', 'resolvedData',
        function ($scope, $q, $timeout, $state, $modal, ROOT, Lineup, SingleFileUploader, resolvedData) {

            $scope.is = {
                processing_photo: false,
                saving: false,
                deleting: false
            };
            
            $scope.uploader = SingleFileUploader.create({
                onAfterAddingFile: function (item) {
                    $scope.is.processing_photo = true;
                    return $scope.uploader.uploadIfReady();
                },
                uploadTo: function () {
                    return Lineup.Person.getUploadUrl($scope.person.id);
                },
                onSuccess: function (item, response) {
                    $scope.person.photo = response.photo;
                    $timeout(function () {
                        $scope.is.processing_photo = false;
                    }, 500);
                },
                onError: function (item, response) {
                    $scope.is.processing_photo = false;
                }

            });
            
            $scope.cropImage = function (selection) {
                var url = Lineup.Person.getCropUrl($scope.person.id);
                return Lineup.Person
                    .customPatch(url, {selection: selection})
                    .then(function (response) {
                        $scope.person.photo.thumbnail.url = Lineup.Person.randomizeUrl($scope.person.photo.thumbnail.url);
                    });
            };
            
            $scope.savePerson = function () {
                $scope.is.saving = true;
                Lineup.Person
                    .save($scope.person)
                    .then(function (response) {
                        $scope.person = response;
                        $state.go('lineup.list');
                    })
                    .catch(function (errors) {
                        Lineup.Person.handleErrors(errors);
                        $scope.is.saving = false;
                    });
            };
            
            $scope.removePerson = function () {
                $scope.is.deleting = true;
                Lineup.Person
                    .remove($scope.person)
                    .andGo('lineup.list');
            };

            /*     ------------     */
            
            
            $scope.person = resolvedData;
            
            if (!$scope.person.id) {
                $state.go('lineup.list');
            }
            
            $scope.config = Lineup.Person.config;
            
            
        }]);

    mdl.controller('Lineup.ModalTopicsEditCtrl',
        ['$q', '$scope', '$modalInstance', 'Lineup',
            function ($q, $scope, $modalInstance, Lineup) {

                $scope.is = {saving: false};
                
                Lineup.Topic
                    .getList()
                    .then(function (response) {
                        $scope.topics = response;
                    });
                
                $scope.toggleEditMode = function (topic) {
                    if (!topic.local.isEdited) {
                        topic.local.isEdited = true;
                        $scope.is.edited = true;
                    }
                };
                
                $scope.completeEdit = function (topic) {
                    topic.local.isEdited = false;
                    topic.local.isChanged = true;
                    $scope.is.edited = false;
                };
                
                function saveTopic(topic) {
                    var request;
                    if (topic.id) {
                        request = Lineup.Topic.patch(topic, {title: topic.title});
                    } else {
                        request = Lineup.Topic.save(topic);
                    }
                    return request;
                }
                
                $scope.deleteTopic = function (topic) {
                    if (topic.local.markedToDelete) {
                        topic.local.markedToDelete = false;
                        topic.local.isDeleting = false;
                    } else {
                        topic.local.markedToDelete = true;
                        topic.local.isDeleting = true;
                    }
                };
                
                $scope.addTopic = function () {
                    var topic;
                    
                    Lineup.Topic.getOne().then(function (response) {
                        topic = response;
                        topic.local = {};
                        $scope.topics.push(topic);
                        $scope.toggleEditMode(topic);
                    });
                };
                
                $scope.close = function () {
                    ng.forEach($scope.topics, function (topic, index) {
                        if (!topic.title) {
                            console.log('no title at', index, topic);
                            $scope.topics[index] = null;
                        }
                    });
                    console.log($scope.topics);
                    $scope.$close($scope.topics);
                };
                
                
                function deleteMarked() {
                    var requests = [];
                    ng.forEach($scope.topics, function (topic) {
                        if (topic.local.markedToDelete) {
                            if (topic.id) {
                                requests.push(Lineup.Topic.removeFromList($scope.topics, topic));
                            } else {
                                Lineup.Topic.removeFromListWithoutDeleting($scope.topics, topic);
                            }
                        }
                    });
                    return $q.all(requests);
                }
                
                function saveChanged() {
                    var requests = [];
                    ng.forEach($scope.topics, function (topic) {
//                        console.log(topic);
                        if (topic.local.isChanged) {
                            var req = saveTopic(topic)
                                    .then(function (response) {
                                        ng.extend(topic, response);
                                    });
                            requests.push(req);
                        }
                    });
                    return $q.all(requests);
                }
                
                $scope.saveChanges = function () {
                    deleteMarked()
                        .then(function (response) {
                            return saveChanged(response);
                        })
                        .then(function (response) {
//                            console.log('all is done?');
                            $scope.$close($scope.topics);
                        });
                };
                
            
            }]);
    
}(angular));