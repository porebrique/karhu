/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('MusicModule');


    mdl.controller('MusicListCtrl', ['APP_ROOT_FOLDER', '$scope', '$state', '$sce', '$q', '$stateParams', '$modal', 'configService', 'Music', 'separatelinesFilter', 'resolvedData',
        function (ROOT, $scope, $state, $sce, $q, $stateParams, $modal, Config, Music,  separatelinesFilter, resolvedData) {


            $scope.cover = {
                width: Music.config.cover_width,
                height: Music.config.cover_height
            };
            
            $scope.albums = resolvedData;
            //$scope.songs = resolvedData[1];
            
            $scope.sortingDone = function (items) {
                var reqs = [];
                $scope.albums = items;
                ng.forEach($scope.albums, function (item, index) {
                    item.order = index;
                    reqs.push(Music.Album.patch(item, {order: index}));
                });
                return $q.all(reqs);
            };
            
            $scope.sortingDoneSongs = function (items) {
                var reqs = [],
                    album = Music.Album.grepFromCollection($scope.albums, items[0].album, true);
                
                album.songs = items;
                
                ng.forEach(items, function (item, index) {
                    var url = Music.Song.baseUrl + item.id + '/';
                    item.order = index;
                    //reqs.push(Music.Song.patch(item, {order: index}));
                    reqs.push(Music.Song.customPatch(url, {order: index}));
                    // 'item' here is nor restangular resource
                    // Maybe I should get songs separately an then attach them to albums
                });
                
                return $q.all(reqs);
            };
            
            $scope.showLyrics = function (song) {
                var modal = $modal.open({
                    templateUrl: ROOT + 'music/templates/modal-lyrics.html',
                    controller: ['$scope',
                        function ($scope) {
                            $scope.song = {
                                title: song.title,
                                lyrics: $sce.trustAsHtml(separatelinesFilter(song.lyrics))
                            };
                        }]
                });
            };

        }]);


    mdl.controller('MusicAlbumCtrl', ['$scope', '$state',  '$stateParams', 'SingleFileUploader', 'Music', 'resolvedData',
        function ($scope, $state, $stateParams, SingleFileUploader, Music, resolvedData) {

            var album_id = $stateParams.album_id;

            $scope.error = '';

            $scope.album = resolvedData;
            

            $scope.is = {
                clearing_cover: false,
                saving: false,
                deleting: false
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
                    .update({
                        id: $scope.album.id,
                        action: 'delete_cover'
                    })
                    .$promise
                    .then(function (response) {
                        $scope.song = response;
                        $scope.album.cover.thumbnail.url = null;
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
                                $state.go('music.list');
                            });
                    });
            };

            $scope.uploader = SingleFileUploader.create({
                method: 'PATCH',
                onAfterAddingFile: function (item) {
                    //$scope.is.saving = true;
                    //$scope.uploader.uploadIfReady();
                },
                uploadTo: function () {
                    return Music.Song.getUploadUrl($scope.song.id);
                },
                onSuccess: function (item, response) {
                    //console.log('file done', response);
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