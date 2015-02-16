/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('LineupModule');
    
    
    // Usage: <button modal-lineup-person-add/>
    mdl.directive('modalLineupPersonAdd',
        ['$state', '$modal',  'APP_ROOT_FOLDER', 'Lineup',
            function ($state, $modal, ROOT, Lineup) {
        
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
//                                    $state: function () {return $state; },
                                    Lineup: function () {return Lineup; }
                                }
                            });
                        });
                    }
                };
            }]);

}(angular));