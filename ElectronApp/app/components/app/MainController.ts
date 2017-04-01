class MainController {

    static $inject = ['$rootScope', '$scope', '$window', 'SettingsService', '$sce'];

    constructor(
        private $rootScope: IAppRootScope,
        private $scope,
        private $window: ng.IWindowService,
        private SettingsService: SettingsService
    ) {
        var _C = this;
        //-------------------------------------

        // Routing
        $scope.navigateBack = () => {
            console.log('navigateBack');
            $window.history.back();
        };

        $scope.navigateForward = () => {
            console.log('navigateForward');
            $window.history.forward();
        };

        // UI
        $scope.mergeWindows = () => {
            const BrowserWindow = remote.BrowserWindow;

            let parentWin: Electron.BrowserWindow = BrowserWindow.getFocusedWindow();
            let pos = parentWin.getPosition();
            let size = parentWin.getSize();
            let max = parentWin.isMaximized();

            BrowserWindow.getAllWindows().forEach((win: Electron.BrowserWindow) => {
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

        //-------------------------------------
        _C.appInit();
    }

    // ---------------------------------------------------------

    // Init
    appInit() {
        // load settings
        this.$rootScope.settingsPromise = this.SettingsService.getSettings();

        // Handle keyboard
        document.onkeydown = this.handleKeyboard;

        //prevent url change on file drop
        document.addEventListener('dragover', event => {
            event.preventDefault();
            return false;
        }, false);

        document.addEventListener('drop', event => {
            event.preventDefault();
            return false;
        }, false);

        //
        this.$rootScope.range = function (min, max, step) {
            // parameters validation for method overloading
            if (max == undefined) {
                max = min;
                min = 0;
            }
            step = Math.abs(step) || 1;
            if (min > max) {
                step = -step;
            }
            // building the array
            var output = [];
            for (var value = min; value < max; value += step) {
                output.push(value);
            }
            // returning the generated array
            return output;
        };
    }

    // Keyboard
    handleKeyboard = (e: KeyboardEvent) => {
        let evtobj = window.event ? <KeyboardEvent>event : e;

        // console.log("Key: " + evtobj.keyCode)

        // Mouse back/forward/merge windows
        if (evtobj.keyCode == 79 && evtobj.altKey) {
            console.log('B')
            this.$scope.navigateBack();
        } else if (evtobj.keyCode == 80 && evtobj.altKey) {
            console.log('F')
            this.$scope.navigateForward();
        } else if (evtobj.altKey) {
            this.$scope.mergeWindows();
        } else if (this.$rootScope.activeController) {
            if (evtobj.ctrlKey) {
                this.$rootScope.activeController.executeShortcut('ctrl', evtobj.keyCode);
            }
            else {
                this.$rootScope.activeController.executeShortcut(null, evtobj.keyCode);
            }
        }
    }
}

angular.module('myApp').controller('MainController', MainController);