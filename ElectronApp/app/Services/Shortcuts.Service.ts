import { myApp, Services, Dto, Controllers } from '../App'
import * as angular from 'angular';
import { remote } from 'electron';

export class ShortcutsService {

    public mainController: Controllers.MainController;
    public activeController: Controllers.GenericController;

    static $inject = [];

    constructor(
    ) {
        // Handle keyboard
        document.onkeydown = this.handleKeyboard;

    }

    // Keyboard
    handleKeyboard = (e: KeyboardEvent) => {
        let evtobj = window.event ? <KeyboardEvent>event : e;


        // Mouse back/forward/merge windows
        if (evtobj.keyCode == 79 && evtobj.altKey) {
            console.log('B')
            this.mainController.navigateBack();
        } else if (evtobj.keyCode == 80 && evtobj.altKey) {
            console.log('F')
            this.mainController.navigateForward();
        } else if (evtobj.altKey) {
            this.mainController.mergeWindows();
        } else if (this.activeController) {
            if (evtobj.ctrlKey) {

                console.log("Key: " + evtobj.keyCode)

                this.activeController.executeShortcut('ctrl', evtobj.keyCode);
            }
            else {
                this.activeController.executeShortcut(null, evtobj.keyCode);
            }
        }
    }
}


