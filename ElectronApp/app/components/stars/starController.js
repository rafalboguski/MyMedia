angular.module('myApp')
    .controller('starController', ['$window', '$scope', '$rootScope', '$http', '$q', 'starsService', 'Utils', '$routeParams',
        function ($window, $scope, $rootScope, $http, $q, starsService, Utils, $routeParams) {

            var _starId = null;

            $scope.star = null;
            $scope.starOryginal = null;

            // ---------------------------------------------------------

            // Routing
            function getRouteParams() {

                _starId = parseInt($routeParams.starId);

                if (_starId) {
                    $scope.view = 'Edit';
                    $rootScope.windowTitle = 'Star';

                }
                else {
                    $scope.view = 'Add';
                    $rootScope.windowTitle = 'Add star';

                }

                console.log($scope.view + ' View');
            };

            function configureShortcuts() {

                Utils.registerShortcuts(this, [
                    { // CTRL + S - Save
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

                $scope.getStar();
            };

            // ---------------------------------------------------------

            // UI

            // ---------------------------------------------------------

            // UI File Drop
            $scope.onFilesDropped = function ($files, $event) {
                addCover($files[0].path);
            };

            $scope.addCoverDialog = function () {
                dialog.selectFileDialog(res => {
                    if (res) {
                        addCover(res[0]);
                        $apply($scope);
                    }
                });
            };

            var addCover = function (path) {
                var path = path.split('\\').join('/');

                $scope.star.tmp.newCoverPath = path;
                $scope.star.tmp.coverThumbnailPath = path;
                $scope.star.tmp.coverFullPath = path;
            }

            // DATA Set
            $scope.addStar = function () {
                starsService.addStar($scope.star).then(result => {
                    $routeParams.starId = result;
                    init();
                });
            };

            $scope.saveStar = function () {
                starsService.saveStar($scope.star).then(result => {
                    init();
                });
            };


            // DATA Get
            $scope.getStar = function () {
                if ($scope.view == 'Edit') {
                    starsService.getStar(_starId).then(star => {
                        $scope.star = star;
                        $scope.starOryginal = angular.copy(star);
                        $rootScope.windowTitle = 'Star "' + star.name + '"';
                        $apply($scope);
                    });

                }
                else if ($scope.view == 'Add') {
                    $scope.star = starsService.build();
                    $rootScope.windowTitle = 'Add star';

                }
            };

            $rootScope.settingsPromise.then(res => {
                init();
            })

        }]);