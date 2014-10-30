'use strict';
(function(ng){
	
var mdl = ng.module('CommonModule');




mdl.directive('modalCrop', ['$modal', 'APP_ROOT_FOLDER',  '$http', function($modal, ROOT, $http){
	var modalOptions = {
		templateUrl: ROOT +  'common/templates/modal-sorting.html'
	}
	
	var modalTemplateUrl = ROOT +  'common/templates/modal-crop.html';
	
	return {
		restrict: 'E',
		scope: {
			buttontext: '@',
			source: '@'
		},
		template: '<button type="button" class="btn btn-default"><span class="glyphicon glyphicon-image"></span>{{buttontext}}</button>',
		//templateUrl: ROOT +  'common/templates/modal-sorting.html',
		link: function($scope, element) {
			

			$scope.image = $scope.source;

			$scope.crop = function(){
		    	var url = '/api/admin/lineup/crop_for/' + 1;
		    	var data = {
		    			x1: $scope.obj.coords[0],
		    			y1: $scope.obj.coords[1],
		    			x2: $scope.obj.coords[2],
		    			y2: $scope.obj.coords[3],
		    			width: $scope.obj.coords[4],
		    			height: $scope.obj.coords[5]
		    	}
		    	$http.post(url, data)
		    		.success(function(response){
		    			console.log(response)
		    		})
		    }	
			
			element.click(function(){
				var modal = $modal.open({
					size: 'auto',
					templateUrl: modalTemplateUrl,
					controller: function(){},
				    scope: $scope				
					
				});
				
				modal.result.then(function(result){
					console.log('closed!')
				});
			})
		}
	}
	
}]);


})(angular);
