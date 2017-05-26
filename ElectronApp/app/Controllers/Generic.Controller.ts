import { myApp, Models, Dto, Repositories, Services } from '../App'
import * as angular from 'angular';

export interface IController {
    shortcuts: Dto.IShortcut[];

    init();
}

export class GenericController {

    shortcuts: Dto.IShortcut[];

    static $inject = ['ShortcutsService'];

    constructor(
        private shortcutsService: Services.ShortcutsService
    ) {
        this.shortcutsService.activeController = this;
    }

    executeShortcut(modyfier: string, keyCode: number) {
        for (let shortcut of this.shortcuts) {
            if (shortcut.modyfier
                && shortcut.modyfier == modyfier
                && shortcut.key == keyCode || (!shortcut.modyfier && shortcut.key == keyCode)) {
                shortcut.action();
            }
        }
    };
}
