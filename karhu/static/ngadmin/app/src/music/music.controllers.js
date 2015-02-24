/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('MusicModule');


    mdl.controller('MusicListCtrl', ['$scope', '$q', 'Music', 'resolvedData',
        function ($scope, $q,  Music, resolvedData) {

            $scope.modalItemAddSettings = {
                title: 'Новый альбом',
                service: Music.Album,
                fields: [
                    ['title', 'Название']
                ],
                redirectTo: {
                    stateName: 'music.album',
                    stateParams: function (response) {
                        return {album_id: response.id};
                    }
                }
            };
            $scope.config = Music.config;
            
            $scope.albums = resolvedData;
            //$scope.songs = resolvedData[1];
            
            $scope.sortingDone = function (event) {
                var reqs = [];
                ng.forEach($scope.albums, function (item, index) {
                    item.order = index;
                    item.local.saving = true;
                    reqs.push(Music.Album.patch(item, {order: index}));
                });
                
                // its possible to get rid of $q, I dont need them to be sync'ed
                $q.all(reqs)
                    .then(function () {
                        ng.forEach($scope.albums, function (item) {
                            item.local.saving = false;
                        });
                    });
            };

            
            $scope.sortableOptions = {
                containment: '.sortable-container',
                containerPositioning: 'relative',
                orderChanged: $scope.sortingDone
            };
        }]);

//    // Used in modalMusicAlbumAdd directive
//    mdl.controller('modalMusicAlbumAddCtrl', ['$scope', '$modalInstance', '$state', 'Music', function ($scope, $modalInstance, $state, Music) {
//        $scope.album = Music.Album.getOne();
//
//        $scope.is = { saving: false };
//
//        $scope.save = function () {
//            $scope.is.saving = true;
//            Music.Album
//                .save($scope.album)
//                .then(function (response) {
//                    $scope.is.saving = false;
//                    $modalInstance.close();
//                    $state.go('music.album', {album_id: response.id});
//                });
//        };
//    }]);

    mdl.controller('MusicAlbumCtrl', ['$scope', '$q', '$state',  '$stateParams', 'SingleFileUploader', 'Music', 'resolvedData',
        function ($scope, $q,  $state, $stateParams, SingleFileUploader, Music, resolvedData) {

            var album_id = $stateParams.album_id;
            $scope.config = Music.config;
//            $scope.error = '';
            $scope.album = resolvedData;

            $scope.is = {
                clearing_cover: false,
                saving: false,
                deleting: false
            };

            $scope.modalItemAddSettings = {
                title: 'Новый трек',
                service: Music.Song,
                fields: [
                    ['title', 'Название']
                ],
                extra_fields: [
                    ['album', $scope.album.id]
                ],
                redirectTo: {
                    stateName: 'music.song',
                    stateParams: function (response) {
                        return {song_id: response.id};
                    }
                }
            };
            
            $scope.uploader = SingleFileUploader.create({
                uploadTo: function () {
                    return Music.Album.getUploadUrl($scope.album.id);
                },
                onSuccess: function (item, response) {
                    $scope.is.saving = false;
                    $scope.album.cover = SingleFileUploader.randomizeUrl(response);
                },
                onError: function (item, response) {
                    $scope.is.saving = false;
                }
            });
            
            $scope.save = function () {
//                var albumIsNew = ng.isUndefined($scope.album.id);
                $scope.is.saving = true;
                Music.Album
                    .save($scope.album)
                    .then(function (response) {
                        $scope.album = response;
                    })
                    .then(function () {
                        $scope.uploader
                            .uploadIfReady()
                            .or(function () {
                                $scope.is.saving = false;
                            });
                    })
                    .then(function () {
                        $state.go('music.list');
                    });
                    
            };

            $scope.clearCover = function () {
                $scope.is.clearing_cover = true;
                Music.Album
//                    .update({
//                        id: $scope.album.id,
//                        action: 'delete_cover'
//                    })
//                    .$promise
                    .clear_cover($scope.album)
                    .then(function (response) {
//                        $scope.song = response;
                        $scope.album.cover = null;
                        $scope.is.clearing_cover = false;
                    });
            };

            $scope.deleteAlbum = function () {
                $scope.is.deleting = true;
                Music.Album.remove($scope.album).then(function () {
                    $scope.is.deleting = false;
                    $state.go('music.list');
                });
            };
            
            $scope.cropCover = function (selection) {
                var url = Music.Album.getCropUrl($scope.album.id);
                return Music.Album
                    .customPatch(url, {selection: selection})
                    .then(function (response) {
                        $scope.album.cover.thumbnail.url = Music.Album.randomizeUrl($scope.album.cover.thumbnail.url);
                    });
            };
        }]);
    

    mdl.controller('MusicSongCtrl', ['$cookies', '$scope', '$state', '$stateParams', 'Music', 'SingleFileUploader', 'resolvedData',
        function ($cookies, $scope, $state, $stateParams, Music,  SingleFileUploader, resolvedData) {
            
            var csrf_token = $cookies.csrftoken,
                song_id = $stateParams.song_id,
                album_id = $stateParams.album_id;


            function setAlbum() {
                var match;

                if (song_id) {
                    match = $scope.song.album;
                } else {
                    match = parseInt(album_id, 10);
                    $scope.song.album = album_id;
                }
                ng.forEach($scope.albums, function (item) {
                    //console.log(item, item.id === match);
                    if (item.id === match) {
                        //song.album = item;
                        $scope.local = {};
                        $scope.local.selectedAlbum = item;
                    }
                });
            }

            $scope.deleteSong = function () {
                $scope.is.deleting = true;
                Music.Song
                    .remove($scope.song)
                    .then(function (response) {
                        $scope.is.deleting = false;
                        $state.go('music.list');
                    });
            };

            $scope.clearMp3 = function () {
                $scope.is.clearingMp3 = true;
                Music.Song
                    .clearMp3($scope.song.id)
                    .then(function (response) {
                        $scope.song.mp3 = null;
                        $scope.is.clearingMp3 = false;
                    });
            };


            $scope.save = function () {
                $scope.is.saving = true;
                $scope.song.album = $scope.local.selectedAlbum.id;
                Music.Song
                    .save($scope.song)
                    .then(function (response) {
                        $scope.song = response;
                        $scope.uploader
                            .uploadIfReady()
                            .or(function () {
                                $scope.is.saving = false;
                                $state.go('music.album', {album_id: $scope.song.album});
                            });
                    });
            };

            $scope.uploader = SingleFileUploader.create({
                method: 'PATCH',
                onAfterAddingFile: function (item) {
                },
                uploadTo: function () {
                    return Music.Song.getUploadUrl($scope.song.id);
                },
                onSuccess: function (item, response) {
                    $scope.song.mp3 = response;
                    $scope.is.saving = false;
                },
                onError: function (item, response) {
                    $scope.is.saving = false;
                }
            });
            
            /* ---------------------------- */

            $scope.is = {
                clearingMp3: false,
                saving: false,
                deleting: false
            };
            
            $scope.albums = resolvedData[0];
            $scope.song = resolvedData[1];
            setAlbum();


        }]);
    
}(angular));