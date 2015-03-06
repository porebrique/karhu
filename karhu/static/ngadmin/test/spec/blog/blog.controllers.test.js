/*global describe, beforeEach, module, it, inject, expect, angular, console */
describe("Blog", function () {
    'use strict';
    var $controller, $scope, $state, $httpBackend, Post,
        samplePost = {id: 1, title: 'Post title', lead: 'Some intro', text: 'Some text', date_created: 'somedate_idk'};

    
    beforeEach(module('App'));
    beforeEach(module('stateMock'));
    
    beforeEach(inject(function ($injector) {
        $scope = $injector.get('$rootScope').$new();
        $controller = $injector.get('$controller');
        $httpBackend = $injector.get('$httpBackend');
        $state = $injector.get('$state');
        Post = $injector.get('Blog.Post');
    }));
    
    describe('BlogPostCtrl', function () {
        beforeEach(function () {
            $httpBackend.when('GET', Post.baseUrl + samplePost.id + '/').respond(samplePost);
            
            $state.current = {name: 'blog.post'};
            
            Post.getOne(samplePost.id)
                .then(function (response) {
                    $controller('BlogPostCtrl', {$scope: $scope, resolvedData: response});
                });
            $httpBackend.flush();
        });
        
        it('should initially has post with id 1', function () {
            expect($scope.post.id).toEqual(1);
        });
        it('should save post, then clear is.saving flag and go to blog.list', function () {
            $httpBackend.when('PUT', Post.baseUrl + samplePost.id + '/').respond(samplePost);
            $state.expectTransitionTo('blog.list');
            $scope.save()
                .then(function (response) {
                    expect($scope.is.saving).toBe(false);
                });
            $httpBackend.flush();
        });
        
        it('should send DELETE request, then clear is.deleting flag and go to blog.list', function () {
            $httpBackend.when('DELETE', Post.baseUrl + samplePost.id + '/').respond('deleted');
            $state.expectTransitionTo('blog.list');
            $scope.deletePost()
                .then(function () {
                    expect($scope.is.deleting).toBe(false);
                });
            $httpBackend.flush();
        });
        
    });
    
    describe('BlogListCtrl', function () {
        
        beforeEach(function () {
            $httpBackend.when('GET', Post.baseUrl).respond([samplePost]);
            Post.getList()
                .then(function (response) {
                    response.paginator = {};
                    $controller('BlogListCtrl', {$scope: $scope, resolvedData: response});
                });
            $httpBackend.flush();
        });
    
        it('should has one post with id "1"', function () {
            expect($scope.blog.posts.length).toEqual(1);
            expect($scope.blog.posts[0].id).toEqual(1);
        });
        
        it('should be able to remove posts', function () {
            $httpBackend.when('DELETE', Post.baseUrl + '1/').respond('ok');
            var length = $scope.blog.posts.length;
            $scope
                .deletePost($scope.blog.posts[0])
                .then(function (response) {
                    expect($scope.blog.posts.length).toEqual(length - 1);
                });
            $httpBackend.flush();
        });
    });

    
    
    
});