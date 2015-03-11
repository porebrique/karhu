/*global angular, jasmine, console, beforeEach */
(function (ng) {
    'use strict';
    
    var customMatchers = {
        toBeRestangularCollection: function (util, customEqualityTesters) {
            return {
                compare: function (actual, expected) {
                    if (expected === undefined) {
                        expected = '';
                    }
                    var result = {pass: false};
                    if (actual.restangularCollection) {
                        result.pass = true;
                    }

                    if (result.pass) {
                        result.message = "Expected " + actual + " to be restangularized collection";
                    } else {
                        result.message = "Expected " + actual + " to be restangularized collection, but it is not";
                    }
                    return result;
                }
            };
        },
        toBeRestangularObject: function (util, customEqualityTesters) {
            return {
                compare: function (actual, expected) {
                    if (expected === undefined) {
                        expected = '';
                    }
                    var result = {pass: false};
                    if (actual.route && actual.patch && actual.remove) {
                        result.pass = true;
                    }
                    
                    if (result.pass) {
                        result.message = "Expected " + actual + " to be restangularized object";
                    } else {
                        result.message = "Expected " + actual + " to be restangularized object, but it is not";
                    }
                    return result;
                }
            };
        }
    };
    
    beforeEach(function () {
        jasmine.addMatchers(customMatchers);
    });

}(angular));