interface IShortcut {
    modyfier: string;
    key: number;
    action: () => any;
}

class Utils {

    constructor(
        private $rootScope: IAppRootScope) {
    }

    // stores paths to settings and minor ui shit
    registerShortcuts = (controller, shortcuts: Array<IShortcut>) => {

        this.$rootScope.activeController = controller;

        controller.executeShortcut = (modyfier: string, keyCode: number) => {
            for (let shortcut of shortcuts) {
                if (shortcut.modyfier
                    && shortcut.modyfier == modyfier
                    && shortcut.key == keyCode || (!shortcut.modyfier && shortcut.key == keyCode)) {
                    shortcut.action();
                }
            }

        };
    };

}

angular.module('myApp').service('Utils', ['$rootScope', Utils]);