(function (ng, $) {
    'use strict';
    var app = ng.module('App');


    app.controller('RootCtrl', ['$scope', 'CONFIG',
        function ($scope, CONFIG) {
            $scope.resolvedConfig = CONFIG;
        }]);

    app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'APP_ROOT_FOLDER',
        function ($stateProvider, $urlRouterProvider, $locationProvider, APP_ROOT_FOLDER) {
            //app.config(['$stateProvider', '$urlRouterProvider', 'APP_ROOT_FOLDER', 'AuthModule', function($stateProvider, $urlRouterProvider, APP_ROOT_FOLDER, AuthModule){
            $.datepicker.setDefaults({
                dateFormat: 'dd.mm.yy'
            });
            $urlRouterProvider.otherwise('/home');
            //$urlRouterProvider.otherwise('/blog');

            //$locationProvider.html5Mode(true); //troubles with f5, MB I have to add 'ngadmin' to all routes on clientsiode

            function tmpl(mdl, filename) {
                return APP_ROOT_FOLDER + mdl + '/templates/' + filename + '.html';
            }


            var ROOT = APP_ROOT_FOLDER,
                access = routingConfig.accessLevels;

            $stateProvider
                .state('root', {
                    abstract: true,
                    url: '/',
                    resolve: {
                        configService: 'configService',
                        CONFIG: function (configService) {
                            var c = configService.get().$promise;
                            //console.log('were in resolving, returning ', c)
                            return c;
                        }
                    },
                    data: {},
                    controller: 'RootCtrl',
                    templateUrl: ROOT + 'templates/root.html'

                    //template: '<div class="" ng-animate="animate'" ui-view></div>'
                })
                .state('home', {
                    parent: 'root',
                    url: 'home',
                    templateUrl: ROOT + 'templates/home.html'
                    //controller: 'HomeCtrl',
                })
                .state('lineup', {
                    abstract: true,
                    parent: 'root',
                    url: 'lineup',
                    template: '<ui-view/>'
                })
                .state('lineup.list', {
                    url: '/list',
                    controller: 'LineupListCtrl',
                    templateUrl: tmpl('lineup', 'list')
                })
                .state('lineup.person', {
                    url: '/:person_id',
                    controller: 'LineupPersonCtrl',
                    templateUrl: tmpl('lineup', 'person')
                })
                .state('music', {
                    parent: 'root',
                    abstract: true,
                    url: 'music',
                    template: '<ui-view/>'
                })
                .state('music.list', {
                    url: '/list',
                    templateUrl: tmpl('music', 'list'),
                    controller: 'MusicListCtrl'
                })
                .state('music.album', {
                    url: '/albums/:album_id',
                    templateUrl: tmpl('music', 'album'),
                    controller: 'MusicAlbumCtrl'
                })
                .state('music.add_song', {
                    url: '/albums/:album_id/add_song',
                    templateUrl: tmpl('music', 'song'),
                    controller: 'MusicSongCtrl'
                    //data: {dunno: 'lol'}
                })
                .state('music.song', {
                    url: '/songs/:song_id',
                    templateUrl: tmpl('music', 'song'),
                    controller: 'MusicSongCtrl'
                })
                .state('gallery', {
                    parent: 'root',
                    abstract: true,
                    url: 'gallery',
                    template: '<ui-view/>'
                })
                .state('gallery.list', {
                    url: '/list',
                    templateUrl: tmpl('gallery', 'list'),
                    controller: 'GalleryListCtrl'
                })
                .state('gallery.folder', {
                    url: '/folders/:folder_id',
                    templateUrl: tmpl('gallery', 'folder'),
                    controller: 'GalleryFolderCtrl'
                })
                .state('events', {
                    parent: 'root',
                    url: 'events'
                })
                .state('blog', {
                    abstract: true,
                    parent: 'root',
                    template: '<ui-view/>',
                    url: 'blog'
                })
                .state('blog.list', {
                    url: '/list',
                    controller: 'BlogFeedCtrl',
                    templateUrl: tmpl('blog', 'list')
                })
                .state('blog.post', {
                    //parent: 'blog',
                    url: '/post/:post_id',
                    //url: '/:post_id',
                    templateUrl: tmpl('blog', 'post'),
                    controller: 'BlogPostEditCtrl'
                })
                .state('pagelets', {
                    abstract: true,
                    parent: 'root',
                    template: '<ui-view/>',
                    url: 'pagelets'
                })
                .state('pagelets.list', {
                    url: '/list',
                    templateUrl: tmpl('pagelets', 'list'),
                    controller: 'PageletsListCtrl'
                })
                .state('pagelets.pagelet', {
                    url: '/:pagelet_id',
                    templateUrl: tmpl('pagelets', 'pagelet'),
                    controller: 'PageletsPageletCtrl'
                })
                .state('pagelets.slot', {
                    url: '/slot/:slot_id',
                    templateUrl: tmpl('pagelets', 'slot'),
                    controller: 'PageletsSlotCtrl'
                });



        }]);



}(angular, jQuery));