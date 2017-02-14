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




        }]);