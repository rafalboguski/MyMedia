class Settings implements IModel {

    _id: string = 'settings';

    pathGlobalData: string;
    pathThumbnailGenerator: string;

    getClear(): Settings {
        return angular.copy(this);
    }
}

class SettingsService {

    private collection: string = 'settings';

    constructor(
        private $rootScope: IAppRootScope,
        private alertsService: AlertsService,
        private genericService: GenericService
    ) {
    }

    build(model): Settings {
        return this.genericService.buildNEW(model, new Settings())
    };

    getSettings(): Promise<Settings> {
        
        return this.genericService.any(this.collection, { _id: 'settings' }).then((found) => {

            if (found) {
                return this.genericService.single(this.collection, 'settings', this).then((settings: Settings) => {
                    this.$rootScope.settings = settings as Settings;
                    return settings;
                })
            } else {
                return this.genericService.add(this.collection, this.build({})).then((id) => {
                    return this.genericService.single(this.collection, 'settings', this).then((settings: Settings) => {
                        this.$rootScope.settings = settings;
                        return settings;
                    })
                })
            }
        })
    };

    saveSettings(settings: Settings): Promise<Settings> {

        return this.genericService.save(this.collection, settings);
    };
}

angular.module('myApp').service('SettingsService', ['$rootScope', '$location', 'GenericService', SettingsService]);