'use strict';
(function(ng){
	
var mdl = ng.module('MusicModule');


mdl.controller('MusicListCtrl', 
		['APP_ROOT_FOLDER', '$scope', '$state', '$sce', '$stateParams', '$modal', 'configService', 'Music.Album', 'separatelinesFilter', 
		function(ROOT, $scope, $state, $sce, $stateParams, $modal, Config, Album, separatelinesFilter){
			
			
			$scope.cover = {
					width: Album.config.cover.width,
					height: Album.config.cover.height,
			}
			
			Album.getList().then(function(response){
				$scope.albums = response;	
				
			})
			
			
			$scope.showLyrics = function(song) {
				var modal = $modal.open({
					templateUrl: ROOT +  'music/templates/modal-lyrics.html',
					controller: ['$scope', function($scope){
						$scope.song = {
								title: song.title,
								lyrics: $sce.trustAsHtml(separatelinesFilter(song.lyrics))
						}
					}]
				});
			}
			
		}]);
	

mdl.controller('MusicListCtrlOld', 
['APP_ROOT_FOLDER', '$scope', '$state', '$sce', '$stateParams', '$modal', 'configService', 'Music.Album', 'separatelinesFilter', 
function(ROOT, $scope, $state, $sce, $stateParams, $modal, Config, Album, separatelinesFilter){
	
	$scope.cover = {
			width: Album.config.cover.width,
			height: Album.config.cover.height,
	}
	
	
	$scope.albums = Album.query();
	
	$scope.showLyrics = function(song) {
		var modal = $modal.open({
			templateUrl: ROOT +  'music/templates/modal-lyrics.html',
			controller: ['$scope', function($scope){
				$scope.song = {
						title: song.title,
						lyrics: $sce.trustAsHtml(separatelinesFilter(song.lyrics))
				}
			}]
		});
	}
	
}]);



mdl.controller('MusicAlbumCtrl', ['$scope', '$state', '$cookies', '$stateParams', 'FileUploader',  'Music.Album', 
function($scope, $state, $cookies, $stateParams, FileUploader, Album){
	
	var csrf_token = $cookies.csrftoken;
	var album_id = $stateParams.album_id
	
	$scope.album = album_id && album_id != 'new' ? Album.get({id: album_id}) : new Album();
	
	$scope.is = {
		clearing_cover: false,
		saving: false,
		deleting: false
	}	

	$scope.save = function(){
		$scope.is.saving = true;
		$scope.album.$save().then(function(response){
			//console.log('got response')
			ng.extend($scope.album, response);
			
			if ($scope.uploader.queue.length > 0) {
				$scope.uploader.queue[0].url = Album.url($scope.album.id, 'upload_cover');
				$scope.uploader.uploadAll()
			} else {
				$scope.is.saving = false;
				//$state.go('music.list');
			}
		})
			
	}
	
	$scope.clearCover = function(){
		$scope.is.clearing_cover = true;
		Album
			.update({id: $scope.album.id, action: 'delete_cover'})
			.$promise
			.then(function(response){
				//$scope.song = response;
				$scope.album.cover.thumbnail.url = null;
				$scope.is.clearing_cover = false;
			})
	}
	
	$scope.delete = function(){
		$scope.is.deleting = true;
		$scope.album.$delete().then(function(response){
			$scope.is.deleting = false;
			//$state.go('music.list');
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
	       onSuccessItem: function(item, response){
	    	   //console.log('file uploaded')
	    	   //console.log(response)
	    	   ng.extend($scope.album, response);
	    	   $scope.album.cover.thumbnail.url = $scope.album.cover.thumbnail.url + '?' + (Math.ceil(Math.random() * 10000)).toString();
	    	   $scope.is.saving = false;
	    	   //$state.go('music.list');
	       }
	});		
			
			
}]);

mdl.controller('MusicSongCtrl', ['$cookies', '$scope', '$state', '$stateParams', 'Music.Album', 'Music.Song', 'FileUploader', function($cookies, $scope, $state, $stateParams, Album, Song, FileUploader){
	
	 var csrf_token = $cookies.csrftoken;
	
	var song_id = $stateParams.song_id;
	var album_id = $stateParams.album_id;
	
	$scope.is = {
			clearingMp3: false,
			saving: false,
			deleting: false
	}
	
	$scope.song = song_id && song_id != 'new' ? Song.get({id: song_id}) : new Song();
	
	$scope.available_albums = Album.query({type: 'short'});
	
	
	if (album_id) { 
		$scope.available_albums.$promise.then(function(albums){
			ng.forEach(albums, function(item) {
				if (album_id == item.id) {
					//console.log('got matching album: ', item)
					$scope.song.album = item;
				}
			});		
			
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
		$scope.is.clearingMp3 = true;
		Song
			.update({id: $scope.song.id, action: 'clear_mp3'})
			.$promise
			.then(function(response){
				//$scope.song = response;
				$scope.song.mp3 = null;
				$scope.is.clearingMp3 = false;
			})
	}	


	$scope.save = function(){
		$scope.is.saving = true;
		$scope.song.$save().then(function(response){
			ng.extend($scope.song, response);
			if ($scope.uploader.queue.length > 0) {
				$scope.uploader.queue[0].url = Song.url($scope.song.id, 'upload_mp3');
				$scope.uploader.uploadAll()
			} else {
				$scope.is.saving = false;
				$state.go('music.list');
			}
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
	    	   $state.go('music.list');
	       }
	});	

	
}]);


	
})(angular)
