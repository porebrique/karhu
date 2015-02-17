/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('LineupModule');
    
    mdl.controller('NotesListCtrl', ['$scope',  '$q', '$modal', 'APP_ROOT_FOLDER', 'Lineup', function ($scope, $q, $modal, ROOT, Lineup) {
                
        
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
        $scope.saveNote = function (topic) {
            var isEmpty = topic.note.text.trim() === '',
                hasToBeDeleted = isEmpty && topic.note.id,
                hasToBeSaved = !isEmpty,
                result = null;

            if (hasToBeDeleted) {
                result = Lineup.Note
                    .remove(topic.note)
                    .then(function () {
                        topic.note = getBlankNoteFor(topic);
                    });
            } else if (hasToBeSaved) {
//                if (!topic.note.person) {
//                    console.log('adding p[erson id');
//                    topic.note.person = $scope.person.id;
//                }
                result = Lineup.Note
                    .save(topic.note)
                    .then(function (response) {
                        topic.note = response;
                        topic.note.local.isEdited = false;
//                        $scope.toggleEditMode(topic.note);
                    });
            }
            
        };

        $scope.toggleEditMode = function (note) {
            
            if (note.local.isEdited) {
                note.local.isEdited = false;
            } else {
                note.local.isEdited = true;
            }
            
        };
        
        $scope.delete_note = function (topic) {
            if (topic.note.id) {
                topic.note.local.isDeleting = true;
                Lineup.Note
                    .remove(topic.note)
                    .then(function () {
                        topic.note.local.isDeleting = false;
                        topic.note = getBlankNoteFor(topic);
                    });
            }
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
        // Each topic gets either matched note or blank note
//        var topics = resolvedData[1];
        
        console.log($scope.notes);
        ng.forEach($scope.topics, function (topic) {
            topic.note = getNoteFor($scope.notes, topic);
        });
//        $scope.topics = topics;
        
    }]);

    
    mdl.directive('lineupNotesList',
        ['$state', '$modal',  'APP_ROOT_FOLDER', 'Lineup',
            function ($state, $modal, ROOT, Lineup) {

                return {
                    restrict: 'E',
                    templateUrl: ROOT + '/lineup/templates/notes-list.html',
                    scope: {
                        person: '=',
                        topics: '=',
                        notes: '='
                    },
                    controller: 'NotesListCtrl',
                    link: function ($scope, elt, args) {
                        
                        
                    }
                };
            }]);
    
//    mdl.directive('modalTopicsEdit',
//        ['$state', '$modal',  'APP_ROOT_FOLDER', 'Lineup',
//            function ($state, $modal, ROOT, Lineup) {
//
//                return {
//                    restrict: 'A',
////                    scope: {},
//                    link: function ($scope, elt, args) {
////                        $scope.settings = $scope.modalItemAdd;
//                        elt.click(function () {
//                            var modal = $modal.open({
//                                templateUrl: ROOT + 'lineup/templates/modal-topics-edit.html'
////                                controller: 'modalAddCtrl',
////                                scope: $scope,
////                                resolve: {
////                                    Service: function () {return $scope.settings.service; }
////                                }
//                            });
//                        });
//                    }
//                };
//            }]);

}(angular));