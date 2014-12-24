/*global angular, console */
(function (ng) {
    'use strict';
    
    var mdl = ng.module('CommonModule');

    /*
     * Usage: <span spinner-when="isSaving">original content</span>
     * isSaving: boolean
     * original content may be either plain text or html
     */
    mdl.directive('spinnerWhen', ['APP_ROOT_FOLDER', '$compile', '$interpolate', '$parse',
        function (ROOT, $compile, $interpolate, $parse) {

            return {
                restrict: 'A',
                transclude: true,
                scope: {
                    condition: '=spinnerWhen'
                },
                template: '<span class="spinner"></span><span class="original-content" ng-transclude></span>',
                //scope: true,
                //scope: true,
                link: function ($scope, elt, args) {

                    var spinner = ng.element('.spinner', elt),
                        originalContent = ng.element('.original-content', elt);
                    $scope.$watch(function () {
                        return $scope.condition;
                    }, function (newValue) {
                        if (newValue === true) {
                            spinner.css('opacity', 1);
                            originalContent.css('opacity', 0);
                        } else if (newValue === false) {
                            spinner.css('opacity', 0);
                            originalContent.css('opacity', 1);
                        }

                    });
                }

            };
        }]);

    /*
     * Usage: <button confirmable-click="methodToBeConfirmed"></button>
     * NB: method without () and .
     */
    mdl.directive('confirmableClick', ['$modal', 'APP_ROOT_FOLDER', '$compile', '$interpolate', '$parse',
        function ($modal, APP_ROOT_FOLDER, $compile, $interpolate, $parse) {

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
     * Usage: <image-placeholder  width="$scope.width" height="$scope.height" [fontsize="scope.fontsize"] />
     * fontsize is optional and controls glyphicon size
     */
    mdl.directive('imagePlaceholder', ['APP_ROOT_FOLDER',
        function (ROOT) {

            return {
                restrict: 'E',
                template: '<span class="placeholder" style="{{::styles.placeholder}}"><span class="glyphicon glyphicon-picture" style="{{::styles.icon}}"></span></span>',
                scope: {},
                link: function ($scope, element, args) {
                    
                    var fontSize = 8;
                    
                    if (args.fontsize) {
                        fontSize = args.fontsize;
                    }
                    
                    $scope.styles = {
                        placeholder: 'width: ' + args.width + 'px; height: ' + args.height + 'px;',
                        icon: 'font-size: ' + fontSize + 'em; line-height: ' + args.height + 'px'
                    };
                    
      
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


    mdl.directive('modalSort', ['$modal', 'APP_ROOT_FOLDER',
        function ($modal, ROOT) {
            var modalOptions = {
                templateUrl: ROOT + 'common/templates/modal-sorting.html'
            };


            return {
                restrict: 'E',
                scope: {
                    sourceItems: '=items',
                    map: '=',
                    buttontext: '@'
                },
                template: '<button type="button" class="btn btn-primary"><span class="glyphicon glyphicon-sort"></span>{{buttontext}}</button>',
                //templateUrl: ROOT +  'common/templates/modal-sorting.html',
                link: function ($scope, element) {

                    function updateOrder() {
                        ng.forEach($scope.items, function (item, index) {
                            console.log(item.text, item.order, index);
                        });
                    }

                    function getMappedItems() {
                        var mappedItems = [];
                        ng.forEach($scope.sourceItems, function (item, a) {
                            console.log(item, a);
                            mappedItems.push({
                                id: item.id,
                                text: item.name,
                                order: item.order
                            });
                        });
                        return mappedItems;
                    }

                    var sortableOptions = {
                        update: updateOrder,
                        helper: 'clone',
                        axis: 'y'
                    };
                    
                    $scope.sortableOptions = sortableOptions;

                    element.click(function () {
                        $scope.items = getMappedItems();
                        var modal = $modal.open({
                            templateUrl: ROOT + 'common/templates/modal-sorting.html',
                            controller: function () {},
                            scope: $scope

                        });

                        modal.result.then(function (result) {
                            //console.log('closed!')
                        });
                    });
                }
            };

        }]);



    /*
     * $scope.resolvedConfig comes from parent RootCtrl's scope
     */
    mdl.directive('navigationMenu', ['APP_ROOT_FOLDER',
        function (APP_ROOT_FOLDER) {

            return {
                restrict: "E",
                //template: '<div>config: {{config}} <br/></div>',
                templateUrl: APP_ROOT_FOLDER + 'templates/nav.html',
                link: function ($scope) {
                    $scope.config = $scope.resolvedConfig;
                    var buttons = [
                            {
                                icon: 'fa-home',
                                sref: 'home'
                            },
                            {
                                icon: 'fa-users',
                                sref: 'lineup.list'
                            },
                            {
                                icon: 'fa-music',
                                sref: 'music.list'
                            },
                            {
                                icon: 'fa-camera',
                                sref: 'gallery.list'
                            },
                            {
                                icon: 'fa-calendar',
                                sref: 'events.list'
                            },
                            {
                                icon: 'fa-book',
                                sref: 'blog.list'
                            },
                            {
                                icon: 'fa-th-large',
                                sref: 'pagelets.list'
                            }
                        ];
                        /*
			var buttons = [
			               {icon: 'home', sref: 'home'},
			               {icon: 'usergroup', sref: 'lineup.list'},
			               {icon: 'musicnote', sref: 'music.list'},
			               {icon: 'photos', sref: 'gallery.list'},
			               {icon: 'calender', sref: 'events'},
			               {icon: 'write', sref: 'blog.list'},
			               {icon: 'copydocument', sref: 'pagelets.list'}
			               ]
			 */
                    $scope.buttons = buttons;
                }
            };
        }]);
// DO NOT DELETE it may be useful 
/*
    mdl.directive('globalThrobber', ['_START_REQUEST_', '_END_REQUEST_',
        function (_START_REQUEST_, _END_REQUEST_) {
            return {
                restrict: "E",
                template: '<div class="page-throbber"></div>',
                link: function (scope, element) {
                    element.hide();
                    scope.$on(_START_REQUEST_, function () {
                        element.show();
                    });

                    scope.$on(_END_REQUEST_, function () {
                        element.hide();
                    });
                }
            };
        }]);
*/

}(angular));