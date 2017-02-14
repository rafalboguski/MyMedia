angular.module('myApp')
  .controller('settingsController', ['$rootScope', '$scope', '$http', '$window', 'settingsService', 'dataSourcesService',
    function ($rootScope, $scope, $http, $window, settingsService, dataSourcesService) {

      $scope.dataSources = [];

      $scope.getDataSources = function () {
        dataSourcesService.getDataSources(function (data) {
          $scope.dataSources = data;
          $scope.$apply();
        });
      };

      $scope.addDataSourceDialog = function () {
        dialog.selectFoldersDialog(function (res) {
          angular.forEach(res, function (value, key) {
            dataSourcesService.addDataSources({ path: value }, function () {
              $scope.getDataSources();
            });
          });
        });
      };

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

      function init() {

        $scope.getDataSources();

      };

      init();

    }]);