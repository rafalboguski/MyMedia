angular.module('myApp')
  .controller('settingsController', ['$rootScope', '$scope', '$http', '$window', 'settingsService', 'dataSourcesService',
    function ($rootScope, $scope, $http, $window, settingsService, dataSourcesService) {

      $scope.settings = [];
      $scope.dataSources = [];

      // ADD / EDIT
      $scope.addDataSourceDialog = function () {
        dialog.selectFoldersDialog(function (res) {
          angular.forEach(res, function (value, key) {
            dataSourcesService.addDataSources({ path: value }, function () {
              $scope.getDataSources();
            });
          });
        });
      };


      $scope.browseGlobalData = function () {
        dialog.selectFoldersDialog(function (res) {
          if (res)
            $scope.settings.paths.globalData = res;
          $scope.$apply();
        });
      };

      $scope.browseThumbnailGenerator = function () {
        dialog.selectFoldersDialog(function (res) {
          if (res)
            $scope.settings.paths.thumbnailGenerator = res;
          $scope.$apply();
        });
      };

      // REMOVE
      $scope.removeDataSource = function (ds) {
        dataSourcesService.removeDataSource(ds, function () {
          $scope.getDataSources();
        });
      }

      $scope.removeAllDataSources = function () {
        dataSourcesService.removeAllDataSources(function () {
          $scope.getDataSources();
        });
      };

      // GET
      $scope.getSettings = function () {
        settingsService.getSettings(function (data) {
          $scope.settings = data;
          $scope.$apply();
        });
      };

      $scope.saveSettings = function () {
        settingsService.saveSettings($scope.settings, function (data) {

        });
      };

      $scope.getDataSources = function () {
        dataSourcesService.getDataSources(function (data) {
          $scope.dataSources = data;
          $scope.$apply();
        });
      };

      // INIT
      function init() {

        $scope.getSettings();
        $scope.getDataSources();

      };

      init();

    }]);