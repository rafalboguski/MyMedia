// import { myApp, Models, Dto, Repositories, Services } from '../App'
import { myApp, Models, Services, Controllers } from '../App'
import * as angular from 'angular';
import { remote } from 'electron';

export class MainController {

    static $inject = ['$scope', '$window', 'ShortcutsService'];

    constructor(
        private $scope,
        private $window: ng.IWindowService,
        private shortcutsService: Services.ShortcutsService
        // private settingsRepository: Repositories.SettingsRepository
    ) {
        var _C = this;
        //-------------------------------------
        _C.appInit();
        this.shortcutsService.mainController = this;
    }


    // Routing
    navigateBack() {
        console.log('navigateBack');
        this.$window.history.back();
    };

    navigateForward() {
        console.log('navigateForward');
        this.$window.history.forward();
    };

    // UI
    mergeWindows() {
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
    // ---------------------------------------------------------

    // Init
    appInit() {

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
        // this.$rootScope.range = function (min, max, step) {
        //     // parameters validation for method overloading
        //     if (max == undefined) {
        //         max = min;
        //         min = 0;
        //     }
        //     step = Math.abs(step) || 1;
        //     if (min > max) {
        //         step = -step;
        //     }
        //     // building the array
        //     var output = [];
        //     for (var value = min; value < max; value += step) {
        //         output.push(value);
        //     }
        //     // returning the generated array
        //     return output;
        // };
    }
}
