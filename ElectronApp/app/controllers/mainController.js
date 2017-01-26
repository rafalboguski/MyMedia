angular.module('myApp')
    .controller('mainController', ['$scope', '$http', '$window', function ($scope, $http, $window) {


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