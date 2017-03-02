angular.module('myApp')
    .controller('starsController', ['$scope', '$http', 'starsService',
        function ($scope, $http, starsService) {

            $scope.stars = [];


     

            $scope.getStars = function () {
                starsService.getStars().then(function (result) {
                    $scope.stars = result;
                    $apply($scope);
                })
                
            };

            function init() {
                console.log('starsController');

                $scope.getStars();
            };

            init();

        }]);