(function(ng){


var mdl = ng.module('MusicModule');

mdl.factory('Music.Album', ['API_URL', '$resource',  function(API_URL, $resource) {

	var R =  $resource(API_URL + 'music/albums/:id', { id: '@id'}, {update: {method: 'POST'}})

	return R

}]);


mdl.factory('Music.Song', ['API_URL', '$resource',  function(API_URL, $resource) {

	function url(id, action){
		var base_url = API_URL + 'music/songs';
		var url = ng.isDefined(id) ? base_url + '/' + id : base_url;
		url = ng.isDefined(action) ? url + '/' + action : url;
		return url
	}
	
	var R =  $resource(url(':id', ':action'), { id: '@id', action: '@action'  }, 
			{update: {method: 'POST'},
			 //action: {method: 'POST', params: {id: '@id', action: '@action'}}
			});

	R.url = url
	
	return R

}]);


})(angular);