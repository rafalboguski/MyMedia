angular.module('myApp')
    .controller('datafeedsController', ['$window', 'ModalService', '$routeParams', '$scope', '$http', '$q', 'datafeedsService', 'starsService', 'utils',
        function ($window, ModalService, $routeParams, $scope, $http, $q, datafeedsService, starsService, utils) {

            $scope.datafeeds = null;

            // ---------------------------------------------------------

            // Routing
            function getRouteParams() {
                $scope.view = 'Lits';
            };

            function configureShortcuts() {

                utils.registerShortcuts(this, [
                    { // CTRL + A
                        modyfier: 'ctrl',
                        key: 65,
                        action: function () {
                            $scope.modal();
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
                    modal.element.on('hidden.bs.modal', function () { configureShortcuts(); });
                    modal.close.then(function (result) { configureShortcuts(); });
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