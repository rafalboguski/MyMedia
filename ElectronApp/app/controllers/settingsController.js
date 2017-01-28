angular.module('myApp')
  .controller('settingsController', ['$rootScope', '$scope', '$http', '$window', 'settingsService',
    function ($rootScope, $scope, $http, $window, settingsService) {


      $scope.setGlobalSettingsPath = function () {
        settingsService.setSettingsPath();
      };

      $scope.addDataSource = function () {
        $rootScope.settings.dataSources.push("");
      };

      $scope.addDataSourceDialog = function () {

        dialog.selectFoldersDialog(function (res) {
          angular.forEach(res, function (value, key) {
            $rootScope.settings.dataSources.push(value);
          });
          $rootScope.$apply();
        });

      };

      $scope.removeDataSource = function () {
        settingsService.setSettingsPath();
      };

      $scope.save = function () {
        settingsService.saveSettings();
      }



      function init() {


      };

      init();

    }]);