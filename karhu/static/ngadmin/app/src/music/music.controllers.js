'use strict';
(function(ng){
	
var mdl = ng.module('MusicModule');

	

mdl.controller('MusicListCtrl', ['$scope', '$state', '$stateParams', 'Music.Album', function($scope, $state, $stateParams, Album){
	
	$scope.albums = Album.query();
	
	$scope.showLyrics = function(song) {
		console.log('PEW PEW modal with lyrics')
	}
	
}]);



mdl.controller('MusicAlbumCtrl', ['$scope', '$state', '$stateParams', 'Music.Album', function($scope, $state, $stateParams, Album){
	
	console.log($stateParams)
	
	var album_id = $stateParams.album_id
	
	$scope.album = album_id && album_id != 'new' ? Album.get({id: $stateParams.album_id}) : new Album()
	
	
}]);

mdl.controller('MusicSongCtrl', ['$cookies', '$scope', '$state', '$stateParams', 'Music.Album', 'Music.Song', 'FileUploader', function($cookies, $scope, $state, $stateParams, Album, Song, FileUploader){
	
	 var csrf_token = $cookies.csrftoken;
	
	var song_id = $stateParams.song_id;
	
	$scope.is = {
			saving: false,
			deleting: false
	}
	
	$scope.song = song_id && song_id != 'new' ? Song.get({id: $stateParams.song_id}) : new Song();
	
	$scope.available_albums = Album.query({type: 'short'});
	
	$scope.save = function(){

		$scope.is.saving = true;
		
		$scope.song.$save().then(function(response){

			ng.extend($scope.song, response);
			
			if ($scope.uploader.queue.length > 0) {
				$scope.uploader.queue[0].url = Song.url($scope.song.id, 'upload_mp3');
				$scope.uploader.uploadAll()
			} else {
				$scope.is.saving = false;
				//$state.go('music.list');
			}
		})
			
	}
	
	
	$scope.delete = function(){
		$scope.is.deleting = true;
		$scope.song.$delete().then(function(response){
			$scope.is.deleting = false;
			$state.go('music.list');
		})
	}
	
	$scope.clearMp3 = function(){
		$scope.is.clearing_mp3 = true;
		Song
			.update({id: $scope.song.id, action: 'clear_mp3'})
			.$promise;
			.then(function(response){
				console.log(response)
				$scope.is.clearing_mp3 = false;
			})
	}	
	
	$scope.uploader = new FileUploader({
		  url: '',
		  queueLimit: 1,
		  removeAfterUpload: true,
	      headers : {
	          'X-CSRFToken' : csrf_token // X-CSRF-TOKEN is used for Ruby on Rails Tokens
	       },
	       onAfterAddingFile: function(item){
	    	   //console.log('before upload', $scope.song, $scope.song.id)
	       },
	       onCompleteAll: function(){
	    	   //console.log('file uploaded')
	    	   $scope.is.saving = false;
	    	   //$state.go('music.list');
	       }
	});	

	
}]);


	
})(angular)
