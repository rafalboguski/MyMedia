angular.module('myApp')
    .controller('starController', ['$scope', '$http', 'starsService',
        function ($scope, $http, starsService) {

            $scope.stars = [];




            $scope.dzOptions = {
                url: '/alt_upload_url',
                paramName: 'photo',
                maxFilesize: '10',
                acceptedFiles: 'image/jpeg, images/jpg, image/png',
                addRemoveLinks: true,
            };


            $scope.dzCallbacks = {
                'addedfile': function (file) {
                    console.log(file);
                    $scope.newFile = file;
                },
                'success': function (file, xhr) {
                    console.log(file, xhr);
                },
            };


            $scope.dzMethods = {};
            $scope.removeNewFile = function () {
                $scope.dzMethods.removeFile($scope.newFile); //We got $scope.newFile from 'addedfile' event callback
            }






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
                    $scope.$apply();
                })
            };

            function init() {
                console.log('Add Star View');

                $scope.getStars();
            };

            init();

        }]);