angular.module('myApp')
    .controller('starsController', ['$scope', '$http', 'starsService',
        function ($scope, $http, starsService) {

            $scope.stars = [];




            $scope.getStars = function () {
                starsService.getStars()
                    .then(result => {
                        $scope.stars = result;
                        $apply($scope);
                    },
                    error => {
                        console.error(error);
                    })

            };

            function init() {
                console.log('starsController');

                $scope.getStars();
            };

            init();

        }]);