import { myApp, Models, Dto } from '../APp'
import { remote } from 'electron';

/**
 *  https://github.com/electron/electron/blob/master/docs/api/dialog.md
 */
export class DialogsService {

    static $inject = ['$q']

    constructor(private $q: ng.IQService) {

    }

    selectFileDialog(filters: Dto.IDialogFileFilter[]): Promise<string[]> {
        return this.$q((resolve, reject) => {
            remote.dialog.showOpenDialog({
                title: "Select file",
                properties: ['openFile'],
                filters: filters
            },
                (data) => { resolve(data); }
            );
        });
    }

    selectFilesDialog(filters: Dto.IDialogFileFilter[]): Promise<string[]> {
        return this.$q((resolve, reject) => {
            remote.dialog.showOpenDialog({
                title: "Select files",
                properties: ['openFile', 'multiSelections'],
                filters: filters
            },
                (data) => { resolve(data); }
            );
        });
    }

    selectFolderDialog(filters: Dto.IDialogFileFilter[]): Promise<string[]> {
        return this.$q((resolve, reject) => {
            remote.dialog.showOpenDialog({
                title: "Select folder",
                properties: ['openDirectory'],
                filters: filters
            },
                (data) => { resolve(data); }
            );
        });
    }

    selectFoldersDialog(filters: Dto.IDialogFileFilter[]): Promise<string[]> {
        return this.$q((resolve, reject) => {
            remote.dialog.showOpenDialog({
                title: "Select folders",
                properties: ['openDirectory', 'multiSelections'],
                filters: filters
            },
                (data) => { resolve(data); }
            );
        });
    }
}
