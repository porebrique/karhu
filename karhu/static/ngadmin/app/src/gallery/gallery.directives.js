/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('GalleryModule');
    
    // Usage: <button modal-music-album-add/>
    mdl.directive('modalGalleryFolderAdd',
        ['$state', '$modal',  'APP_ROOT_FOLDER', 'Gallery',
            function ($state, $modal, ROOT, Gallery) {
                return {
                    restrict: 'A',
                    scope: {},
                    link: function ($scope, elt) {
                        elt.click(function () {
                            var modal = $modal.open({
                                templateUrl: ROOT + 'gallery/templates/modal-folder-add.html',
                                controller: 'modalGalleryFolderAddCtrl',
                                scope: $scope,
                                resolve: {
//                                    $state: function () {return $state; },
                                    Gallery: function () {return Gallery; }
                                }
                            });
                        });
                    }
                };
            }]);
    
}(angular));