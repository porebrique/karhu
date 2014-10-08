(function(ng){

var mdl = ng.module('EventModule');

/*
mdl.service('Event', ['$resource', function($resource) {
	  var self = this;
	  var R = $resource('/get_events', {}, {
			//query: {method: 'GET', params: {}, isArray: false}
			query: {isArray: true, cache: false}
		});
	  
	  self.data = [];
	  
	  self.refresh = function(args){
		  R.query(args, function(answer){
			  self.data = answer;
		  })
	  }
	  
	  self.get = function(args) {
		  R.query(args, function(answer){
			  self.data = answer;
		  })		  
	  }

}]);
*/

mdl.service('Event', ['$resource', function($resource) {
	  var self = this;
	  var R = $resource('/api/logs/:id', {}, {
			//query: {method: 'GET', params: {}, isArray: false}
			query: {isArray: false, cache: false}
		});
	  
	  self.filterParams = {};
	  
	  self.get = function(args){
		  var a = R.query(args, function(answer){
			  //self.data = answer;
			  //self.total = self.data.length;
		  })
		  console.log(a)
		  return a
	  }
	  
	  self.query = R.query;
	  
	  self.query2 = function(args){
		  var r = R.query(args);
		  
		  r.$promise.then(function(answer){
			  r.collection = answer.collection
			  r.length = answer.length
			  
	  	})
	  	return r
	  }
	  
}]);


/*
mdl.factory('Event', ['$resource',  function($resource) {

	  var R = $resource('/get_events', {}, {
			//query: {method: 'GET', params: {}, isArray: false}
			query: {isArray: true, cache: false}
		});
	  
	  var data = [];
	  
	  function refresh(args){
		  R.query(args, function(answer){
			  console.log('refresh')
			  data = answer;
		  });
	  };
	  
	  function getData() {return data;}
	  
	  var E = {
		data: data,
		getData: getData,
		refresh: refresh
	  }
	  
	  return E;
}]);
*/
})(angular);