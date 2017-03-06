angular.module('myApp')
    .controller('datafeedController', ['$rootScope', '$scope', '$q', 'datafeedsService', 'starsService', '$element', 'data', 'close', 'utils', '$http',
        function ($rootScope, $scope, $q, datafeedsService, starsService, $element, data, close, utils, $http) {

            var _datafeedId = null;

            $scope.datafeed = null;
            $scope.datafeedOryginal = null;

            // ---------------------------------------------------------

            // Routing
            function getRouteParams() {
                _datafeedId = parseInt(data.datafeed_id);

                if (_datafeedId) {
                    $scope.view = 'Edit';
                }
                else {
                    $scope.view = 'Add';
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

            // Modal

            $scope.confirm = function () {
                $element.modal('hide');
                close({ action: 'confirm' }, 100); // close, but give 500ms for bootstrap to animate
            };

            $scope.close = function () {
                close({}, 100); // close, but give 500ms for bootstrap to animate
            };

            $scope.cancel = function () {
                $element.modal('hide');
                close({}, 100); // close, but give 500ms for bootstrap to animate
            };

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
                    $scope.confirm();
                    //init();
                });
            };


            // DATA Get
            $scope.getDatafeed = function () {

                if ($scope.view == 'Edit') {
                    datafeedsService.getDatafeed(_datafeedId).then(data => {
                        $scope.datafeed = data;
                        $scope.datafeedOryginal = angular.copy(data);
                        $apply($scope);
                    });

                }
                else if ($scope.view == 'Add') {
                    $scope.datafeed = datafeedsService.build();
                }
            };


            init();


        }]);