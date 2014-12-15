/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('CommonModule');


    mdl.filter('trust', ['$sce', function ($sce) {
        return function (input) {
            return $sce.trustAsHtml(input);
        };
    }]);


    mdl.filter('separatelines', function () {
        return function (input) {
            var lines = input.split('\n'),
                out = lines.join('<br/>');
            return out;
        };
    });

    mdl.filter('randomizeUrl', function () {
        return function (input) {
            var url = input.split('?')[0];
            url = url + '?' + (Math.ceil(Math.random() * 10000)).toString();
            //console.log(input, url);
            return url;
        };
    });

    mdl.filter('range', function () {
        return function (val, range) {
            var index;
            range = parseInt(range, 10);
            for (index = 0; index < range; index = index + 1) {
                val.push(index);
            }
            return val;
        };
    });


}(angular));