/*global angular, console, jQuery */
(function (ng, $) {
    'use strict';
    var mdl = ng.module('CommonModule');

    /*
     * Usage: <button confirmable-click="methodToBeConfirmed"></button>
     * NB: method without () and .
     */
    mdl.directive('confirmableClick', ['$modal', 'APP_ROOT_FOLDER',
        function ($modal, APP_ROOT_FOLDER) {

            var modalOptions = {
                size: 'sm',
                templateUrl: APP_ROOT_FOLDER + 'common/templates/confirmation.html'
            };

            return {
                restrict: 'A',
                scope: {
                    //action: '=' // for action="someFunction"
                    //action: '&' //for action="someFunction()"
                    action: '&confirmableClick'
                },
                //scope: true,  //child scope instead of isolated, to avoid [error:multidir]
                link: function ($scope, element, attrs) {
                    var popup,
                        action = $scope.action;
                    element.click(function (event) {
                        popup = $modal.open(modalOptions);
                        popup.result.then(function (result) {
                            //
                            action();
                        }, function (reason) { /* dismiss */ });
                    });

                }
            };
        }]);


    /*
     * Usage: <help-button source="some_id"></help-button>
     * some_id is id of element containing help
     */
    mdl.directive('helpButton', ['$modal', 'APP_ROOT_FOLDER',
        function ($modal, ROOT) {
            var modalOptions = {
                templateUrl: ROOT + 'common/templates/modal-help.html'
            };

            return {
                restrict: 'E',
                template: '<span class="helpbutton"><span class="fa fa-question-circle"></span></span>',
                scope: {
                    source: '@'
                },
                link: function ($scope, element) {

                    var help_html = ng.element('#' + $scope.source);

                    $scope.help_html = help_html.html();


                    element.click(function () {
                        var modal = $modal.open({
                            templateUrl: ROOT + 'common/templates/modal-help.html',
                            scope: $scope
                        });
                        modal.result.then(function (result) {
                            console.log('closed!');
                        });

                    });

                }

            };
        }]);
    
 
    mdl.controller('modalAddCtrl', ['$scope', '$modalInstance', '$state', 'Service', function ($scope, $modalInstance, $state, Service) {
        $scope.object = Service.getOne();
        $scope.is = {saving: false};
        if ($scope.settings.extra_fields) {
            ng.forEach($scope.settings.extra_fields, function (field) {
                $scope.object[field[0]] = field[1];
            });
        }
//        console.log($scope.object);
        $scope.save = function () {
            $scope.is.saving = true;
            Service
                .save($scope.object)
                .then(function (response) {
                    var stateParams = $scope.settings.redirectTo.stateParams,
                        stateName = $scope.settings.redirectTo.stateName;
                    $scope.is.saving = false;
                    $modalInstance.close();
                    $state.go($scope.settings.redirectTo.stateName, $scope.settings.redirectTo.stateParams(response));
                })
                .catch(function (response) {
                    $scope.is.saving = false;
                    $modalInstance.close();
                    Service.handleErrors(response);
                });
        };
    }]);
    
    // Usage: <button modal-item-add="settings"/>
    // settings = {title: 'Новый участник',
//                 service: Lineup.Person,
//                 fields: [
//                    ['role', 'Роль']
//                 ],
//                 redirectTo: {
//                   stateName: 'lineup.person',
//                   stateParams: function (response) {
//                       return {person_id: response.id}
//                      }
//                  }
//               }
    mdl.directive('modalItemAdd',
        ['$state', '$modal',  'APP_ROOT_FOLDER', 'Lineup',
            function ($state, $modal, ROOT, Lineup) {
        
                return {
                    restrict: 'A',
                    scope: {
                        modalItemAdd: '='
                    },
                    link: function ($scope, elt, args) {
                        $scope.settings = $scope.modalItemAdd;
                        elt.click(function () {
                            var modal = $modal.open({
                                templateUrl: ROOT + 'common/templates/modal-item-add.html',
                                controller: 'modalAddCtrl',
                                scope: $scope,
                                resolve: {
                                    Service: function () {return $scope.settings.service; }
                                }
                            });
                        });
                    }
                };
            }]);
        
        
/* Usage:  <button modal-sort items="lineup" display="name" then="sortingDone">Sort them!</button>
 *
 * items: that array will be copied and copy will be sortable
 * display: property of items' element that will be displayed in sortable list
 * then: function that should be executed when sorting modal is closed. It should expect sorted copy of 'items' as single argument and return promise, $q.all() is ok.
*/
    mdl.directive('modalSort', ['$q', '$modal', 'APP_ROOT_FOLDER',
        function ($a, $modal, ROOT) {
            var modalOptions = {
                templateUrl: ROOT + 'common/templates/modal-sorting.html'
            };


            return {
                restrict: 'A',
                
                scope: {
                    //button: '@',
                    sourceItems: '=items',
                    display: '@',
                    then: '='
                },
                //template: '<button type="button" class="btn btn-default"><span class="fa fa-list"></span>{{button}}</button>',
                template: '',
                link: function ($scope, element, attrs) {
                    var modal;
                    $scope.is = {
                        saving: false
                    };
                    
                    $scope.sortableOptions = {
                        //when commented, as-drag disappears (maybe under the modal);
                        //when set to interface's parent, gets wrong position
//                        containment: '#sorts',
                        containment: '.modal-body',  //this one seems properly working
                        containerPositioning: 'relative'
                    };
                    
                    $scope.handleResult = function () {
                        $scope.is.saving = true;
                        $scope
                            .then($scope.items)
                            .then(function () {
                                $scope.is.saving = false;
                                modal.close();
                            });
                    };

                    element.click(function () {
                        $scope.items = ng.copy($scope.sourceItems);
                        modal = $modal.open({
                            templateUrl: ROOT + 'common/templates/modal-sorting.html',
                            controller: function () {},
                            scope: $scope

                        });
                    });
                }
            };

        }]);
    

//    private stuff, used by modalCrop directive
    mdl.directive('croppableImage', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            link: function ($scope, elt, attrs) {
                var thumbnail = {
                        width: $scope.mcWidth,
                        height: $scope.mcHeight
                    };
                
                function onSelect(selection) {
//                    console.log('onSelect validation');
                    $scope.validate();
                }
                
                function onRelease() {
                    $scope.is.valid = false;
                    $scope.$apply();
                }
                
                function start() {
                    $(elt).Jcrop({
                        minSize: [thumbnail.width, thumbnail.height],
                        boxWidth: 500,
                        onSelect: onSelect,
                        onRelease: onRelease,
                        aspectRatio: thumbnail.width / thumbnail.height
                    }, function () {
                        this.setSelect([0, 0, thumbnail.width, thumbnail.height]);
                        $scope.is.valid = true;
                        ng.extend($scope.api, this);
                    });
                    
                }
                $timeout(start, 100);
            }
        };
    }]);
    
