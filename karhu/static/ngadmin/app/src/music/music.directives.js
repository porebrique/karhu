/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('MusicModule');

    
    mdl.directive('karhuAlbumSongsList', ['$sce', '$q', '$modal', 'APP_ROOT_FOLDER', 'configService', 'separatelinesFilter', 'Music',
        function ($sce, $q, $modal, ROOT, configService, separatelinesFilter, Music) {

            return {
                restrict: 'E',
                templateUrl: ROOT + 'music/templates/album-songs-list.html',
//                scope: {
//                    songs: '=',
//                    album: '='
//                },
//                scope: false,
                link: function ($scope, elt, args) {
//                    $scope.songs = $scope.album.songs;
                    $scope.sortingDoneSongs = function (items) {
                        var reqs = [];
                        
                        ng.forEach(items, function (item, index) {
                            var url = Music.Song.baseUrl + item.id + '/';
                            item.order = index;
                            reqs.push(Music.Song.customPatch(url, {order: index}));
                        });
//                        console.log($scope.album.songs);
                        return $q
                            .all(reqs)
                            .then(function (response) {
                                $scope.album.songs = items;
                            });
                        
                                   
                    }
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
                }
            };
        }]);
    
    /*
     * Usage: <mp3-player mode="single|multi" music="song.mp3" width="150" height="26"></mp3-player>
     * WIDTH and HEIGHT are optional and override defaults from settings.SITE.MP3PLAYER.single
     * if mode==multi, MUSIC attr value should be {urls: [], titles: []}  (didnt check this yet though)
     */
    mdl.directive('mp3Player', ['PROJECT_ROOT_FOLDER', 'APP_ROOT_FOLDER', 'configService',
        function (PROJECT, ROOT, configService) {

            var config = configService.get().mp3player;

            return {
                restrict: 'E',
                templateUrl: ROOT + 'music/templates/mp3player.html',
                scope: {
                    music: '='
                },
                link: function ($scope, elt, args) {

                    //console.log('args: ', args.mode, args.music, args.width, args.height)

                    var options = config.common;
                    
//                    console.log(options.height);
//                    options.height = 40;
//                    options.test = '3';
//                    console.log(options.height, options);
                    
                    $scope.mode = args.mode;

                    if ($scope.mode === 'single') {
                        $scope.flashPath = PROJECT + 'flash/player_mp3_maxi.swf';
                        //ng.extend(options, config['single']);
                        ng.extend(options, config.single);
                        options.mp3 = $scope.music;

                    } else if ($scope.mode === 'multi') {
                        $scope.flashPath = PROJECT + 'flash/player_mp3_multi.swf';
                        ng.extend(options, config.multi);
                        options.mp3 = $scope.music.urls;
                        options.titles = $scope.music.titles;
                    }

                    //console.log(config)
                    //console.log(options)
                    //console.log(options['width'])

                    if (args.width) {
                        options.width = args.width;
                    }
                    
                    $scope.width = options.width;

                    if (args.height) {
                        options.height = args.height;
                    }
                    $scope.height = options.height;
                    //console.log(options['width']);
                    
//                    $scope.height = 40;
                    
                    $scope.$watch(function () {
                        return $scope.music;
                    }, function (value) {
                        options.mp3 = value;
                        var serializedOptions = [],
                            key,
                            item;
                        
                        for (key in options) {
                            item = key + '=' + options[key];
                            serializedOptions.push(item);
                        }
                        serializedOptions = serializedOptions.join('&');
                        $scope.options = serializedOptions;
                    });



                }
            };

        }]);


}(angular));