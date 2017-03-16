angular.module('myApp')
    .controller('starsController', ['$scope', '$rootScope', '$http', 'starsService', 'utils', 'myModalService',
        function ($scope, $rootScope, $http, starsService, utils, myModalService) {

            $scope.stars = [];

            // ---------------------------------------------------------

            // Routing
            function getRouteParams() {
                $scope.view = 'List';
                $rootScope.windowTitle = 'Stars List';
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


            // DATA Get
            $scope.getStars = function () {
                starsService.getStars().then(result => {
                    $scope.stars = result;
                    $apply($scope);
                })
            };

            $rootScope.settingsPromise.then(res => {
                init();
            })

        }]);