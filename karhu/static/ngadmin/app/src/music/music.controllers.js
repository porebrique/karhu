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

mdl.controller('MusicSongCtrl', ['$scope', '$state', '$stateParams', 'Music.Album', 'Music.Song', function($scope, $state, $stateParams, Album, Song){
	
	var song_id = $stateParams.song_id;
	
	$scope.song = song_id && song_id != 'new' ? Song.get({id: $stateParams.song_id}) : new Song();
	
	$scope.available_albums = Album.query({type: 'short'});
}]);


	
})(angular)
