/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('LineupModule');
    
    // It's not right to keep controller among directives, but it is used from directive, so...
    mdl.controller('modalLineupPersonAddCtrl',
        ['$scope', '$modalInstance', '$state', 'Lineup',
            function ($scope, $modalInstance, $state, Lineup) {
                $scope.person = Lineup.Person.getOne();

                $scope.is = {
                    saving: false
                };

                $scope.savePerson = function () {
                    $scope.is.saving = true;
                    Lineup.Person
                        .save($scope.person)
                        .then(function (response) {
                            $scope.is.saving = false;
                            $modalInstance.close();
                            $state.go('lineup.person', {person_id: response.id});
                        });
                };
            }]);
    
    // Usage: <button modal-lineup-person-add/>
    mdl.directive('modalLineupPersonAdd',
        ['$state', '$modal',  'APP_ROOT_FOLDER', 'Lineup',
            function ($state, $modal, ROOT, Lineup) {
        
                var modalOptions = {
                    templateUrl: ROOT + 'lineup/templates/modal-person-add.html'
                };
                
                return {
                    restrict: 'A',
                    scope: {},
                    link: function ($scope, elt) {
                        
                        elt.click(function () {
                            var modal = $modal.open({
                                templateUrl: ROOT + 'lineup/templates/modal-person-add.html',
                                controller: 'modalLineupPersonAddCtrl',
                                scope: $scope,
                                resolve: {
                                    $state: function () {return $state; },
                                    Lineup: function () {return Lineup; }
                                }
                            });
                        });
                    }
                };
            }]);

}(angular));