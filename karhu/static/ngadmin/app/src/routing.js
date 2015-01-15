/*global angular, console, routingConfig */
(function (ng, $) {
    'use strict';
    var app = ng.module('App');

    
    app.controller('RootCtrl', ['$scope', '$state', 'CONFIG',
        function ($scope, $state, CONFIG) {
            $scope.resolvedConfig = CONFIG;
            
            //var state = $state.current;
            //console.log('$state data from root ctrl', state.data);
        }]);


    
    app.config(['$stateProvider',
                '$urlRouterProvider',
                '$locationProvider',
                'APP_ROOT_FOLDER',
                'RESOLVES',
                function ($stateProvider,
                           $urlRouterProvider,
                           $locationProvider,
                           APP_ROOT_FOLDER,
                           RESOLVES) {

     
            $urlRouterProvider.otherwise('/');
            //$urlRouterProvider.otherwise('/blog');

            //$locationProvider.html5Mode(true); 
            //troubles with f5, MB I have to add 'ngadmin' to all routes on clientside

            function tmpl(mdl, filename) {
                return APP_ROOT_FOLDER + mdl + '/templates/' + filename + '.html';
            }


            var ROOT = APP_ROOT_FOLDER,
                access = routingConfig.accessLevels;

            $stateProvider
                .state('root', {
                    abstract: true,
                    url: '/',
                    templateUrl: ROOT + 'templates/root.html',
                    data: {}
                })
                .state('admin', {
                    parent: 'root',
                    abstract: true,
                    //url: '/',
                    resolve: RESOLVES.root,
                    data: {
                        secure: true
                    },
                    //controller: 'RootCtrl',
                    templateUrl: ROOT + 'templates/admin.html'
                })
                .state('system', {
                    parent: 'root',
                    template: '<div class="system-template"> <ui-view/> </div>'
                })
                .state('login', {
                    parent: 'system',
                    url: 'login',
                    data: {
                        secure: false
                    },
                    controller: 'auth.LoginCtrl',
                    templateUrl: tmpl('auth', 'login')
                })
                .state('logout', {
                    parent: 'system',
                    url: 'logout',
                    data: {
                        secure: false
                    },
                    templateUrl: tmpl('auth', 'logout')
                })            
                .state('home', {
                    parent: 'admin',
                    //url: 'home',
                    url: '',
                    templateUrl: ROOT + 'templates/home.html'
                })
                .state('404', {
                    parent: 'admin',
                    url: '404',
                    templateUrl: tmpl('common', '404')
                })
                .state('lineup', {
                    abstract: true,
                    parent: 'admin',
                    url: 'lineup',
                    resolve: RESOLVES.Lineup,
                    template: '<ui-view/>'
                })
                .state('lineup.list', {
                    url: '/list',
                    templateUrl: tmpl('lineup', 'list'),
                    controller: 'LineupListCtrl',
                    resolve: RESOLVES.LineupListCtrl
                    
                })
                .state('lineup.person', {
                    url: '/:person_id',
                    templateUrl: tmpl('lineup', 'person'),
                    resolve: RESOLVES.LineupPersonCtrl,
                    controller: 'LineupPersonCtrl'
                    
                })
                .state('music', {
                    parent: 'admin',
                    abstract: true,
                    url: 'music',
                    template: '<ui-view/>',
                    resolve: RESOLVES.Music
                })
                .state('music.list', {
                    url: '/list',
                    templateUrl: tmpl('music', 'list'),
                    controller: 'MusicListCtrl',
                    resolve: RESOLVES.MusicListCtrl
                })
                .state('music.album', {
                    url: '/albums/:album_id',
                    templateUrl: tmpl('music', 'album'),
                    controller: 'MusicAlbumCtrl',
                    resolve: RESOLVES.MusicAlbumCtrl
                })
                .state('music.add_song', {
                    url: '/albums/:album_id/add_song',
                    templateUrl: tmpl('music', 'song'),
                    controller: 'MusicSongCtrl',
                    resolve: RESOLVES.MusicSongCtrl
                    //data: {dunno: 'lol'}
                })
                .state('music.song', {
                    url: '/songs/:song_id',
                    templateUrl: tmpl('music', 'song'),
                    controller: 'MusicSongCtrl',
                    resolve: RESOLVES.MusicSongCtrl
                })
                .state('gallery', {
                    parent: 'admin',
                    abstract: true,
                    url: 'gallery',
                    template: '<ui-view/>',
                    resolve: RESOLVES.Gallery
                })
                .state('gallery.list', {
                    url: '/list',
                    templateUrl: tmpl('gallery', 'list'),
                    controller: 'GalleryListCtrl',
                    resolve: RESOLVES.GalleryListCtrl
                })
                .state('gallery.folder', {
                    url: '/folders/:folder_id',
                    templateUrl: tmpl('gallery', 'folder'),
                    controller: 'GalleryFolderCtrl',
                    resolve: RESOLVES.GalleryFolderCtrl
                })
                .state('gallery.add_folder', {
                    url: '/folders/new',
                    templateUrl: tmpl('gallery', 'folder'),
                    controller: 'GalleryFolderCtrl',
                    resolve: RESOLVES.GalleryFolderCtrl
                })
                .state('events', {
                    parent: 'admin',
                    url: 'events',
                    template: '<ui-view/>',
                    resolve: RESOLVES.Events
                })
                .state('events.list', {
                    url: '/list',
                    templateUrl: tmpl('events', 'list'),
                    controller: 'EventsListCtrl',
                    resolve: RESOLVES.EventsListCtrl
                })
                .state('events.add', {
                    url: '/add',
                    templateUrl: tmpl('events', 'event'),
                    controller: 'EventCtrl',
                    resolve: RESOLVES.EventCtrl
                })
                .state('events.event', {
                    url: '/:event_id',
                    templateUrl: tmpl('events', 'event'),
                    controller: 'EventCtrl',
                    resolve: RESOLVES.EventCtrl
                })
                .state('blog', {
                    abstract: true,
                    parent: 'admin',
                    url: 'blog',
                    template: '<ui-view/>',
                    resolve: RESOLVES.Blog
                })
                .state('blog.list', {
                    url: '/list/:page',
                    templateUrl: tmpl('blog', 'list'),
                    controller: 'BlogListCtrl',
                    resolve: RESOLVES.BlogListCtrl
                    
                })
                .state('blog.post', {
                    url: '/post/:post_id',
                    templateUrl: tmpl('blog', 'post'),
                    controller: 'BlogPostCtrl',
                    resolve: RESOLVES.BlogPostCtrl
                })
                .state('pagelets', {
                    abstract: true,
                    parent: 'admin',
                    template: '<ui-view/>',
                    url: 'pagelets',
                    resolve: RESOLVES.Pagelets
                })
                .state('pagelets.list', {
                    url: '/list',
                    templateUrl: tmpl('pagelets', 'list'),
                    controller: 'PageletsListCtrl',
                    resolve: RESOLVES.PageletsListCtrl
                })
                .state('pagelets.pagelet', {
                    url: '/:pagelet_id',
                    templateUrl: tmpl('pagelets', 'pagelet'),
                    controller: 'PageletsPageletCtrl',
                    resolve: RESOLVES.PageletsPageletCtrl
                })
                .state('pagelets.slot', {
                    url: '/slot/:slot_id',
                    templateUrl: tmpl('pagelets', 'slot'),
                    controller: 'PageletsSlotCtrl',
                    resolve: RESOLVES.PageletsSlotCtrl
                });



        }]);




}(angular));