angular.module('myApp')
    .controller('starController', ['$scope', '$http', 'starsService',
        function ($scope, $http, starsService) {

            $scope.star = null;


            // UI File Drop


            $scope.onFilesDropped = function ($files, $event) {
                console.log('$files', $files[0].path);
                $scope.star.coverPath = $files[0].path;
            };

            // DATA Set

            $scope.addStar = function () {

                starsService.addStar(star, function (result) {

                    $scope.getStars();
                });
            };

            // DATA Get

            $scope.getStars = function () {
                starsService.getStars(function (result) {
                    $scope.stars = result;
                    $scope.$apply();
                })
            };

            // INIT

            function init() {
                console.log('Add Star View');

                // if add
                $scope.star = starsService.build();


                $scope.getStars();
            };

            init();

        }]);