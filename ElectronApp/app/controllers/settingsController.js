angular.module('myApp')
  .controller('settingsController', ['$scope', '$http', '$window',
    function ($scope, $http, $window) {

      // stores paths to settings and minor ui shit
      $scope.config = {
        settingsPath: null
      };

      $scope.addGlobalSettings = function () {

        dialog.selectFileDialog(function (res) {
          storage.set('config.settingsPath', res[0], function (error) {
            if (error)
              throw error;
            $scope.config.settingsPath = res[0];
            $scope.$apply();
          });
        });

      };

      $scope.saveGlobalSettings = function () {


      };


      function init() {

        storage.get('config.settingsPath', function (error, data) {
          if (!error) {
            $scope.config.settingsPath = data;
            $scope.$apply();
          };
        });

      };

      init();

    }]);