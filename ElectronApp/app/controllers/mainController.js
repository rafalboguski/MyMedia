angular.module('myApp')
    .controller('mainController', ['$scope', '$http', '$window', '$location', 'settingsService',
        function ($scope, $http, $window, $location, settingsService) {

            var appInit = function () {

                console.log('appInit');

                settingsService.getSettings();

                // Mouse back/forward
                function KeyPress(e) {
                    var evtobj = window.event ? event : e;

                    if (evtobj.keyCode == 79 && evtobj.altKey) {
                        console.log('B')
                        $scope.navigateBack();
                    }
                    if (evtobj.keyCode == 80 && evtobj.altKey) {
                        console.log('F')
                        $scope.navigateForward();
                    }
                }

                document.onkeydown = KeyPress;

            };

            appInit();

            $scope.navigateBack = function () {
                console.log('navigateBack');
                $window.history.back();
            };

            $scope.navigateForward = function () {
                console.log('navigateBack');
                $window.history.forward();
            };


        }]);