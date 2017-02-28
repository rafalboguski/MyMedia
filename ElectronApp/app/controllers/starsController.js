angular.module('myApp')
    .controller('starsController', ['$scope', '$http', 'starsService',
        function ($scope, $http, starsService) {

            $scope.stars = [];


            $scope.addStar = function () {
                debugger;
                var star = starsService.build();

                starsService.addStar(star, function (result) {

                    $scope.getStars();
                });

                mongo(function (db) {

                    var collection = db.collection('documents');
                    collection.insertMany([
                        { name: 'New Star' },
                    ], function (err, result) {
                        db.close();
                    });

                });
            };

            $scope.getStars = function () {
                starsService.getStars(function (result) {
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