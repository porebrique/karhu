'use strict';
(function(ng){
	
var mdl = ng.module('CommonModule');


mdl.filter('trust',['$sce', function($sce) {
    return function(input) {
    	return $sce.trustAsHtml(input);
    };
}]);


mdl.filter('separatelines', function() {
    return function(input) {
    	var lines = input.split('\n'),
    		out = lines.join('<br/>');
    	return out;
    };
  })


mdl.filter('range', function() {
  return function(val, range) {
    range = parseInt(range);
    for (var i=0; i<range; i++) {
      val.push(i);
    }
    return val;
  };
});




})(angular)
