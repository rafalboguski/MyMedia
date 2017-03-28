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
        return this.DB.any(this.collection, { _id: 'settings' }).then((found) => {

            if (found) {
                return this.DB.single(this.collection, 'settings', this).then((settings: Settings) => {
                    this.rootScope.settings = settings as Settings;
                    return settings;
                })
            } else {
                return this.DB.add(this.collection, this.build({})).then((id) => {
                    return this.DB.single(this.collection, 'settings', this).then((settings: Settings) => {
                        this.rootScope.settings = settings;
                        return settings;
                    })
                })
            }
        })
    };

    // getSettings(): Promise<Settings> {
    //     var self = this;
    //     return self.DB.any(self.collection, { _id: 'settings' }).then(found => {

    //         if (found) {
    //             return self.DB.single(self.collection, 'settings', self).then(settings => {
    //                 self.rootScope.settings = settings as Settings;
    //                 return settings;
    //             })
    //         } else {
    //             return self.DB.add(self.collection, self.build({})).then(id => {
    //                 return self.DB.single(self.collection, 'settings', self).then(settings => {
    //                     self.rootScope.settings = settings as Settings;
    //                     return settings;
    //                 })
    //             })
    //         }
    //     })
    // };

    saveSettings(settings: Settings): Promise<Settings> {

        return this.DB.save(this.collection, settings);
    };
}

angular.module('myApp').service('SettingsService', ['$rootScope', '$location', 'AlertsService', 'GenericService', SettingsService]);