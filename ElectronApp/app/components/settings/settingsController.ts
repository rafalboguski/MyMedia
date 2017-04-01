class SettingsController {
    static $inject = ['$rootScope', '$scope', '$location', 'Utils', 'SettingsService', 'dataSourcesService'];

    constructor(
        private $rootScope: IAppRootScope,
        private $scope,
        private $location: ng.ILocationService,
        private utils: Utils,
        private settingsService: SettingsService,
        private dataSourcesService
    ) {

        var _C = this;
        //-------------------------------------
        $scope.settings = null;
        $scope.dataSources = null;

        // ADD / EDIT
        $scope.addDataSourceDialog = () => {
            dialog.selectFoldersDialog((res: Array<string>) => {
                for (let path of res) {
                    dataSourcesService.addDataSources({ path: path }, () => {
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
            dataSourcesService.removeDataSource(datasource, () => {
                $scope.getDataSources();
            });
        }

        $scope.removeAllDataSources = () => {
            dataSourcesService.removeAllDataSources(() => {
                $scope.getDataSources();
            });
        };

        // GET
        $scope.getSettings = () => {
            settingsService.getSettings().then(settings => {
                $scope.settings = settings;
                $apply($scope);
            });
        };

        $scope.saveSettings = () => {
            settingsService.saveSettings($scope.settings);
        }

        $scope.getDataSources = () => {
            dataSourcesService.getDataSources((dataSources) => {
                $scope.dataSources = dataSources;
                $apply($scope);
            });
        };

        // INIT
        $scope.init = () => {
            _C.getRouteParams();
            _C.configureShortcuts();

            this.$scope.getSettings();
            this.$scope.getDataSources();
        };

        $scope.init();
    }

    getRouteParams() {
        this.$scope.view = 'List';
        this.$rootScope.windowTitle = 'Stars List';
    }

    configureShortcuts() {
        this.utils.registerShortcuts(this, [
            { // CTRL + A - Add star
                modyfier: 'ctrl',
                key: 65,
                action: () => {
                    this.$location.path('/star/null');
                    $apply(this.$scope);
                }
            },
        ])
    }
}

angular.module('myApp').controller('settingsController', SettingsController);