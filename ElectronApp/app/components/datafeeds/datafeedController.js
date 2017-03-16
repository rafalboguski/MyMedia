angular.module('myApp')
    .controller('datafeedController', ['$rootScope', '$scope', '$q', 'datafeedsService', 'starsService', '$routeParams', 'utils', '$http',
        function ($rootScope, $scope, $q, datafeedsService, starsService, $routeParams, utils, $http) {

            var _datafeedId = null;

            $scope.datafeed = null;
            $scope.datafeedOryginal = null;

            // ---------------------------------------------------------

            // Routing
            function getRouteParams() {
                _datafeedId = parseInt($routeParams.datafeedId);

                if (_datafeedId) {
                    $scope.view = 'Edit';
                    $rootScope.windowTitle = 'Datafeed';
                }
                else {
                    $scope.view = 'Add';
                    $rootScope.windowTitle = 'Add datafeed';
                }
                console.log($scope.view + ' View');
            };

            function configureShortcuts() {

                utils.registerShortcuts(this, [
                    { // CTRL + S
                        modyfier: 'ctrl',
                        key: 83,
                        action: function () {
                            alert('save');
                        }
                    },
                    { // ESC
                        modyfier: undefined,
                        key: 27,
                        action: function () {
                            $scope.cancel();
                        }
                    },
                ])

            };

            // Init
            function init() {

                getRouteParams();

                configureShortcuts();

                $scope.getDatafeed();
            };

            // ---------------------------------------------------------

            // UI

            $scope.today = function () {
                return new Date();
            };

            // ---------------------------------------------------------


            // DATA Set
            $scope.addDatafeed = function () {
                datafeedsService.addDatafeed($scope.datafeed).then(result => {
                    data.datafeed_id = result;
                    //$window.location.reload();
                    init();
                });
            };

            $scope.saveDatafeed = function () {
                datafeedsService.saveDatafeed($scope.datafeed).then(result => {
                    init();
                });
            };

            // DATA Get
            $scope.getDatafeed = function () {

                if ($scope.view == 'Edit') {
                    datafeedsService.getDatafeed(_datafeedId).then(data => {
                        $scope.datafeed = data;
                        $scope.datafeedOryginal = angular.copy(data);
                        $rootScope.windowTitle = 'Datafeed "' + data.name + '"';
                        $apply($scope);
                    });

                }
                else if ($scope.view == 'Add') {
                    $scope.datafeed = datafeedsService.build();
                    $rootScope.windowTitle = 'Add datafeed';
                }
            };

            init();

        }]);