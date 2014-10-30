'use strict';
(function(ng){
	
var mdl = ng.module('LineupModule');


mdl.controller('LineupListCtrl', ['$scope', '$http', '$modal', 'Lineup.Person', function($scope, $http, $modal, Lineup){

	$scope.modelArray = ['232', '23423', '234234']
	/*
	$scope.lineup = [
	                 {
	                	id: 1,
	                	photo: {
	                		thumbnail: {width: 130, height: 100}
	                	},
	                	portrait_url: 'http://localhost:8000/files/cache/lineup/1/person_1_photo_thumbnail.png?random=0.125316696196',
	                	name: 'Some Guy',
	                	role: 'Guitarist',
	                	notes: [
	                	        {topic: {title: 'Favorite drink'}, text: 'Tequila'}
	                	        ]
	                	
	                	 
	                 }
	                 ]
	*/
	
	$scope.lineup = Lineup.getCached();
	
	$scope.items = [1,2,3,4];
	
	$scope.sortableItems = ng.forEach($scope.lineup, function(item){
		
	})
	
	$scope.lineupSortableMapping = {
		id: 'id',
		text: 'name',
		order: 'order'
	}
	
}]);



mdl.controller('LineupSortingCtrl', ['$scope', '$http', function($scope, $http){
	
	
}]);


mdl.controller('LineupPersonCtrl', ['$scope', '$state', '$stateParams', 'Lineup.Person', '$http', function($scope, $state,$stateParams, Lineup, $http){
	
	if ($stateParams.person_id == 'new') {
		$scope.person =  new Lineup()
		//$scope.person.id = 'new';
		$scope.person.id = null;
		$scope.person.notepack = Lineup.topic.query()
	} else {
		var person_id = $stateParams.person_id;
		$scope.person = Lineup.get({id: person_id})
	}
	
	$scope.newtopic = '';
	
	$scope.create_topic = function(){
		
		if ($scope.newtopic != '') {
			var topic = new Lineup.topic({title: $scope.newtopic})
			topic
				.$save()
				.then(function(response){
					$scope.person.notepack.push({topic: {id: response.id, title: response.title}, note: {}});
					$scope.newtopic = '';
			})
		}
	}
	
	$scope.delete_topic = function(note, index){
		
		var topic = new Lineup.topic({id: note.topic.id});
		topic
			.$delete()
			.then(function(response){
			$scope.person.notepack.splice(index, 1);
		})
		
	}	
	
	$scope.save = function(){
		if ($scope.person.id) {
			console.log('there is id, updating', $scope.person)
			$scope.person.$update(function(){
				//$state.go('lineup.list');
			});

		} else {
			console.log('new person')
			$scope.person.$save(function(){
				//$state.go('lineup.list');
			});			
						

		}
	}
	$scope.delete = function(){
		//console.log('Deleting post ', $scope.post)
		$scope.person.$delete(function(){
			$state.go('lineup.list');
		})
		
	}
	
}]);




	
})(angular)
