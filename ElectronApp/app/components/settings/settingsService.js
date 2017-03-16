angular.module('myApp')
    .service('settingsService', ['$rootScope', '$location', 'alertsService', 'genericService',
        function ($rootScope, $location, alertsService, genericService) {

            var collectionName = 'settings';

            this.build = function (model) {

                model = genericService.build(model, {
                    properties: {
                        _id: 'settings',
                        paths: {
                            globalData: null,
                            thumbnailGenerator: null
                        },
                        params: {}
                    },
                    tmp: {
                    },
                    functions: {

                    }
                });

                return model
            };

            this.getSettings = function () {
                debugger;
                return genericService.any(collectionName, { _id: 'settings' }).then(found => {

                    if (found) {
                        return genericService.single(collectionName, 'settings', this.build).then(settings => {
                            $rootScope.settings = settings;
                            return settings;
                        })
                    } else {
                        return genericService.add(collectionName, this.build()).then(id => {
                            return genericService.single(collectionName, 'settings', this.build).then(settings => {
                                $rootScope.settings = settings;
                                return settings;
                            })
                        })
                    }

                })

            };

            this.saveSettings = function (settings, callback) {
                genericService.mongo(function (db, self) {
                    var collection = db.collection(collectionName);

                    collection.findOne({ _id: 'settings' }, function (err, document) {

                        if (document === null) {
                            collection.insert(self.build(), function (err, result) {
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

            this.Finish = function (err, result, db, callback) {
                db.close();

                if (err) {
                    console.log(err);
                    alert(err);
                }

                if (angular.isFunction(callback))
                    callback(result);
            };

            // settings crud
            // this.loadSettings = function (callback) {

            //     this.loadSettingsPath(function (path) {

            //         if (!path) {
            //             $location.path('/settings');
            //         }
            //         else {
            //             fs.readFile($rootScope.settings.getFilePath(), 'utf8', function (err, data) {
            //                 if (err) {
            //                     this.saveSettings();
            //                 }
            //                 else {
            //                     var settings = JSON.parse(data);
            //                     $rootScope.settings.update(settings);
            //                     $rootScope.$apply();
            //                 }
            //             });
            //         }
            //     });
            // };

            // this.saveSettings = function () {
            //     var json = JSON.stringify($rootScope.settings, null, 4);
            //     fs.writeFile($rootScope.settings.getFilePath(), json, 'utf8');
            // };
        }]);