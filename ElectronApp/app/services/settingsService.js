angular.module('myApp')
    .service('settingsService', ['$rootScope', '$location', 'alertsService',
        function ($rootScope, $location, alertsService) {

            // stores paths to settings and minor ui shit
            $rootScope.settings = {
                path: null,
                fileName: 'settings.json',
                dataSources: [],

                getFilePath: function () { return this.path + '\\' + this.fileName },
                update: function (newer) {
                     this.dataSources = newer.dataSources;
                }

            };

            // settings crud
            this.loadSettings = function (callback) {

                this.loadSettingsPath(function (path) {

                    if (!path) {
                        $location.path('/settings');
                    }
                    else {
                        fs.readFile($rootScope.settings.getFilePath(), 'utf8', function (err, data) {
                            if (err) {
                                this.saveSettings();
                            }
                            else {
                                var settings = JSON.parse(data);
                                $rootScope.settings.update(settings);
                                $rootScope.$apply();
                            }
                        });
                    }
                });
            };

            this.saveSettings = function () {

                var json = JSON.stringify($rootScope.settings, null, 4);
                fs.writeFile($rootScope.settings.getFilePath(), json, 'utf8');

            };

            this.setSettingsPath = function (callback) {
                dialog.selectFolderDialog(function (res) {
                    storage.set('settings.path', res[0], function (error) {
                        if (error)
                            throw error;
                        $rootScope.settings.path = res[0];
                        $rootScope.$apply();

                        if (angular.isFunction(callback))
                            callback($rootScope.settings.path);
                    });
                });
            };

            this.loadSettingsPath = function (callback) {
                storage.get('settings.path', function (error, data) {
                    if (error || angular.equals({}, data)) {
                        console.log('settingsService: settings path empty', data)
                        $rootScope.settings.path = null;
                        alertsService.showWarning('Path to settings dictionary is not set');
                    }
                    else {
                        console.log('settingsService: settings path loaded', data)
                        $rootScope.settings.path = data;
                    }
                    $rootScope.$apply();

                    if (angular.isFunction(callback))
                        callback($rootScope.settings.path);
                });
            };

            // data sources



        }]);