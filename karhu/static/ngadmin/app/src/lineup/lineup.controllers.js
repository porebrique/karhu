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
                        ['name', 'Имя']
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
//                $scope.lineup = resolvedData[0];
//                $scope.topics = resolvedData[1];
//                $scope.notes = resolvedData[2];
                

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

    mdl.controller('LineupPersonCtrl', ['$scope', '$q', '$state', '$modal', 'APP_ROOT_FOLDER', 'Lineup', 'SingleFileUploader', 'resolvedData',
        function ($scope, $q, $state, $modal, ROOT, Lineup, SingleFileUploader, resolvedData) {

            $scope.is = {
                clearing_cover: false,
                saving: false,
                deleting: false
            };
            
            $scope.uploader = SingleFileUploader.create({
                uploadTo: function () {
                    return Lineup.Person.getUploadUrl($scope.person.id);
                }

            });
            
            $scope.cropImage = function (selection) {
//                console.log("ctrl's crop handle, selection is", selection);
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
//                        return batchSaveNotes();
//                        var requests = [];
//                        ng.forEach($scope.topics, function (topic) {
//                            requests.push(saveNote(topic));
//                        });
//                        return $q.all(requests);
                    })
                    .then(function (response) {
                        $scope.uploader
                            .uploadIfReady()
                            .or(function () {
                                $scope.is.saving = false;
                            });
                    })
                    .then(function () {
                        $state.go('lineup.list');
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
//            $scope.notes = resolvedData[2];
            
//            $scope.topics = resolvedData[1];
            $scope.config = Lineup.Person.config;
            
            
            
            
        }]);

    mdl.controller('ModalTopicsEditCtrl',
        ['$q', '$scope', '$modalInstance', 'Lineup',
            function ($q, $scope, $modalInstance, Lineup) {
                
//                console.log($scope, $scope.topics);
                
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