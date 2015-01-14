/*global angular, console */
(function (ng) {
    'use strict';
    var mdl = ng.module('AuthModule');

    mdl.controller('auth.LogoutCtrl', ['$scope', '$state', 'Auth',
        function ($scope,  $state, Auth) {
            
            $scope.logout = function () {
                Auth.logout()
                    .then(function (response) {
                        //$scope.user = Auth.getUser();
                        $state.go('logout');
                    });
            };
            
        }]);
    
    mdl.controller('auth.LoginCtrl', ['$scope', '$location', '$state', 'Auth',
        function ($scope, $location, $state, Auth) {
            
            $scope.is = {
                saving: false
            };
            
            $scope.user = {
                //rememberme: false.
                username: 'admin',
                password: 'admin'
            };
            
            //Временная штука для удобства разработки
            $scope.fillForm = function () {
                $scope.user.username = 'admin';
                $scope.user.password = 'admin';
            };

            $scope.login = function () {
                $scope.is.saving = true;
                Auth.login({
                    username: $scope.user.username,
                    password: $scope.user.password,
                    remember: $scope.user.rememberme
                })
                    .then(function (res) {
                        //console.log('oklogged');
                        $scope.user = Auth.getUser();
                        $scope.is.saving = false;
                        /*
                        $scope.error = '';

                        if (Auth.desiredState) {
                            $state.go(Auth.desiredState);
                        } else {
                            $state.go('home'); //nb to set to actual home
                        }
                        */
                    })
                    .catch(function (err, a, b, c) {
                        $scope.error = err.message;
                    });
            };


        }]);



}(angular));