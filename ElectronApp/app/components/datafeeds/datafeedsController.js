angular.module('myApp')
    .controller('datafeedsController', ['$window', 'ModalService', '$routeParams', '$scope', '$rootScope', '$http', '$q',
        'datafeedsService', 'starsService', 'utils', 'myModalService',
        function ($window, ModalService, $routeParams, $scope, $rootScope, $http, $q,
            datafeedsService, starsService, utils, myModalService) {

            $scope.datafeeds = null;

            // ---------------------------------------------------------

            // Routing
            function getRouteParams() {
                $scope.view = 'List';
                $rootScope.windowTitle = 'Datafeeds List';
            };

            function configureShortcuts() {

                utils.registerShortcuts(this, [
                    { // CTRL + A - add datafeed
                        modyfier: 'ctrl',
                        key: 65,
                        action: function () {
                            $scope.datafeedModal();
                        }
                    },
                ])
            };

            // Init
            function init() {

                getRouteParams();

                configureShortcuts();

                $scope.getDatafeeds();
            };

            // ---------------------------------------------------------

            // UI

            $scope.keypress = function () {
                console.log('key;');
            };

            // DATA Get
            $scope.getDatafeeds = function () {
                datafeedsService.getDatafeeds().then(function (data) {
                    $scope.datafeeds = data;
                    $apply($scope);
                });
            };


            init();

        }]);