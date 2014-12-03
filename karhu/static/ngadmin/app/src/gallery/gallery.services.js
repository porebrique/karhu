(function(ng){


var mdl = ng.module('GalleryModule');

function url(base_url, id, action){
	var url = ng.isDefined(id) ? base_url + '/' + id : base_url;
	url = ng.isDefined(action) ? url + '/' + action : url;
	return url
};

mdl.factory('Gallery.Folder', ['API_URL', '$resource', 'configService', function(API_URL, $resource, Config) {
	
	var base_url = API_URL + 'gallery/folders';
	
	var R =  $resource(url(base_url, ':id', ':action'), 
						{ id: '@id', action: '@action'}, 
						{update: {method: 'POST'}})

	R.url = function(id, action) {
		return url(base_url, id, action );
	}
	
	return R

}]);


mdl.factory('Gallery.Image', ['API_URL', '$resource', 'configService', function(API_URL, $resource, Config) {
	
	var base_url = API_URL + 'gallery/images';
	
	function transformResponse(data){
		var parsedData = ng.fromJson(data);
		if (ng.isArray(parsedData)) {
			ng.forEach(parsedData, function(item){
				item.local = {};
			})
		} else {
			parsedData.local = {}
		}
		return parsedData;
	}

	var R =  $resource(url(base_url, ':id', ':action'),
						{ id: '@id', action: '@action'},
						{
						get  : {transformResponse: transformResponse},
						query: {transformResponse: transformResponse, isArray: true}
						}
						
						)

	R.url = function(id, action) {
		return url(base_url, id, action );
	}
	
	return R

}]);


})(angular);