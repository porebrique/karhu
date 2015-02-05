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
            
            R.getCropUrl = function (id) {
                return R.baseUrl + id + '/crop_cover/';
            };

            
            return R;

        }]);

    mdl.factory('Gallery.Image', ['Restangular', 'RestangularResourceTemplate',
        function (Restangular, Resource) {
            var R = Resource.provideResource('gallery/images');

            R.getCropUrl = function (id) {
                return R.baseUrl + id + '/crop/';
            };
            
            R.getUploadUrl = function (id) {
                //return R.baseUrl + id + '/upload/';
                return R.baseUrl + id;
                //return R.baseUrl;
            };
            R.moveImagesTo = function (folder_id, images) {
//                console.log('Migrating images:', images);
                var answer = R.customPatch(R.baseUrl + 'migrate/',
                                           {images: images, folder: folder_id});
                
//                console.log(answer);
                return answer;
            };
            
            R.setOrder = function (items) {
                var url = R.baseUrl + 'set_order/',
                    request = [];
//                console.log(items[0]);
                ng.forEach(items, function (item, index) {
                    request.push({id: item.id, order: item.order});
                });
                
//                return R.customPatch(url, {folder_id: items[0].folder, images: request});
                return R.customPatch(url, request);
            
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