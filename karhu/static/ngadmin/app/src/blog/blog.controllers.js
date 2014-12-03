/*global $, angular*/
(function (ng) {
    'use strict';
    var mdl = ng.module('BlogModule');

    mdl.controller('BlogFeedCtrl', ['$scope', '$sce', 'Restangular', 'Blog.Post',
        function ($scope, $sce, Restangular, Post) {

            $scope.blog = {};
            Post.getList().then(function (response) {
                $scope.blog.posts = response;
            });


            $scope.removePost = function (post) {
                Post.removeFromList($scope.blog.posts, post);
            };

        }]);


    mdl.controller('BlogPostEditCtrl', ['$scope', 'Restangular', 'Blog.Post', '$stateParams', '$state',
        function ($scope, Restangular, Post, $stateParams, $state) {

            var post_id = $stateParams.post_id;

            Post.getOne(post_id).then(function (response) {
                $scope.post = response;
            });


            $scope.save = function () {
                Post.save($scope.post).then(function (response) {
                    $scope.post = response;
                    $state.go('blog.list');
                });

            };

            $scope.deletePost = function () {
                Post.remove($scope.post).then(function () {
                    $state.go('blog.list');
                });
            };


        }]);



}(angular));