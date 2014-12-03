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
            R.config = {};
            R.config.cover = {
                width: Config.get().music.thumbnail_width,
                height: Config.get().music.thumbnail_height
            };

            R.getUploadUrl = function (id) {
                return R.baseUrl + id + '/upload_cover/';
            };

            return R;

        }]);

    mdl.factory('Music.Song', ['Restangular', 'RestangularResourceTemplate', 'configService',
        function (Restangular, Resource, Config) {
            var R = Resource.provideResource('music/songs');
            return R;

        }]);

}(angular));