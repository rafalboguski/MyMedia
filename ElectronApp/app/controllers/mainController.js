angular.module('myApp')
    .controller('mainController', ['$rootScope', '$scope', '$http', '$window', '$location', 'settingsService',
        function ($rootScope, $scope, $http, $window, $location, settingsService) {

            var appInit = function () {

                settingsService.getSettings();

                document.onkeydown = KeyPress;
            };

            function KeyPress(e) {
                var evtobj = window.event ? event : e;
                console.log("Key: " + evtobj.keyCode)

                // Mouse back/forward
                if (evtobj.keyCode == 79 && evtobj.altKey) {
                    console.log('B')
                    $scope.navigateBack();
                }
                if (evtobj.keyCode == 80 && evtobj.altKey) {
                    console.log('F')
                    $scope.navigateForward();
                }

                if ($rootScope.activeController) {
                    if (evtobj.ctrlKey) {
                        $rootScope.activeController.executeShortcut('ctrl', evtobj.keyCode);
                    }
                    else {
                        $rootScope.activeController.executeShortcut(null, evtobj.keyCode);
                    }
                }
            };

            appInit();

            $scope.navigateBack = function () {
                console.log('navigateBack');
                $window.history.back();
            };

            $scope.navigateForward = function () {
                console.log('navigateForward');
                $window.history.forward();
            };


        }]);