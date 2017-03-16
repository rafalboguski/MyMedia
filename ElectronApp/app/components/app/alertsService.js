angular.module('myApp')
    .service('alertsService', ['$rootScope', function ($rootScope) {

        // stores paths to settings and minor ui shit
        $rootScope.alerts = [];

        this.showWarning = function (message) {
            $rootScope.alerts.push({
                type: 'warning',
                message: message
            });
        };

    }]);