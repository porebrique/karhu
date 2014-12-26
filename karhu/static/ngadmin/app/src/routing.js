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
                    resolve: RESOLVES.root,
                    data: {},
                    controller: 'RootCtrl',
                    templateUrl: ROOT + 'templates/root.html'
                })
                .state('home', {
                    parent: 'root',
                    //url: 'home',
                    url: '',
                    templateUrl: ROOT + 'templates/home.html'
                    //controller: 'HomeCtrl',
                })
                .state('404', {
                    parent: 'root',
                    url: '404',
                    templateUrl: tmpl('common', '404')
                })
                .state('lineup', {
                    abstract: true,
                    parent: 'root',
                    url: 'lineup',
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
                /*
                    resolve: {
                        //LineupService: 'Event',
                        $inject: '$injector',
                        resolvedData: function ($injector) {
                            var obj = $injector.get('Lineup.Person');
                            console.log($injector, obj);
                            return 'some fake data';
                        }
                    },
                    */
                    controller: 'LineupPersonCtrl'
                    
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
                .state('gallery.add_folder', {
                    url: '/folders/new',
                    templateUrl: tmpl('gallery', 'folder'),
                    controller: 'GalleryFolderCtrl'
                })
                .state('events', {
                    parent: 'root',
                    url: 'events',
                    template: '<ui-view/>'
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
                    parent: 'root',
                    template: '<ui-view/>',
                    url: 'blog'
                })
                .state('blog.list', {
                    url: '/list',
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




}(angular));