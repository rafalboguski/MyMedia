angular.module('myApp')
    .controller('datafeedController', ['$scope', '$q', 'datafeedsService', 'starsService', '$element', 'data', 'close',
        function ($scope, $q, datafeedsService, starsService, $element, data, close) {

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

            // Init
            function init() {

                getRouteParams();

                //$scope.getDatafeed();
            };

            // ---------------------------------------------------------

            // UI

            $scope.close = function () {
                close({
                    name: $scope.name,
                    age: $scope.age
                }, 500); // close, but give 500ms for bootstrap to animate
            };

            $scope.cancel = function () {

                $element.modal('hide');

                close({
                    name: $scope.name,
                    age: $scope.age
                }, 500); // close, but give 500ms for bootstrap to animate
            };


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
                        $apply($scope);
                    });

                }
                else if ($scope.view == 'Add') {
                    $scope.datafeed = datafeedsService.build();
                }
            };


            init();

        }]);