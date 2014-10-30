(function(ng){


var mdl = ng.module('MusicModule');

mdl.factory('Music.Album', ['API_URL', '$resource',  function(API_URL, $resource) {

	var R =  $resource(API_URL + 'music/albums/:id', { id: '@id' }, {update: {method: 'POST'}})

	return R

}]);


mdl.factory('Music.Song', ['API_URL', '$resource',  function(API_URL, $resource) {

	var R =  $resource(API_URL + 'music/songs/:id', { id: '@id' }, {update: {method: 'POST'}})

	return R

}]);


})(angular);