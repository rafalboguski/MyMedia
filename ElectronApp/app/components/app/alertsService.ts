class AlertsService {

    rootScope: IAppRootScope;

    constructor($rootScope: IAppRootScope) {
        this.rootScope = $rootScope;
    }

    showWarning(message: string) {

        if (!this.rootScope.alerts) {
            this.rootScope.alerts = [];
        }

        this.rootScope.alerts.push(new Alert('warning', message))
    }

}

class Alert {

    type: string;
    message: string;

    constructor(type: string, message: string) {
        this.type = type;
        this.message = message;
    }
}
angular.module('myApp').service('AlertsService', ['$rootScope', AlertsService]);
 