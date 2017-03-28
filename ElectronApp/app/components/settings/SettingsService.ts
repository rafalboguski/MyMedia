class Settings implements IModel {

    _id: string = 'settings';

    pathGlobalData: string;
    pathThumbnailGenerator: string;

    getClear(): Settings {
        return angular.copy(this);
    }
}

class SettingsService {

    private collectionName: string = 'settings';
    private rootScope: IAppRootScope;
    private location: ng.ILocationService;
    private alertsService: AlertsService;
    private DB: GenericService;

    constructor($rootScope: IAppRootScope, $location: ng.ILocationService, AlertsService: AlertsService, GenericService: GenericService) {
        this.rootScope = $rootScope;
        this.location = $location;
        this.alertsService = AlertsService;
        this.DB = GenericService;
    }

    build(model): Settings {
        return this.DB.buildNEW(model, new Settings())
    };

    getSettings(): Promise<Settings> {
        var self = this;
        return self.DB.any(self.collectionName, { _id: 'settings' }).then(found => {

            if (found) {
                return self.DB.single(self.collectionName, 'settings', self).then(settings => {
                    self.rootScope.settings = settings as Settings;
                    return settings;
                })
            } else {
                return self.DB.add(self.collectionName, self.build({})).then(id => {
                    return self.DB.single(self.collectionName, 'settings', self).then(settings => {
                        self.rootScope.settings = settings as Settings;
                        return settings;
                    })
                })
            }
        })
    };

    saveSettings(settings: Settings): Promise<Settings> {
        var self = this;

        return self.DB.save(self.collectionName, settings);
    };
}

angular.module('myApp').service('SettingsService', ['$rootScope', '$location', 'AlertsService', 'GenericService', SettingsService]);