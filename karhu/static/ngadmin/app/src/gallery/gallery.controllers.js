/*global angular, console */
(function (ng) {
    'use strict';

    var mdl = ng.module('GalleryModule');

    mdl.controller('GalleryListCtrl', ['$scope', '$q', 'Gallery', 'resolvedData',
        function ($scope, $q, Gallery, resolvedData) {

            $scope.config = Gallery.config;
            $scope.folders = resolvedData;

            $scope.sortingDone = function (items) {
                var reqs = [];
                $scope.folders = items;
                ng.forEach($scope.folders, function (item, index) {
                    item.order = index;
                    reqs.push(Gallery.Folder.patch(item, {order: index}));
                });
                return $q.all(reqs);
            };

        }]);


    mdl.controller('GalleryFolderCtrl', ['$scope', '$state', '$stateParams', '$filter', 'Lightbox', 'SingleFileUploader', 'Gallery', 'resolvedData',
        function ($scope, $state, $stateParams, $filter, Lightbox, SingleFileUploader, Gallery, resolvedData) {

            var folder_id = $stateParams.folder_id;
            
            function getImages() {
                Gallery.Image
                    .getList({
                        folder: folder_id
                    })
                    .then(function (response) {
                        $scope.images = response;
                    });
            }

            $scope.config = Gallery.config;
            $scope.folder = {};

            $scope.is = {
                deletingFolder: false,
                processingImage: null,
                migratingImages: false,
                uploadingImage: false

            };

            $scope.uploader = SingleFileUploader.create({
                method: 'POST',
                onAfterAddingFile: function (item) {
                    $scope.is.uploadingImage = true;
                    $scope.uploader.uploadIfReady();
                },
                uploadTo: function () {
                    return Gallery.Folder.getUploadUrl($scope.folder.id);
                },
                onSuccess: function (item, response) {
                    var img = Gallery.Image.getOne(null).$object;
                    img = ng.extend(img, response);
                    img.local = {};
                    img.urls.thumbnail.url = $filter('randomizeUrl')(img.urls.thumbnail.url);
                    $scope.images.push(img);
                    $scope.is.uploadingImage = false;
                },
                onError: function (item, response) {
                    $scope.is.uploadingImage = false;
                }
            });

            $scope.saveFolder = function () {
                Gallery.Folder
                    .save($scope.folder)
                    .then(function (response) {
                        $state.go('gallery.list');
                    });
            };

            $scope.deleteFolder = function () {
                $scope.is.deletingFolder = true;
                Gallery.Folder
                    .remove($scope.folder)
                    .andGo('gallery.list');
            };
            
            $scope.cropCover = function (selection) {
                var url = Gallery.Folder.getCropUrl($scope.folder.id);
                return Gallery.Folder
                    .customPatch(url, {selection: selection})
                    .then(function (response) {
                        $scope.folder.cover.thumbnail.url = Gallery.Folder.randomizeUrl($scope.folder.cover.thumbnail.url);
                    });
            };

            /* ----------------------*/
            /*     Images methods    */
            /* ----------------------*/

            $scope.selectedImages = [];
            $scope.selectImage = function (img) {
                if (img.local.selected) {
                    var index = $scope.selectedImages.indexOf(img.id);
                    $scope.selectedImages.splice(index, 1);
                    img.local.selected = false;

                } else {
                    img.local.selected = true;
                    //$scope.selectedImages.push(img.id);
                    $scope.selectedImages.push(img);
                    return {then: function (what) {what(); }};
                }
            };
            
            $scope.cropImage = function (selection, image) {
                var url = Gallery.Image.getCropUrl(image.id);
                return Gallery.Image
                    .customPatch(url, {selection: selection})
                    .then(function (response) {
                        image.urls.thumbnail.url = Gallery.Image.randomizeUrl(image.urls.thumbnail.url);
                    });
            };

            $scope.deleteImage = function (image, index) {
                image.local = {};
                image.local.pending = true;
                Gallery.Image
                    .removeFromList($scope.images, image)
                    .then(function (response) {
                        image.local.pending = false;
                    });
            };

            $scope.moveSelectedTo = function (folder) {
                var data = {
                    images: [],
                    toFolder: folder.id
                };

                ng.forEach($scope.selectedImages, function (img) {
                    img.local.pending = true;
                    data.images.push(img.id);
                });

                $scope.is.migratingImages = true;

                Gallery.Image
                    .moveImagesTo(folder.id, data.images)
                    .then(function (response) {
//                        console.log('Migrating done, response is:', response);
                        $scope.is.migratingImages = false;

                        ng.forEach($scope.selectedImages, function (img) {
                            Gallery.Image
                                .removeFromListWithoutDeleting($scope.images, img);
                        });
                        $scope.selectedImages.length = 0;
                    });
            };


            $scope.setAsCover = function (image) {
                var url = Gallery.Folder.baseUrl + $scope.folder.id + '/set_cover/';
                image.local.pending = true;
                Gallery.Folder
                    .customPatch(url, {cover: image.id})
                    .then(function (response) {
                        var cover = response.data.cover;
                        image.local.pending = false;
                        cover.thumbnail.url = Gallery.Folder.randomizeUrl(cover.thumbnail.url);
                        cover.source.url = Gallery.Folder.randomizeUrl(cover.source.url);
                        $scope.folder.cover = cover;
                    });
            };

            $scope.openLightboxModal = function (index) {
                Lightbox.openModal($scope.images, index);
            };

//            function calculateImageOrdering(event) {
//                var arr = ng.copy($scope.images);
//                ng.forEach(arr, function (img, index) {
//                    img.order = index;
//                    img.local.pending = true;
//                });
//                
//                $scope.images.length = 0;
//                $scope.images = arr;
//                arr = ng.copy($scope.images);
//                ng.forEach(arr, function (img) {
//                    img.local.pending = false;
//                });
//                Gallery.Image
//                    .setOrder($scope.images)
//                    .then(function (response) {
//                        $scope.images.length = 0;
//                        $scope.images = arr;
//                    });
//                
//            }
            function calculateImageOrdering(event) {
//                var arr = ng.copy($scope.images);
                ng.forEach($scope.images, function (img, index) {
                    img.order = index;
                    img.local.pending = true;
                });
                
                Gallery.Image
                    .setOrder($scope.images)
                    .then(function (response) {
                        ng.forEach($scope.images, function (img) {
                            img.local.pending = false;
                        });
                    });
                
            }
            /* -------------*/
            /*     Ctrl     */
            /* -------------*/
            
            
            $scope.sortableOptions = {
                containment: '.sortable-container',
                containerPositioning: 'relative',
                orderChanged: calculateImageOrdering
//                containment: '.items',
                
            };
            
            
            
            $scope.folders = resolvedData;
            
            if (folder_id && folder_id !== 'new') {
                getImages();
                $scope.folder = Gallery.Folder.grepFromCollection($scope.folders, folder_id);
            } else {
                $scope.images = [];
                $scope.folder = Gallery.Folder.getOne();
            }
            
        }]);


}(angular));