angular.module('myApp')
    .controller('datafeedsController', ['$window', 'ModalService', '$routeParams', '$scope', '$rootScope', '$http', '$q',
        'datafeedsService', 'StarsService', 'Utils', 'myModalService', '$sce',
        function ($window, ModalService, $routeParams, $scope, $rootScope, $http, $q,
            datafeedsService, StarsService, Utils, myModalService, $sce) {

            $scope.scope = $scope;
            $scope.datafeeds = null;

            $scope.filter = {};

            // ---------------------------------------------------------

            // Routing  
            function getRouteParams() {
                $scope.view = 'List';
                $rootScope.windowTitle = 'Datafeeds List';
            };

            function configureShortcuts() {

                Utils.registerShortcuts(this, [
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

                    var starPromises = [];
                    _.each($scope.datafeeds, (value, key) => {
                        if (value.stars_ids.length > 0)
                            var p = StarsService.getStar(value.stars_ids[0]).then(star => value.star = star);
                        starPromises.push(p);
                    })

                    $q.all(starPromises).then(() => {
                        $apply($scope);
                    })

                });
            };


            $rootScope.settingsPromise.then(res => {
                init();
            })

        }]);