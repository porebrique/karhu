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

            function getBlankNoteFor(topic) {
                var note = Lineup.Note.getOne(null);
                //note.person = person_id;
                note.person = $scope.person.id;
                note.topic = topic.id;
                note.text = '';
                note.local = {};
                return note;
            }
            
            function getNoteFor(notes, topic) {
                var result;
                ng.forEach(notes, function (note) {
                    if (note.topic === topic.id) {
                        result = note;
                    }
                });
                if (!result) { result = getBlankNoteFor(topic); }
                return result;
            }
            
            // Note is always related to some Person and cannot be saved without person.id
            // Note with any text will be created or updated depending on if it already has .id
            // Note without text will be deleted
            function saveNote(topic) {
                var isEmpty = topic.note.text.trim() === '',
                    hasToBeDeleted = isEmpty && topic.note.id,
                    hasToBeSaved = !isEmpty,
                    result = null;
                
                if ($scope.person.id) {
                    if (hasToBeDeleted) {
                        result = Lineup.Note.remove(topic.note);
                        result.then(function () {
                            topic.note = getBlankNoteFor(topic);
                        });
                    }
                    if (hasToBeSaved) {
                        if (!topic.note.person) {
                            console.log('adding p[erson id');
                            topic.note.person = $scope.person.id;
                        }
                        result = Lineup.Note.save(topic.note);
                        result.then(function (response) {
                            topic.note = response;
                        });
                    }
                }
                return $q.when(result);
            }
            
            function batchSaveNotes() {
                var requests = [];
                ng.forEach($scope.topics, function (topic) {
                    //if (topic.note.text.trim() !== '' || (topic.note.id && topic.note.text.trim() === '')) {
                    requests.push(saveNote(topic));
                    //}
                });
                return $q.all(requests);
            }
            
            
            $scope.is = {
                clearing_cover: false,
                saving: false,
                deleting: false
            };
            //$scope.person = {};
            
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
            
            $scope.cropImage = function (selection) {
//                console.log("ctrl's crop handle, selection is", selection);
                var url = Lineup.Person.getCropUrl($scope.person.id);
                return Lineup.Person
                    .customPatch(url, {selection: selection})
                    .then(function (response) {
                        $scope.person.photo.thumbnail.url = Lineup.Person.randomizeUrl($scope.person.photo.thumbnail.url);
                    });
            };
            
            
            $scope.delete_note = function (topic) {
                if (topic.note.id) {
                    topic.note.local.isPending = true;
                    Lineup.Note
                        .remove(topic.note)
                        .then(function () {
                            topic.note.local.isPending = false;
                            topic.note = getBlankNoteFor(topic);
                        });
                }
            };
            
//            $scope.create_topic = function () {
//                if ($scope.newtopic !== '') {
//                    var data = {title: $scope.newtopic};
//                    Lineup.Topic.save(data).then(function (response) {
//                        response.note = getBlankNoteFor(response);
//                        $scope.topics.push(response);
//                        $scope.newtopic = '';
//                    });
//                }
//            };

//            $scope.delete_topic = function (topic) {
//                Lineup.Topic.removeFromList($scope.topics, topic);
//            };

            $scope.savePerson = function () {
                $scope.is.saving = true;
                Lineup.Person
                    .save($scope.person)
                    .then(function (response) {
//                        console.log('first then', response);
                        $scope.person = response;
                        return batchSaveNotes();
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
                Lineup.Person
                    .remove($scope.person)
                    .andGo('lineup.list');
            };
            

            $scope.openTopicsEditForm = function () {
                var modal = $modal.open({
                    controller: 'ModalTopicsEditCtrl',
                    templateUrl: ROOT + 'lineup/templates/modal-topics-edit.html'
                });
                modal.result
                    .then(function (result) {
                        $scope.topics.length = 0;
                        $scope.topics = result;
                    });
            
            };
        

            /*     ------------     */
            
//            $scope.newtopic = '';
            $scope.person = resolvedData[0];
            $scope.notes = resolvedData[2];
            
            var topics = resolvedData[1];
                
            // Each topic gets either matched note or blank note
            if ($scope.person.id) {
                ng.forEach(topics, function (topic) {
                    topic.note = getNoteFor($scope.notes, topic);
                });
            } else {
                ng.forEach(topics, function (topic) {
                    topic.note = getBlankNoteFor(topic);
                });
            }
            $scope.topics = topics;
            
            $scope.config = Lineup.Person.config;
            
            
        }]);

    mdl.controller('ModalTopicsEditCtrl',
        ['$q', '$scope', '$modalInstance', 'Lineup',
            function ($q, $scope, $modalInstance, Lineup) {
                
                $scope.is = {saving: false};
                
                Lineup.Topic
                    .getList()
                    .then(function (response) {
                        $scope.topics = response;
                    });
                
                $scope.toggleEditMode = function (topic) {
                    if (topic.local.isEdited) {
                        topic.local.isEdited = false;
                        topic.local.isChanged = true;
                        $scope.is.edited = false;
                    } else {
                        topic.local.isEdited = true;
                        $scope.is.edited = true;
                    }
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