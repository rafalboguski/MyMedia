angular.module('myApp')
    .controller('starsController', ['$scope', '$http', function ($scope, $http) {

        $scope.stars = [];


        $scope.addStar = function () {

            mongo(function (db) {

                var collection = db.collection('documents');
                collection.insertMany([
                    { name: 'New Star' },
                ], function (err, result) {
                    db.close();
                });

            });
        };

        function init() {
            console.log('starsController');

            mongo(function (db) {

                var collection = db.collection('documents');

                collection.find({}).toArray(function (err, docs) {
                    console.log("Found the following records");
                    console.dir(docs);

                    $scope.stars = docs;
                    $scope.$apply();

                    db.close();
                });

            });

        };

        init();

    }]);