class SettingsController {
    static $inject = ['$rootScope', '$scope', '$http', '$window', 'SettingsService', 'dataSourcesService'];

    constructor(
        private $rootScope: IAppRootScope,
        private $scope,
        private $http: ng.IHttpService,
        private $window: ng.IWindowService,
        private settingsService: SettingsService,
        private dataSourcesService
    ) {

        var $ctrl = this;
        var $scope = this.$scope;

        // ADD / EDIT
        $scope.addDataSourceDialog = () => {
            dialog.selectFoldersDialog((res: Array<string>) => {
                for (let path of res) {
                    $ctrl.dataSourcesService.addDataSources({ path: path }, () => {
                        $scope.getDataSources();
                    });
                }
            });
        };

        $scope.setGlobalDataDialog = () => {
            dialog.selectFoldersDialog((res: string) => {
                if (res) {
                    $scope.settings.pathGlobalData = res;
                    $apply($scope);
                }
            });
        };

        $scope.setThumbnailGeneratorDialog = () => {
            dialog.selectFoldersDialog((res: string) => {
                if (res) {
                    $scope.settings.pathThumbnailGenerator = res;
                    $apply($scope);
                }
            });
        };

        // REMOVE
        $scope.removeDataSource = (datasource) => {
            $ctrl.dataSourcesService.removeDataSource(datasource, () => {
                $scope.getDataSources();
            });
        }

        $scope.removeAllDataSources = () => {
            $ctrl.dataSourcesService.removeAllDataSources(() => {
                $scope.getDataSources();
            });
        };

        // GET
        $scope.getSettings = () => {
            $ctrl.settingsService.getSettings().then(settings => {
                $scope.settings = settings;
                $apply($scope);
            });
        };

        $scope.saveSettings = () => {
            $ctrl.settingsService.saveSettings($scope.settings);
        }

        $scope.getDataSources = () => {
            $ctrl.dataSourcesService.getDataSources((dataSources) => {
                $scope.dataSources = dataSources;
                $apply($scope);
            });
        };

        // INIT
        $scope.init = () => {
            this.$scope.getSettings();
            this.$scope.getDataSources();
        };

        $scope.init();
    }
}

angular.module('myApp').controller('settingsController', SettingsController);