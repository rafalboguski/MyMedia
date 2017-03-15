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

                // Mouse back/forward/merge windows
                if (evtobj.keyCode == 79 && evtobj.altKey) {
                    console.log('B')
                    $scope.navigateBack();
                } else if (evtobj.keyCode == 80 && evtobj.altKey) {
                    console.log('F')
                    $scope.navigateForward();
                } else if (evtobj.altKey) {
                    $scope.mergeWindows();
                } else if ($rootScope.activeController) {
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

            $scope.mergeWindows = function () {
                const remote = require('electron').remote;
                const BrowserWindow = remote.BrowserWindow;

                var parentWin = BrowserWindow.getFocusedWindow();
                var pos = parentWin.getPosition();
                var size = parentWin.getSize();
                var max = parentWin.isMaximized();

                angular.forEach(BrowserWindow.getAllWindows(), win => {
                    if (max) {
                        win.maximize();
                    } else {
                        win.setPosition(pos[0], pos[1]);
                        win.setSize(size[0], size[1]);
                    }
                })

                parentWin.focus();
            }

        }]);