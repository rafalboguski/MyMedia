angular.module('myApp')
    .controller('mainController', ['$scope', '$http', '$window', '$location', 'settingsService',
        function ($scope, $http, $window, $location, settingsService) {

            var appInit = function () {

                console.log('appInit');

                

            };

            appInit();


            $scope.navigateBack = function () {
                console.log('navigateBack');
                debugger;
                $window.history.back();
            };

            $scope.navigateForward = function () {
                console.log('navigateBack');
                $window.history.forward();
            };


        }]);