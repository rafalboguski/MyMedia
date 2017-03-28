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
    private rootScope: ng.IRootScopeService;
    private location: ng.ILocationService;
    private alertsService: AlertsService;
    private genericService: GenericService;

    constructor($rootScope: ng.IRootScopeService, $location: ng.ILocationService, AlertsService: AlertsService, GenericService: GenericService) {
        this.rootScope = $rootScope;
        this.location = $location;
        this.alertsService = AlertsService;
        this.genericService = GenericService;
    } 

    build(model): Settings {
        return this.genericService.buildNEW(model, new Settings())
    };

    getSettings(): Promise<Settings> {
        var self = this;
        return self.genericService.any(self.collectionName, { _id: 'settings' }).then(found => {

            if (found) {
                return self.genericService.single(self.collectionName, 'settings', self).then(settings => {
                    self.rootScope.settings = settings;
                    return settings;
                })
            } else {
                return this.genericService.add(self.collectionName, self.build({})).then(id => {
                    return this.genericService.single(self.collectionName, 'settings', self).then(settings => {
                        self.rootScope.settings = settings;
                        return settings;
                    })
                })
            }

        })

    };

    saveSettings(settings, callback) {
        this.genericService.mongo(function (db, self) {
            var collection = db.collection(this.collectionName);

            collection.findOne({ _id: 'settings' }, function (err, document) {

                if (document === null) {
                    collection.insert(self, function (err, result) {
                        self.Finish(err, result, db, callback);
                    });
                }
                else if (settings) {
                    collection.updateOne({ _id: 'settings' }, settings, function (err, result) {
                        self.Finish(err, result, db, callback);
                    });
                }
            });
        }, this);
    };

    Finish(err, result, db, callback) {
        db.close();

        if (err) {
            console.log(err);
            alert(err);
        }

        if (angular.isFunction(callback))
            callback(result);
    };
}

angular.module('myApp').service('SettingsService', ['$rootScope', '$location', 'AlertsService', 'GenericService', SettingsService]);