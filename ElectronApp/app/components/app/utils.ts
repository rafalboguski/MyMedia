class Utils {

    rootScope: IAppRootScope;

    constructor($rootScope: IAppRootScope) {
        this.rootScope = $rootScope;
    } 

    // stores paths to settings and minor ui shit
    registerShortcuts = function (controller, shortcuts) {

        this.rootScope.activeController = controller;

        controller.executeShortcut = function (modyfier, keyCode) {

            angular.forEach(shortcuts, (shortcut, key) => {
                if (shortcut.modyfier && shortcut.modyfier == modyfier && shortcut.key == keyCode || (!shortcut.modyfier && shortcut.key == keyCode)) {
                    shortcut.action();
                }
            });

        };

    };

}


angular.module('myApp').service('Utils', ['$rootScope', Utils]);