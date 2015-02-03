/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('LineupModule');

    mdl.factory('Lineup.Topic', ['RestangularResourceTemplate', 'configService',
             function (Resource, Config) {
            var R = Resource.provideResource('lineup/topics');
            R.getNotesForList = function (id) {};
            return R;
        }]);

    mdl.factory('Lineup.Note', ['RestangularResourceTemplate', 'configService',
             function (Resource, Config) {
            var R = Resource.provideResource('lineup/notes');
            R.getNotesForList = function (id) {};
            return R;
        }]);

    mdl.factory('Lineup.Person', ['RestangularResourceTemplate',
                                  'configService',
            function (Resource, configService) {
            var Config = configService,
                R = Resource.provideResource('lineup/people');
            
            R.config = {};
                
            R.setConfig = function (config) {
                R.config.thumbnail = {
                    width: Config.get().lineup.thumbnail_width,
                    height: Config.get().lineup.thumbnail_height
                };
            };
            
            R.getCropUrl = function (id) {
                return R.baseUrl + id + '/crop_photo/';
            };
                
            R.getUploadUrl = function (id) {
                return R.baseUrl + id + '/upload_photo/';
            };

                
            return R;
        }]);

    mdl.factory('Lineup', ['Lineup.Person', 'Lineup.Topic', 'Lineup.Note', function (Person, Topic, Note) {
    
        return {
            Person: Person,
            Topic: Topic,
            Note: Note
        };
    }]);
    
}(angular));