/* Usage: <button type="button" 
            modal-crop 
            mc-source="image.urls.source.url" (string)
            mc-width="image.urls.thumbnail.width" (int)
            mc-height="image.urls.thumbnail.height" (int)
            mc-on-submit="cropImage" (method that takes [x1, y1, x2, y2] as first argument
            mc-extra-context="image" (optional second argument for mc-on-submit)

*/
    mdl.directive('modalCrop', ['$filter', '$modal', 'APP_ROOT_FOLDER', '$http',
        function ($filter, $modal, ROOT, $http) {
            var modalTemplateUrl = ROOT + 'common/templates/modal-crop.html';

            return {
                restrict: 'A',
                scope: {
                    
                    onSubmit: '=',
                    mcSource: '=',
                    mcWidth: '=',
                    mcHeight: '=',
                    mcOnSubmit: '=',
                    mcExtraContext: '=?'
                },
                link: function ($scope, element) {
                    var modal;
                    $scope.api = {};
                    $scope.is = {saving: false,
                                valid: false};
                    
                    $scope.validate = function () {
                        $scope.is.valid = ng.isFunction($scope.api.tellSelect) && $scope.api.tellSelect().w > 0;
                        $scope.$apply();
                    };

                    $scope.crop = function () {
                        var api = $scope.api,
                            coords = $scope.api.tellSelect(),
                            selection = {
                                x1: Math.floor(coords.x),
                                y1: Math.floor(coords.y),
                                x2: Math.floor(coords.x2),
                                y2: Math.floor(coords.y2),
                                width: Math.floor(coords.w),
                                height: Math.floor(coords.h)
                            };
                        $scope.is.saving = true;
                        $scope
                            .mcOnSubmit(selection, $scope.mcExtraContext)
                            .then(function (response) {
                                $scope.is.saving = false;
                                modal.close();
                            });
                    };
                    
                    $scope.cleanupAndClose = function () {
                        $scope.api.destroy();
                        modal.dismiss();
                    };
                    
                    element.click(function () {
                        modal = $modal.open({
                            size: 'auto',
                            backdrop: 'static',
                            templateUrl: modalTemplateUrl,
                            controller: function () {},
                            scope: $scope
                        });
                        modal.result.then(function (result) {
                            $scope.api.destroy();
                        });
                    });
                }
            };

        }]);
        
    
}(angular, jQuery));