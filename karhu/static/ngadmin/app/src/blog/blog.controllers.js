/*global angular, console*/
(function (ng) {
    'use strict';
    var mdl = ng.module('BlogModule');

    mdl.controller('BlogListCtrl',
                   ['$scope', '$sce', 'Restangular', 'resolvedData', 'Blog.Post',
        function ($scope, $sce, Restangular, resolvedData, Post) {

            $scope.blog = {};
            /*
            Post.getList().then(function (response) {
                $scope.blog.posts = response;
            });
            */
            $scope.blog.posts = resolvedData;

            $scope.removePost = function (post) {
                Post.removeFromList($scope.blog.posts, post);
            };

        }]);


    mdl.controller('BlogPostCtrl', ['$scope', 'Restangular', 'Blog.Post', '$stateParams', '$state', 'resolvedData',
        function ($scope, Restangular, Post, $stateParams, $state, resolvedData) {

            //var post_id = $stateParams.post_id;

            /*
            Post.getOne(post_id).then(function (response) {
                $scope.post = response;
            });
            */
            $scope.post = resolvedData;


            $scope.save = function () {
                $scope.is.saving = true;
                Post.save($scope.post).then(function (response) {
                    $scope.is.saving = false;
                    $scope.post = response;
                    $state.go('blog.list');
                });

            };

            $scope.deletePost = function () {
                $scope.is.deleting = true;
                Post.remove($scope.post).then(function () {
                    $scope.is.deleting = false;
                    $state.go('blog.list');
                });
            };
            
            $scope.is = {
                saving: false,
                deleting: false
            };

        }]);


}(angular));