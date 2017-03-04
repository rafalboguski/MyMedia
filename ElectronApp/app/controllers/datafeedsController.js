angular.module('myApp')
    .controller('datafeedsController', ['$window', 'ModalService', '$routeParams', '$scope', '$http', '$q', 'datafeedsService', 'starsService',
        function ($window, ModalService, $routeParams, $scope, $http, $q, datafeedsService, starsService) {

            $scope.datafeeds = null;

            // ---------------------------------------------------------

            // Routing
            function getRouteParams() {
                $scope.view = 'Lits';
            };

            // Init
            function init() {

                getRouteParams();

                $scope.getDatafeeds();
            };

            // ---------------------------------------------------------

            // UI

            $scope.modal = function (datafeed_id) {

                ModalService.showModal({
                    templateUrl: "app/views/modals/datafeed.html",
                    controller: "datafeedController",
                    inputs: {
                        data: {
                            datafeed_id: datafeed_id
                        }
                    }
                }).then(function (modal) {
                    modal.element.modal();
                    modal.close.then(function (result) {
                        $scope.complexResult = "Name: " + result.name + ", age: " + result.age;
                    });
                });

            };


            // DATA Set
            $scope.addDatafeed = function () {
                datafeedsService.addDatafeed($scope.star).then(result => {
                    $routeParams.starId = result;
                    //$window.location.reload();
                    init();
                });
            };

            $scope.saveDatafeed = function () {
                datafeedsService.saveDatafeed($scope.star).then(result => {
                    init();
                });
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