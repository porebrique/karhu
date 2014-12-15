/*global angular, console */
(function (ng) {
    'use strict';

    var mdl = ng.module('GalleryModule');

    function url(base_url, id, action) {
        var u = ng.isDefined(id) ? base_url + '/' + id : base_url;
        u = ng.isDefined(action) ? u + '/' + action : u;
        return u;
    }

    mdl.factory('Gallery.Folder', ['Restangular', 'RestangularResourceTemplate', 'configService',
        function (Restangular, Resource, Config) {
            var R = Resource.provideResource('gallery/folders');
     
            R.config = {};
            R.config.cover = {
                width: Config.get().music.thumbnail_width,
                height: Config.get().music.thumbnail_height
            };
            
            R.getUploadUrl = function (id) {
                return R.baseUrl + id + '/upload_image/';
            };

            
            
            return R;

        }]);

    mdl.factory('Gallery.Image', ['Restangular', 'RestangularResourceTemplate', 'configService',
        function (Restangular, Resource, Config) {
            var R = Resource.provideResource('gallery/images');

            R.config = Config.get().gallery;
            
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
        
        G.config = Config.get().gallery;
        
        return G;
    
    }]);
/*
    mdl.factory('Gallery.Folder.Old', ['API_URL', '$resource', 'configService',
        function (API_URL, $resource, Config) {

            var base_url = API_URL + 'gallery/folders';

            var R = $resource(url(base_url, ':id', ':action'), {
                id: '@id',
                action: '@action'
            }, {
                update: {
                    method: 'POST'
                }
            });

            R.url = function (id, action) {
                return url(base_url, id, action);
            };

            return R;

        }]);


    mdl.factory('Gallery.Image.Old', ['API_URL', '$resource', 'configService',
        function (API_URL, $resource, Config) {

            var base_url = API_URL + 'gallery/images';

            function transformResponse(data) {
                var parsedData = ng.fromJson(data);
                if (ng.isArray(parsedData)) {
                    ng.forEach(parsedData, function (item) {
                        item.local = {};
                    });
                } else {
                    parsedData.local = {};
                }
                return parsedData;
            }

            var R = $resource(url(base_url, ':id', ':action'), {
                    id: '@id',
                    action: '@action'
                }, {
                    get: {
                        transformResponse: transformResponse
                    },
                    query: {
                        transformResponse: transformResponse,
                        isArray: true
                    }
                }

                    );

            R.url = function (id, action) {
                return url(base_url, id, action);
            };

            return R;

        }]);
*/
}(angular));