/*global angular, console  */
(function (ng) {
    'use strict';

    var mdl = ng.module('ResolvesModule', []);
    
/*
This module doesnt survive minification, can't figure out why yet.
*/
    
    
    function getParams(stateParams) {
        var params = stateParams.page ? {page: stateParams.page} : null;
        return params;
    }
    
    mdl.constant('RESOLVES', {
        admin: {
            $state: '$state',
            $stateParams: '$stateParams',
            configService: 'configService',
            CONFIG: function (configService) {
                var answer =  configService.get();
                return answer;
            }
        },
        
        Blog: {
            PostService: 'Blog.Post'
        },
        BlogListCtrl: {
            resolvedData: function ($stateParams, PostService) {
                return PostService.getList(getParams($stateParams));
            }
        },
        BlogPostCtrl: {
            resolvedData: function ($stateParams, PostService) {
                return PostService.getOne($stateParams.post_id);
            }
        },
        Events: {
            EventService: 'Event'
        },
        EventsListCtrl: {
            resolvedData: function (EventService) {
                return EventService.getList();
            }
        },
        EventCtrl: {
            $stateParams: '$stateParams',
            resolvedData: function ($stateParams, EventService) {
                return EventService.getOne($stateParams.event_id);
            }
        },
        
        Gallery: {
            Gallery: 'Gallery'
        },
        GalleryListCtrl: {
            resolvedData: function (CONFIG, Gallery) {
                Gallery.setConfig(CONFIG);
                return Gallery.Folder.getList({request_type: 'list'});
            }
        },
        GalleryFolderCtrl: {
            $q: '$q',
            $stateParams: '$stateParams',
            resolvedData: function ($q, $stateParams, CONFIG, Gallery) {
                Gallery.setConfig(CONFIG);
                return Gallery.Folder.getList();
            }
        },
        
        Lineup: {
            $q: '$q',
            LineupService: 'Lineup'
        },
        LineupListCtrl: {
            resolvedData: function ($q, CONFIG, LineupService) {
//                var reqs = [
//                    LineupService.Person.getList(),
//                    LineupService.Topic.getList(),
//                    LineupService.Note.getList()
//                ];
                LineupService.Person.setConfig(CONFIG);
//                return $q.all(reqs);
                return LineupService.Person.getList();
            }
        },
        LineupPersonCtrl: {
            $stateParams: '$stateParams',
            resolvedData: function ($q, $stateParams, CONFIG, LineupService) {
//                var reqs = [LineupService.Person.getOne($stateParams.person_id),
//                            LineupService.Topic.getList()];
                    
//                if ($stateParams.person_id) {
//                    reqs.push(LineupService.Note.getList({person: $stateParams.person_id}));
//                }
                              
                
                LineupService.Person.setConfig(CONFIG);
//                return $q.all(reqs);
                return LineupService.Person.getOne($stateParams.person_id);
            }
        },
        Music: {
            $q: '$q',
            Music: 'Music'
        },
        MusicListCtrl: {
            resolvedData: function (CONFIG, Music) {
                Music.setConfig(CONFIG);
                return Music.Album.getList();
            }
        },
        MusicAlbumCtrl: {
            $stateParams: '$stateParams',
            resolvedData: function ($stateParams, CONFIG, Music) {
                Music.setConfig(CONFIG);
                return Music.Album.getOne($stateParams.album_id);
            
            }
        },
        MusicSongCtrl: {
            $q: '$q',
            $stateParams: '$stateParams',
            resolvedData: function ($q, $stateParams, CONFIG, Music) {
                var reqs = [Music.Album.getList({type: 'short'}),
                            Music.Song.getOne($stateParams.song_id)];
                return $q.all(reqs);
                            
            }
        },
        Pagelets: {
            $q: '$q',
            Pagelet: 'Pagelet',
            Slot: 'Slot'
        },
        PageletsListCtrl: {
            resolvedData: function ($q, Pagelet, Slot) {
                var reqs = [
                    Pagelet.getList(),
                    Slot.getList()
                ];
                return $q.all(reqs);
            }
        },
        PageletsPageletCtrl: {
            resolvedData: function ($stateParams, Pagelet) {
                return Pagelet.getOne($stateParams.pagelet_id);
            }
        },
        PageletsSlotCtrl: {
            resolvedData: function ($q, $stateParams, Pagelet, Slot) {
                var reqs = [Pagelet.getList(),
                            Slot.getOne($stateParams.slot_id)
                           ];
                return $q.all(reqs);
            }
        }
                 

    });

}(angular));