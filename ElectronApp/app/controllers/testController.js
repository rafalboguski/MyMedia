angular.module('myApp')
    .controller('testController', ['$scope', '$http', function ($scope, $http) {

        $scope.stars = [];

        $scope.totalDisplayed = 20;

        function init() {

            $scope.stars = [];

            console.log('testController');


            var dire = "C:\\Users\\user\\Desktop\\Obrazy".split('\\').join('/');
            var th = dire + '/thumbnails';


            var exec = require('child_process').execFile;

            var fun = function () {
                console.log("fun() start");
                exec('C:/Program Files (x86)/Google/Chrome/Application/chrome.exe', function (err, data) {
                    console.log(err)
                    console.log(data.toString());
                });
            }
            //fun();


            var fs = require("fs");
            var glob = require('glob');

            glob(dire + '/**/*.*', function (err, files) {
                for (var i = 0; i < files.length; i++) {
                    $scope.stars.push({ path: files[i] });
                }
                $scope.$apply();

            });

        };

        init();

    }]);