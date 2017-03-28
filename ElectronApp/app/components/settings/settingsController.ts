interface ISettingsControllerScope extends ng.IScope {

    settings: Settings;
    datasources;
}

class SettingsController {
    static $inject = ['$rootScope', '$scope', '$http', '$window', 'SettingsService', 'dataSourcesService'];

    private rootScope: IAppRootScope;
    private scope: ISettingsControllerScope;
    private http: ng.IHttpService;
    private window: ng.IWindowService;
    private SettingsService: SettingsService;
    private dataSourcesService

    constructor($rootScope: IAppRootScope, $scope: ISettingsControllerScope, $http: ng.IHttpService, $window: ng.IWindowService, SettingsService: SettingsService, dataSourcesService) {
        this.rootScope = $rootScope;
        this.scope = $scope;
        this.http = $http;
        this.window = $window;
        this.SettingsService = SettingsService;
        this.dataSourcesService = dataSourcesService;

        // ADD / EDIT
        this.scope.addDataSourceDialog = () => {
            dialog.selectFoldersDialog(function (res) {
                angular.forEach(res, function (value, key) {
                    dataSourcesService.addDataSources({ path: value }, function () {
                        $scope.getDataSources();
                    });
                });
            });
        };

        this.scope.browseGlobalData = () => {
            dialog.selectFoldersDialog(function (res) {
                if (res)
                    $scope.settings.pathGlobalData = res;
                $apply($scope);
            });
        };

        this.scope.browseThumbnailGenerator = () => {
            dialog.selectFoldersDialog(function (res) {
                if (res)
                    $scope.settings.pathThumbnailGenerator = res;
                $apply($scope);
            });
        };

        // REMOVE
        this.scope.removeDataSource = (ds) => {
            dataSourcesService.removeDataSource(ds, function () {
                $scope.getDataSources();
            });
        }

        this.scope.removeAllDataSources = () => {
            dataSourcesService.removeAllDataSources(function () {
                $scope.getDataSources();
            });
        };

        // GET
        this.scope.getSettings = () => {
            SettingsService.getSettings().then(settings => {
                $scope.settings = settings;
                $apply($scope);
            });
        };

        this.scope.saveSettings = () => {
            this.SettingsService.saveSettings($scope.settings).then(() => {

            });
        }

        this.scope.getDataSources = () => {
            dataSourcesService.getDataSources(function (data) {
                $scope.dataSources = data;
                $apply($scope);
            });
        };

        this.init();
    }

    // INIT
    init() {
        this.scope.getSettings();
        this.scope.getDataSources();
    };

}

angular.module('myApp').controller('settingsController', SettingsController);