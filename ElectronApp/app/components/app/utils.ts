class Popovers {

    constructor(
        private $sce: ng.ISCEService
    ) {

    }

    getStarImagePopover(star: Star, scope) {

        if (!scope.popovers) {
            scope.popovers = {};
        }

        if (star && star.coverFullPath && scope) {
            scope.popovers.starImage = this.$sce.trustAsHtml("<div style=\"width:200px; height:200px;\"><div class=\"crop\" style=\"background-image: url('" + star.coverFullPath + "');\"></div></div>")
        }
        else {
            scope.popovers.starImage = '';
        }
    }
}


interface IShortcut {
    modyfier: string;
    key: number;
    action: () => any;
}

class Utils {

    popovers: Popovers;

    constructor(
        private $rootScope: IAppRootScope,
        private $sce: ng.ISCEService
    ) {

        this.popovers = new Popovers($sce);
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

angular.module('myApp').service('Utils', ['$rootScope', '$sce', Utils]);