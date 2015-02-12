/*global angular, console */
(function (ng) {
    'use strict';

    var mdl = ng.module('MusicModule');
/*
    function url(base_url, id, action) {
        var url = ng.isDefined(id) ? base_url + '/' + id : base_url;
        url = ng.isDefined(action) ? url + '/' + action : url;
        return url;
    }
*/

    mdl.factory('Music.Album', ['Restangular', 'RestangularResourceTemplate', 'configService',
        function (Restangular, Resource, Config) {
            var R = Resource.provideResource('music/albums');
            
            /*
            R.config = {};
            
            R.setConfig = function (config) {
                R.config.cover = {
                    width: config.music.thumbnail_width,
                    height: config.music.thumbnail_height
                };
            };
            */
            R.getCropUrl = function (id) {
                return R.baseUrl + id + '/crop_cover/';
            };
            R.getUploadUrl = function (id) {
                return R.baseUrl + id + '/upload_cover/';
            };

            return R;

        }]);

    mdl.factory('Music.Song', ['Restangular', 'RestangularResourceTemplate', 'configService',
        function (Restangular, Resource, Config) {
            var R = Resource.provideResource('music/songs');
            
            R.getUploadUrl = function (id) {
                //return R.baseUrl + id + '/upload/';
                return R.baseUrl + id + '/upload_mp3/';
                //return R.baseUrl;
            };
            
            R.clearMp3 = function (id) {
                return R.customPatch(R.baseUrl + id + '/clear_mp3/');
            };
            
            return R;

        }]);
    
    
    mdl.factory('Music', ['Music.Album', 'Music.Song', function (Album, Song) {
        
        var M = {Album: Album, Song: Song};
        
        M.setConfig = function (config) {
            M.config = config.music;
        };
        
        return M;
    
    }]);

}(angular));