angular.module('myApp')
    .controller('starsController', ['$scope', '$http', 'starsService', 'utils', 'myModalService',
        function ($scope, $http, starsService, utils, myModalService) {

            $scope.stars = [];

            // ---------------------------------------------------------

            // Routing
            function getRouteParams() {
                $scope.view = 'List';
            };

            function configureShortcuts() {
                utils.registerShortcuts(this, [
                    { // CTRL + A - Add star
                        modyfier: 'ctrl',
                        key: 65,
                        action: function () {
                            $scope.starsModal();
                        }
                    },
                ])
            };

            // Init
            function init() {

                getRouteParams();

                configureShortcuts();

                $scope.getStars();
            };

            // ---------------------------------------------------------

            // UI
            $scope.starsModal = function (star_id) {
                myModalService.openStar({
                    star_id: star_id
                }, result => {
                    configureShortcuts();
                    if (result && result.action === 'confirm') {
                        init();
                    }
                });
            };

            // DATA Get
            $scope.getStars = function () {
                starsService.getStars().then(result => {
                    $scope.stars = result;
                    $apply($scope);
                })
            };

            init();

        }]);