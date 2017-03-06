angular.module('myApp')
    .controller('starController', ['$window', '$scope', '$http', '$q', 'starsService', 'data', 'utils', 'close', '$element',
        function ($window, $scope, $http, $q, starsService, data, utils, close,  $element) {

            var _starId = null;

            $scope.star = null;
            $scope.starOryginal = null;

            // ---------------------------------------------------------

            // Routing
            function getRouteParams() {

                _starId = parseInt(data.star_id);

                if (_starId) {
                    $scope.view = 'Edit';
                }
                else {
                    $scope.view = 'Add';
                }
                console.log($scope.view + ' View');
            };

            function configureShortcuts() {

                utils.registerShortcuts(this, [
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

            // Modal

            $scope.confirm = function () {
                debugger;
                // $element.modal('hide');
                close({ action: 'confirm' }, 500); // close, but give 500ms for bootstrap to animate
            };

            $scope.close = function () {
                debugger;
                //close({}, 1500); // close, but give 500ms for bootstrap to animate
            };

            $scope.cancel = function () {
                debugger;
                 $element.modal('hide');
                close({}, 1500); // close, but give 500ms for bootstrap to animate
            };


            // ---------------------------------------------------------

            // UI File Drop
            $scope.onFilesDropped = function ($files, $event) {
                $scope.star.tmp.newCoverPath = $files[0].path;

                $scope.star.tmp.coverThumbnailPath = $files[0].path;
                $scope.star.tmp.coverFullPath = $files[0].path;
            };

            // DATA Set
            $scope.addStar = function () {
                starsService.addStar($scope.star).then(result => {
                    $routeParams.starId = result;
                    //$window.location.reload();
                    init();
                });
            };

            $scope.saveStar = function () {
                starsService.saveStar($scope.star).then(result => {
                    $scope.confirm();
                });
            };


            // DATA Get
            $scope.getStar = function () {
                if ($scope.view == 'Edit') {
                    starsService.getStar(_starId).then(function (data) {
                        $scope.star = data;
                        $scope.starOryginal = angular.copy(data);
                        $apply($scope);
                    });

                }
                else if ($scope.view == 'Add') {
                    $scope.star = starsService.build();
                }
            };


            init();

        }]);