

angular.module('myApp')
    .controller('MainController', ['$rootScope', '$scope', '$http', '$window', '$location', 'SettingsService', '$sce',
        function ($rootScope, $scope, $http, $window, $location, SettingsService, $sce) {

            var appInit = function () {
                helpers();
                $rootScope.settingsPromise = SettingsService.getSettings();
                document.onkeydown = handleKeyboard;
            };

            // Input
            function handleKeyboard(e) {
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

            // Routing
            $scope.navigateBack = function () {
                console.log('navigateBack');
                $window.history.back();
            };

            $scope.navigateForward = function () {
                console.log('navigateForward');
                $window.history.forward();
            };

            // UI
            $scope.mergeWindows = function () {
                const BrowserWindow = remote.BrowserWindow;

                var parentWin = BrowserWindow.getFocusedWindow();
                var pos = parentWin.getPosition();
                var size = parentWin.getSize();
                var max = parentWin.isMaximized();

                BrowserWindow.getAllWindows().forEach(win => {
                    if (max) {
                        win.maximize();
                    } else {
                        win.setPosition(pos[0], pos[1]);
                        win.setSize(size[0], size[1]);
                    }
                    win.focus();
                })

                parentWin.focus();
            }

            function helpers() {
                //prevent url change on file drop
                document.addEventListener('dragover', event => {
                    event.preventDefault();
                    return false;
                }, false);

                document.addEventListener('drop', event => {
                    event.preventDefault();
                    return false;
                }, false);





            }

            appInit();

            // popoers

            $rootScope.createStarImagePopover = function (star, scope) {

                if (star && star.tmp && star.coverFullPath && scope)
                    scope.starImagePopover = $sce.trustAsHtml("<div style=\"width:200px; height:200px;\"><div class=\"crop\" style=\"background-image: url('" + star.coverFullPath + "');\"></div></div>")
 
                else
                    scope.starImagePopover = '';
            };

        }]);