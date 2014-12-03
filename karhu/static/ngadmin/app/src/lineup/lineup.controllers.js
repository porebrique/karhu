/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('LineupModule');


    mdl.controller('LineupListCtrl', ['$scope', 'Lineup.Person', 'Lineup.Topic', 'Lineup.Note',
            function ($scope, Lineup, Topic, Note) {

            $scope.config = Lineup.config;

            $scope.notes = Note.getList().$object;
            $scope.topics = Topic.getList().$object;
            $scope.lineup = Lineup.getList().$object;
        }]);


    mdl.controller('LineupSortingCtrl', ['$scope', '$http',
        function ($scope, $http) {


        }]);


    mdl.controller('LineupPersonCtrl', ['$scope', '$q', '$cookies', '$state', '$stateParams', 'Lineup.Person', 'Lineup.Topic', 'Lineup.Note',
        function ($scope, $q,  $cookies, $state, $stateParams, Lineup, Topic, Note) {

            var csrf_token = $cookies.csrftoken,
                person_id = $stateParams.person_id;

            function getBlankNoteFor(topic) {
                var note = Note.getOne(null);
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

                if (!result) {
                    result = getBlankNoteFor(topic);
                }
                return result;
            }
            
            
            // When editing Person, request for his/her Notes for each Topic or create blank Note
            // When creating Person, create blank Notes for each Topic
            Topic.getList().then(function (topics) {
                if (person_id) {
                    Note.getList({person: person_id}).then(function (notes) {
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
                
            Lineup.getOne(person_id).then(function (response) {
                $scope.person = response;
                
            });

            $scope.newtopic = '';
            
            // Note is always related to some Person and cannot be saved without person.id
            // Note with any text will be created or updated depending on if it already has id
            // Note without text will be deleted
            $scope.saveNote = function (topic) {
                var isEmpty = topic.note.text.trim() === '',
                    hasToBeDeleted = isEmpty && topic.note.id,
                    hasToBeSaved = !isEmpty,
                    result = null;
                
                if ($scope.person.id) {
                    if (hasToBeDeleted) {
                        result = Note.remove(topic.note);
                        result.then(function () {
                            topic.note = getBlankNoteFor(topic);
                        });
                    }
                    if (hasToBeSaved) {
                        if (!topic.note.person) {
                            console.log('adding p[erson id');
                            topic.note.person = $scope.person.id;
                        }
                        result = Note.save(topic.note);
                        //promise = Note.saveBatch(data);
                        result.then(function (response) {
                            topic.note = response;
                        });
                    }
                }
                
                return $q.when(result);
            };
            
            $scope.deleteNote = function (topic) {
                topic.note.local.isPending = true;
                Note.remove(topic.note);
            };
            
            function batchSaveNotes() {
                var requests = [];
                ng.forEach($scope.topics, function (topic) {
                    //if (topic.note.text.trim() !== '' || (topic.note.id && topic.note.text.trim() === '')) {
                    requests.push($scope.saveNote(topic));
                    //}
                });
                return $q.all(requests);
            }
            
            $scope.create_topic = function () {
                if ($scope.newtopic !== '') {
                    var data = {title: $scope.newtopic};
                    Topic.save(data).then(function (response) {
                        response.note = getBlankNoteFor(response);
                        $scope.topics.push(response);
                        $scope.newtopic = '';
                    });
                }
            };

            $scope.delete_topic = function (topic) {
                Topic.removeFromList($scope.topics, topic);
            };

            $scope.save = function () {
                Lineup.save($scope.person).then(function (response) {
                    $scope.person = response;
                    batchSaveNotes().then(function (response) {
                        //$state.go('lineup.list');
                    });
                });
                
            };
            
            $scope.remove = function () {
                //console.log('Deleting post ', $scope.post)
                Lineup.remove($scope.person).then(function () {
                    $state.go('lineup.list');
                });

            };

        }]);

}(angular));