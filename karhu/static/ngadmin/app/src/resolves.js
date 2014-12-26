/*global angular, console  */
(function (ng, $) {
    'use strict';

    var mdl = ng.module('ResolvesModule', []);

    
    
    /*
    function getOneList(Service) {
        return Service.getList();
    }
    
        function getOneItem(Service, id) {
        return Service.getOne(id);
    }

    

    function getManyLists($q, Service) {
        var reqs = [LineupService.Person.getList(),
                    LineupService.Topic.getList(),
                    LineupService.Note.getList()],
            promise = $q.all(reqs);

        console.log('resolve func');

        return promise;
    }
    */
    mdl.constant('RESOLVES', {
        root: {
            configService: 'configService',
            CONFIG: function (configService) {
                //console.log('root resolving');
                var c = configService.get().$promise;
                //console.log('were in resolving, returning ', c)
                return c;
            }
        },
        EventsListCtrl: {
            EventService: 'Event',
            resolvedData: function (EventService) {
                return EventService.getList();
                //return getOneList(EventService);
                
            }
        },
        EventCtrl: {
            EventService: 'Event',
            $stateParams: '$stateParams',
            resolvedData: function ($stateParams, EventService) {
                return EventService.getOne($stateParams.event_id);
                //return getOneItem(EventService, $stateParams.event_id);
            }
        },
        BlogListCtrl: {
            PostService: 'Blog.Post',
            resolvedData: function (PostService) {
                return PostService.getList();
            }
        },
        BlogPostCtrl: {
            PostService: 'Blog.Post',
            $stateParams: '$stateParams',
            resolvedData: function ($stateParams, PostService) {
                return PostService.getOne($stateParams.post_id);
            }
        },
        LineupListCtrl: {
            Topic: 'Lineup.Topic',
            Note: 'Lineup.Note',
            Person: 'Lineup.Person',
            $q: '$q',
            resolvedData: function ($q, Topic, Note, Person) {
               // console.log('lineup state resolve');
                var reqs = [
                    //LineupService.Person.getList(),
                    Person.getList(),
                    Topic.getList(),
                    Note.getList()
                ],
                    promise = $q.all(reqs);
                
                return promise;
            }
        },
        LineupPersonCtrl: {
            Topic: 'Lineup.Topic',
            Note: 'Linup.Note',
            $stateParams: '$stateParams',
            $q: '$q',
            resolvedData: function ($q, $stateParams, Topic, Note) {
                var reqs = [LineupService.Person.getOne($stateParams.person_id),
                            Topic.getList(),
                            Note.getList()],
                    promise = $q.all(reqs);

                console.log('resolve func');

                return promise;
            }
        }

    });

}(angular));