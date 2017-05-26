import { myApp, Models, Dto, Repositories, Services, Controllers } from '../App'
import { GenericController, IController } from './Generic.Controller'

import * as angular from 'angular';
import * as _ from 'lodash';

export class SettingsController extends GenericController implements IController {
    static $inject = ['SettingsRepository', 'DialogsService', '$location', 'UtilsService', 'DatasourcesRepository', 'ShortcutsService'];

    settings: Models.Settings;
    dataSources: Models.DataSource[];

    constructor(
        private settingsRepository: Repositories.SettingsRepository,
        private dialogsService: Services.DialogsService,
        private $location: ng.ILocationService,
        private utilsService: Services.UtilsService,
        private datasourcesRepository: Repositories.DatasourcesRepository,
        shortcutsService: Services.ShortcutsService
    ) {
        super(shortcutsService);
    }
    // GET
    getSettings(): Promise<any> {
        return this.settingsRepository.Get()
            .then((settings: Models.Settings) => {
                this.settings = settings;
            })
    };


    getDataSources(): Promise<Models.DataSource[]> {
        return this.datasourcesRepository.GetAll()
            .then((dataSources: Models.DataSource[]) => {
                this.dataSources = dataSources;
                return dataSources;
            });
    };

    // ADD / EDIT
    addDataSourceDialog(): Promise<any> {
        return this.dialogsService.selectFoldersDialog(null)
            .then((paths: string[]) => {
                this.datasourcesRepository.AddMany(paths)
            })
            .then(() => {
                this.getDataSources();
            })
            .then(() => {
                alert('Data sources saved');
            });
    }

    saveSettings() {
        return this.settingsRepository.Save(this.settings)
            .then(() => {
                alert('Settings saved');
            })
    }

    // REMOVE
    removeDataSource(datasource: Models.DataSource) {
        this.datasourcesRepository.Delete(datasource.id)
            .then(() => {
                _.remove(this.dataSources, { id: datasource.id });
            });
    }

    removeAllDataSources() {
        this.datasourcesRepository.DeleteAll()
            .then(() => {
                this.dataSources = [];
            });
    };

    // INIT
    init() {
        this.getRouteParams();

        this.getSettings();
        this.getDataSources();
    };

    //------------------------------

    getRouteParams() {
    }

    shortcuts = [
        { // CTRL + A - Add star
            modyfier: 'ctrl',
            key: 65,
            action: () => {
                this.$location.path('/star/null');
            }
        },
    ];
}

