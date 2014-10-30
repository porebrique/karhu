'use strict';
(function(ng){
	
var mdl = ng.module('BlogModule');

mdl.controller('BlogFeedCtrl', ['$scope', 'Blog', function($scope, Blog){

	$scope.blog = {posts: []}
	
	$scope.blog.posts = Blog.query();
	/*
	Blog.query(function(response){
		console.log('gor blog!', ng.fromJson(response));
		$scope.blog = response;
	})
	*/
	
}]);


mdl.controller('BlogPostEditCtrl', ['$scope', 'Blog', '$stateParams', '$state', function($scope, Blog, $stateParams, $state){
	
	//console.log('blog.post.edit, post.id is', $stateParams.post_id)
	
	$scope.someNoop = function(){}
	
	if ($stateParams.post_id == 'new') {
		$scope.post = new Blog();	
		$scope.post.id = null;
	} else {
		$scope.post = Blog.get({id: $stateParams.post_id});
	}
	
	$scope.save = function(){
		if ($scope.post.id) {
			//console.log('there is post.id, updating', $scope.post)
			$scope.post.$update(function(){
				$state.go('blog.list');
			});
		} else {
			//console.log('there is NO post.id, creating new');
			$scope.post.$save(function(){
				$state.go('blog.list');
			});			
		}
	}
	$scope.delete = function(){
		//console.log('Deleting post ', $scope.post)
		$scope.post.$delete()
		.then(function(){
			$state.go('blog.list');
		})
		
	}
	
}])

	
})(angular)
