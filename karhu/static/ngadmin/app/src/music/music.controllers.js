/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('MusicModule');


    mdl.controller('MusicListCtrl', ['APP_ROOT_FOLDER', '$scope', '$state', '$sce', '$stateParams', '$modal', 'configService', 'Music.Album', 'separatelinesFilter',
        function (ROOT, $scope, $state, $sce, $stateParams, $modal, Config, Album, separatelinesFilter) {


            $scope.cover = {
                width: Album.config.cover.width,
                height: Album.config.cover.height
            };

            Album.getList().then(function (response) {
                $scope.albums = response;

            });

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


    mdl.controller('MusicAlbumCtrl', ['$scope', '$http', '$state', '$cookies', '$stateParams', 'SingleFileUploader', 'Music.Album',
        function ($scope, $http, $state, $cookies, $stateParams, SingleFileUploader, Album) {

            var csrf_token = $cookies.csrftoken,
                album_id = $stateParams.album_id;

            $scope.error = '';

            Album.getOne(album_id).then(function (response) {
                $scope.album = response;
            });

            $scope.is = {
                clearing_cover: false,
                saving: false,
                deleting: false
            };

            $scope.uploader = SingleFileUploader.create({
                uploadTo: function () {
                    return Album.getUploadUrl($scope.album.id);
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
                Album
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
                    });
            };



            $scope.clearCover = function () {
                $scope.is.clearing_cover = true;
                Album
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
                Album.remove($scope.album).then(function () {
                    $scope.is.deleting = false;
                    $state.go('music.list');
                });
            };
/*
            $scope.uploader = new FileUploader({
                url: '',
                queueLimit: 1,
                method: 'PATCH',
                removeAfterUpload: true,
                headers: {
                    'Accept': 'application/json',
                    'X-CSRFToken': csrf_token // X-CSRF-TOKEN is used for Ruby on Rails Tokens
                },
                onAfterAddingFile: function (item) {
                    //$scope.upload()
                },
                onSuccessItem: function (item, response) {
                    //ng.extend($scope.album, response);
                    $scope.album.cover = response + '?' + (Math.ceil(Math.random() * 10000)).toString();
                    $scope.is.saving = false;
                    //$state.go('music.list');
                    $state.go('music.album', {
                        album_id: $scope.album.id
                    });
                },
                onErrorItem: function (item, response) {
                    console.log(response);
                    $scope.error = response;
                }
            });
            */


        }]);
    

    mdl.controller('MusicAlbumCtrlOld', ['$scope', '$http', '$state', '$cookies', '$stateParams', 'FileUploader', 'Music.Album',
        function ($scope, $http, $state, $cookies, $stateParams, FileUploader, Album) {

            var csrf_token = $cookies.csrftoken,
                album_id = $stateParams.album_id;

            $scope.error = '';

            Album.getOne(album_id).then(function (response) {
                $scope.album = response;
            });

            $scope.is = {
                clearing_cover: false,
                saving: false,
                deleting: false
            };

            function upload() {
                $scope.uploader.queue[0].url = Album.getUploadUrl($scope.album.id);
                $scope.uploader.uploadAll();
            }

            $scope.save = function () {
                $scope.is.saving = true;
                Album
                    .save($scope.album)
                    .then(function (response) {
                        $scope.album = response;
                        if ($scope.uploader.queue.length > 0) {
                            upload();
                        } else {
                            $scope.is.saving = false;
                            $state.go('music.list');
                        }
                    });
            };

            $scope.upload = upload;

            $scope.clearCover = function () {
                $scope.is.clearing_cover = true;
                Album
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
                Album.remove($scope.album).then(function () {
                    $scope.is.deleting = false;
                    $state.go('music.list');
                });
            };

            $scope.uploader = new FileUploader({
                url: '',
                queueLimit: 1,
                method: 'PATCH',
                removeAfterUpload: true,
                headers: {
                    'Accept': 'application/json',
                    'X-CSRFToken': csrf_token // X-CSRF-TOKEN is used for Ruby on Rails Tokens
                },
                onAfterAddingFile: function (item) {
                    //$scope.upload()
                },
                onSuccessItem: function (item, response) {
                    //ng.extend($scope.album, response);
                    $scope.album.cover = response + '?' + (Math.ceil(Math.random() * 10000)).toString();
                    $scope.is.saving = false;
                    //$state.go('music.list');
                    $state.go('music.album', {
                        album_id: $scope.album.id
                    });
                },
                onErrorItem: function (item, response) {
                    console.log(response);
                    $scope.error = response;
                }
            });


        }]);

    mdl.controller('MusicSongCtrl', ['$cookies', '$scope', '$state', '$stateParams', 'Music.Album', 'Music.Song', 'FileUploader',
        function ($cookies, $scope, $state, $stateParams, Album, Song, FileUploader) {
            var csrf_token = $cookies.csrftoken,
                song_id = $stateParams.song_id,
                album_id = $stateParams.album_id;

            $scope.is = {
                clearingMp3: false,
                saving: false,
                deleting: false
            };

            function setAlbum() {
                var albums = $scope.albums,
                    song = $scope.song,
                    initialAlbumId = album_id,
                    match = song_id ? song.album : initialAlbumId; // when editing existing song there is no $stateParams.album_id

                ng.forEach(albums, function (item) {
                    if (item.id === match) {
                        song.album = item;
                    }
                });
            }

            var albumsRequest = Album.getList({
                type: 'short'
            });
            var songRequest = Song.getOne(song_id);

            albumsRequest.then(function (albums) {
                $scope.albums = albums;
                songRequest.then(function (song) {
                    $scope.song = song;
                    setAlbum();
                });
            });


            $scope.delete = function () {
                $scope.is.deleting = true;
                $scope.song.$delete().then(function (response) {
                    $scope.is.deleting = false;
                    $state.go('music.list');
                });
            };

            $scope.clearMp3 = function () {
                $scope.is.clearingMp3 = true;
                Song
                    .update({
                        id: $scope.song.id,
                        action: 'clear_mp3'
                    })
                    .$promise
                    .then(function (response) {
                        //$scope.song = response;
                        $scope.song.mp3 = null;
                        $scope.is.clearingMp3 = false;
                    });
            };


            $scope.save = function () {

                $scope.is.saving = true;
                Song.save($scope.song).then(function (response) {
                    ng.extend($scope.song, response);

                    if ($scope.uploader.queue.length > 0) {
                        $scope.uploader.queue[0].url = Song.url($scope.song.id, 'upload_mp3');
                        $scope.uploader.uploadAll();
                    } else {
                        $scope.is.saving = false;
                        //$state.go('music.list');
                    }
                });

            };

            $scope.uploader = new FileUploader({
                url: '',
                queueLimit: 1,
                removeAfterUpload: true,
                headers: {
                    'X-CSRFToken': csrf_token // X-CSRF-TOKEN is used for Ruby on Rails Tokens
                },
                onAfterAddingFile: function (item) {
                    //console.log('before upload', $scope.song, $scope.song.id)
                },
                onCompleteAll: function () {
                    //console.log('file uploaded')
                    $scope.is.saving = false;
                    $state.go('music.list');
                }
            });


        }]);
    
}(angular));