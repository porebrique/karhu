'use strict';
(function(ng){
	
	var mdl = ng.module('MusicModule');


/*
 * Usage: <mp3-player mode="single|multi" music="song.mp3" width="150" height="26"></mp3-player>
 * WIDTH and HEIGHT are optional and override defaults from settings.SITE.MP3PLAYER.single
 * if mode==multi, MUSIC attr value should be {urls: [], titles: []}  (didnt check this yet though)
 */
mdl.directive('mp3Player', ['PROJECT_ROOT_FOLDER', 'APP_ROOT_FOLDER', 'configService', function(PROJECT, ROOT, configService){

	var config = configService.get().mp3player;
	
	return {
		restrict: 'E',
		templateUrl: ROOT +  'common/templates/mp3player.html',
		scope: {
			music: '='
		},
		link: function($scope, elt, args) {
			
			//console.log('args: ', args.mode, args.music, args.width, args.height)
			
			var options = config.common;
			
			$scope.mode = args.mode;
			
			if( $scope.mode == 'single') {
				$scope.flashPath = PROJECT + 'flash/player_mp3_maxi.swf';
				ng.extend(options, config['single']);
				options['mp3'] = $scope.music;
				
			} else if($scope.mode == 'multi') {
				$scope.flashPath = PROJECT + 'flash/player_mp3_multi.swf';
				ng.extend(options, config['multi'])
				options['mp3'] = $scope.music['urls'];
				options['title'] = $scope.music['titles']
			}
			
			//console.log(config)
			//console.log(options)
			//console.log(options['width'])
			
			if (args.width) {options['width'] = args.width}
			$scope.width = options['width']
			
			if (args.height) {options['height'] = args.height;}			
			$scope.height = options['height'];
			//console.log(options['width']);
			
			$scope.$watch(function(){return $scope.music}, function(value){
				options.mp3 = value;
				var serializedOptions = [];
				for (var key in options) {
					var item = key + '=' + options[key];
					serializedOptions.push(item);
				}
				serializedOptions = serializedOptions.join('&')
				$scope.options = serializedOptions;
			})
			
			
			
		}
	}

}]);

	
})(angular)