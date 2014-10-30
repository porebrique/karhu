(function(ng){

var mdl = ng.module('LineupModule');


mdl.factory('Lineup.Topic', ['API_URL', '$resource', '$http', function(API_URL, $resource, $http) {

/*

  надо:
  
  * получить топики и ноты, отдельно или в персоне
  * создавать топик постом
  * удалять топик делетом
  * изменять ноту, но в составе персоны
  
 
 */
	
	R = {}
	
	return R
	
}]);

mdl.factory('Lineup.Person', ['API_URL', '$resource', '$http', function(API_URL, $resource, $http) {
	
	
	var R =  $resource(API_URL + 'lineup/:id', { id: '@id' }, {update: {method: 'POST'}})

	R.topic =  $resource(API_URL + 'lineup/topic/:id', { id: '@id' }, {
		update: {method: 'POST'},
		delete: {method: 'DELETE'}
	})	

	/*
	R.create_topic = function(topic) {
		var request = $http.post(API_URL + 'lineup/create_topic', {topic: topic})
		
		return request; 
	}
	
	R.delete_topic = function(id) {
		//var request = R.topic.$delete({id: id})
		console.log(id)
		var request = $http.delete(API_URL + 'lineup/topic/' + id)
		return request
	}
	*/
	
	var cached = [];
	R.getCached = function(){
		
		if (cached.length > 0) {
			return cached
		} else {
			return R.query()
		}
		
	}
	
	return R;
	
}]);



})(angular);