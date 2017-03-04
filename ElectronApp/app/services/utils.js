angular.module('myApp')
    .service('utils', ['$rootScope', function ($rootScope) {

        // stores paths to settings and minor ui shit
        $rootScope.alerts = [];

        this.registerShortcuts = function (controller, shortcuts) {

            $rootScope.activeController = controller;

            controller.executeShortcut = function (modyfier, keyCode) {

                angular.forEach(shortcuts, (shortcut, key) => {
                    if (shortcut.modyfier == modyfier && shortcut.key == keyCode) {
                        shortcut.action();
                    }
                });

            };

        };


    }]);