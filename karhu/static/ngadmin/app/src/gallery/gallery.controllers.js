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
                    //handleSuccessfulUpload(item, response);
                    var img = Gallery.Image.getOne(null).$object;
                    img = ng.extend(img, response);
                    img.local = {};
                    img.urls.thumbnail = SingleFileUploader.randomizeUrl(img.urls.thumbnail);
                    $scope.images.push(img);
                    $scope.is.uploadingImage = false;
                },
                onError: function (item, response) {
                    $scope.is.uploadingImage = false;
                }
            });




            $scope.saveFolder = function () {
                //console.log('saving folder', $scope.folder);
                Gallery.Folder
                    .save($scope.folder)
                    .then(function (response) {
                        if ($scope.folder.id) {
                            $scope.folder = response;
                            //console.log('Folder saved: ', response);
                        } else {
                            $state.go('gallery.folder', {
                                folder_id: response.id
                            });
                        }

                    });
            };

            $scope.deleteFolder = function () {
                $scope.is.deletingFolder = true;
                Gallery.Folder
                    .remove($scope.folder)
                    .andGo('gallery.list');
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
                }
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
                        console.log('Migrating done, response is:', response);
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
                    .customPatch(url, {
                        cover: image.id
                    })
                    .then(function (response) {
                        image.local.pending = false;
                        console.log('before', response.data.cover.url);
                        response.data.cover.url = $filter('randomizeUrl')(response.data.cover.url);
                        console.log('after', response.data.cover.url);

                        $scope.folder.cover = response.data.cover;

                    });
            };

            $scope.openLightboxModal = function (index) {
                Lightbox.openModal($scope.images, index);
            };

            /* -------------*/
            /*     Ctrl     */
            /* -------------*/
            
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