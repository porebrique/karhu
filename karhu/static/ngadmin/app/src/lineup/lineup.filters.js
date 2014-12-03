/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('LineupModule');

    mdl.filter('for_person_list', function () {
        return function (topics, person_id) {
            //console.log(person_id);
            return topics;
        };
    });

}(angular));