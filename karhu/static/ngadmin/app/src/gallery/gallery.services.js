/*global angular, console */
(function (ng) {
    'use strict';

    var mdl = ng.module('GalleryModule');

    function url(base_url, id, action) {
        var u = ng.isDefined(id) ? base_url + '/' + id : base_url;
        u = ng.isDefined(action) ? u + '/' + action : u;
        return u;
    }

    mdl.factory('Gallery.Folder', ['Restangular', 'RestangularResourceTemplate',
        function (Restangular, Resource) {
            var R = Resource.provideResource('gallery/folders');
     
            /*
            R.setConfig = function (Config) {
                R.config = {cover: {
                    width: Config.music.thumbnail_width,
                    height: Config.music.thumbnail_height
                }};
            };
            */
            R.getUploadUrl = function (id) {
                return R.baseUrl + id + '/upload_image/';
            };

            
            return R;

        }]);

    mdl.factory('Gallery.Image', ['Restangular', 'RestangularResourceTemplate',
        function (Restangular, Resource) {
            var R = Resource.provideResource('gallery/images');

            
            R.getUploadUrl = function (id) {
                //return R.baseUrl + id + '/upload/';
                return R.baseUrl + id;
                //return R.baseUrl;
            };
            R.moveImagesTo = function (folder_id, images) {
                console.log('Migrating images:', images);
                var answer = R.customPatch(R.baseUrl + 'migrate/',
                                           {images: images, folder: folder_id});
                
                console.log(answer);
                return answer;
            };

            return R;

        }]);
    
    mdl.factory('Gallery', [ 'configService', 'Gallery.Folder', 'Gallery.Image', function (Config, Folder, Image) {
        
        var G = {Folder: Folder, Image: Image};
        
        G.setConfig = function (config) {
            G.config = config.gallery;
        };
        
        return G;
    
    }]);
}(angular));