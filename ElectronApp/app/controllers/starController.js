angular.module('myApp')
    .controller('starController', ['$routeParams', '$scope', '$http', 'starsService',
        function ($routeParams, $scope, $http, starsService) {

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
            };

            // DATA Set
            $scope.addStar = function () {
                starsService.addStar($scope.star, function (result) {
                    $routeParams.starId = result;
                    init();
                });
            };

            $scope.saveStar = function () {
                starsService.saveStar($scope.star, function (result) {
                    $scope.getStar();
                });
            };


            // DATA Get
            $scope.getStar = function () {
                $scope.$apply();

                if ($scope.view == 'Edit') {
                    starsService.getStar(_starId, function (data) {
                        $scope.star = data;
                        $scope.$apply();

                    });

                }
                else if ($scope.view == 'Add') {
                    $scope.star = starsService.build();
                }
            };


            init();

        }]);