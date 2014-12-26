/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('LineupModule');

    mdl.controller('LineupListCtrl',
                   ['$scope', 'Lineup', 'resolvedData',
            function ($scope, Lineup, resolvedData) {

                //console.log('ctrl', resolvedData);
                //console.log(Lineup.Person.config, CONFIG);
                $scope.config = Lineup.Person.config;
                
                //$scope.lineup = [];
                //$scope.lineup = Lineup.Person.getList().$object;
                $scope.lineup = resolvedData[0];
                $scope.topics = resolvedData[1];
                $scope.notes = resolvedData[2];

                /*
                $scope.topics = Lineup.Topic.getList().$object;
                $scope.notes = Lineup.Note.getList().$object;
                $scope.lineup = Lineup.Person.getList().$object;
                */
            }]);


    mdl.controller('LineupSortingCtrl', ['$scope', '$http',
        function ($scope, $http) {


        }]);


    mdl.controller('LineupPersonCtrl', ['$scope', '$q', '$cookies', '$state', '$stateParams', 'Lineup', 'SingleFileUploader', 'resolvedData',
        function ($scope, $q,  $cookies, $state, $stateParams, Lineup, SingleFileUploader, resolvedData) {

//            var csrf_token = $cookies.csrftoken,
            var person_id = $stateParams.person_id;
                                        
            console.log('person ctrl, resolved:', resolvedData);

            function getBlankNoteFor(topic) {
                var note = Lineup.Note.getOne(null);
                note.person = person_id;
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
            // Note with any text will be created or updated depending on if it already has id
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
            
            $scope.create_topic = function () {
                if ($scope.newtopic !== '') {
                    var data = {title: $scope.newtopic};
                    Lineup.Topic.save(data).then(function (response) {
                        response.note = getBlankNoteFor(response);
                        $scope.topics.push(response);
                        $scope.newtopic = '';
                    });
                }
            };

            $scope.delete_topic = function (topic) {
                Lineup.Topic.removeFromList($scope.topics, topic);
            };

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
                    });
            };
            
            $scope.removePerson = function () {
                Lineup.Person.remove($scope.person).andGo('lineup.list');
            };

            /*     ---- L ----     */
            
            $scope.newtopic = '';
            
            // When editing Person, request for his/her Notes for each Topic or create blank Note
            // When creating Person, create blank Notes for each Topic
            Lineup.Topic
                .getList()
                .then(function (topics) {
                    if (person_id) {
                        Lineup.Note
                            .getList({person: person_id})
                            .then(function (notes) {
                                ng.forEach(topics, function (topic) {
                                    topic.note = getNoteFor(notes, topic);
                                });
                                $scope.topics = topics;
                            });
                    } else {
                        ng.forEach(topics, function (topic) {
                            topic.note = getBlankNoteFor(topic);
                        });
                        $scope.topics = topics;
                    }
                });
                
            Lineup.Person.getOne(person_id).then(function (response) {
                $scope.person = response;
                
            });
            
        }]);

}(angular));