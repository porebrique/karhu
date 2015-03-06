/*global angular, console*/
(function (ng) {
    'use strict';
    var mdl = ng.module('BlogModule');

    mdl.controller('BlogListCtrl',
                   ['$scope', '$sce', 'Restangular', 'resolvedData', 'Blog.Post',
            function ($scope, $sce, Restangular, resolvedData, Post) {

                $scope.blog = {};

                $scope.blog.posts = resolvedData;
                $scope.blog.posts.paginator.pagesize = 5;

                $scope.deletePost = function (post) {
                    return Post.removeFromList($scope.blog.posts, post);
                };

            }]);


    mdl.controller('BlogPostCtrl', ['$scope', 'Blog.Post',  '$state', 'resolvedData',
        function ($scope,  Post,  $state, resolvedData) {

            $scope.post = resolvedData;

            if (!$scope.post.id && $state.current.name === 'blog.post') {
                $state.go('blog.list');
            }
            
            $scope.save = function () {
                $scope.is.saving = true;
                return Post.save($scope.post).then(function (response) {
                    $scope.is.saving = false;
                    //$scope.post = response;
                    $state.go('blog.list');
                });

            };

            $scope.deletePost = function () {
                $scope.is.deleting = true;
                return Post.remove($scope.post).then(function () {
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