angular.module('myApp')
    .controller('starController', ['$window', '$routeParams', '$scope', '$http', 'starsService',
        function ($window, $routeParams, $scope, $http, starsService) {

            var _starId;

            $scope.star = null;

            // INIT
            function getRouteParams() {

                _starId = parseInt($routeParams.starId);

                if (_starId) {
                    $scope.view = 'Edit';
                }
                else {
                    $scope.view = 'Add';
                }
                console.log($scope.view + ' View');
            };

            function init() {

                getRouteParams();

                $scope.getStar();
            };


            // UI File Drop
            $scope.onFilesDropped = function ($files, $event) {
                $scope.star.tmp.newCoverPath = $files[0].path;
                
                $scope.star.tmp.coverThumbnailPath = $files[0].path;
                $scope.star.tmp.coverFullPath = $files[0].path;
            };

            // DATA Set
            $scope.addStar = function () {
                starsService.addStar($scope.star, function (result) {
                    $routeParams.starId = result;
                    //$window.location.reload();
                    init();
                });
            };

            $scope.saveStar = function () {
                starsService.saveStar($scope.star, function (result) {
                    init();
                });
            };


            // DATA Get
            $scope.getStar = function () {

                if ($scope.view == 'Edit') {
                    starsService.getStar(_starId, function (data) {
                        $scope.star = data;
                        $apply($scope);

                    });

                }
                else if ($scope.view == 'Add') {
                    $scope.star = starsService.build();
                }
            };


            init();

        }]);