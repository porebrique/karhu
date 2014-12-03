'use strict';
(function(ng){
	
var mdl = ng.module('GalleryModule');

mdl.controller('GalleryListCtrl', 
['APP_ROOT_FOLDER', '$scope', '$state', '$stateParams', '$modal', 'configService', 'Gallery.Folder', 
function(ROOT, $scope, $state, $stateParams, $modal, configService, Folder){

	$scope.folders = Folder.query();
	
	var config = configService.get();
	$scope.cover = {
			width: config.gallery.cover_width,
			height: config.gallery.cover_height
	}
			
			
}]);
	

mdl.controller('GalleryFolderCtrl', 
['APP_ROOT_FOLDER', '$scope', '$cookies', '$state', '$stateParams', '$modal', 'FileUploader', 'configService', 'Gallery.Folder', 'Gallery.Image',
function(ROOT, $scope, $cookies, $state, $stateParams, $modal, FileUploader, configService, Folder, Image){
			
	var galleryConfig = configService.get().gallery;
	
	
	$scope.config = {
			cover:  {
				width: galleryConfig.cover_width,
				height: galleryConfig.cover_height
			},
			thumbnail: {
				width: galleryConfig.thumbnail_width,
				height: galleryConfig.thumbnail_height,
			}
	}
	
	$scope.folders = Folder.query();
	
	var folder_id = $stateParams.folder_id;
	
	if (folder_id && folder_id != 'new') { 
		$scope.folder = Folder.get({id: folder_id});
		$scope.images = Image.query({folder: $scope.folder.id})
	} else {
		$scope.folder =  new Folder();
	}
	
	
	$scope.is = {
		processingImage: null,
		uploadingImage: false
	}
	
	
	$scope.uploader = new FileUploader({
		  url:  Image.url(),
		  queueLimit: 5,
	      headers : {
	    	  //'Content-Type': 'multipart/form-data',
	    	  //'Content-Type': 'application/json',
	          'X-CSRFToken' : $cookies.csrftoken
	       },
	       onAfterAddingFile: function(file){
	    	   //console.log('File added: ', file)
	    	   file.formData = [{folder_id: $scope.folder.id}];
	    	   
	    	   var img = new Image();
	    	   img.local = {pending: true}
	    	   $scope.images.push(img);
	    	   
	    	   file.onSuccess = function(response, status, headers) {
	    		   file.remove();
	    		   img.local.pending = false;
	    		   console.log('uploaded, got: ', response);
	    		   ng.extend(img, response);
	    		   
	    	   }
	    	   file.uploader.uploadAll();
	       },
	       onSuccessItem: function(item, response){
	    	   return false;
	    	   /*
	    	   var img = new Image({id: response.id, urls: response.urls});
	    	   $scope.images.push(img);
	    	   $scope.is.uploadingImage = false;
	    	   */
	       }
	});
	
	
	$scope.selectedImages = [];
	$scope.selectImage = function(img) {
		$scope.selectedImages.push(img);
		img.$save();
	} 
	
	$scope.saveFolder = function() {
		$scope.folder.$save().then(function(response){
			console.log('Folder saved: ', response);
			
		})
	}
	
	$scope.deleteImage = function(image, index){
		image.local.pending = true;
		image.$delete().then(function(response){
			$scope.images.splice(index, 1)
		})
	}
	
	$scope.setAsCover = function(image) {
		
	}
	
}]);


})(angular)
