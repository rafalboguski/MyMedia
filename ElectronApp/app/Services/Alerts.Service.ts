import { myApp, Services, Dto } from '../App'

export class AlertsService {

    private alertify = require('alertify.js')();

    static $inject = ['$q'];

    constructor(private $q: ng.IQService) {

    }

    public info(message: string) {
        this.alertify.alert(message);
    }

    public success(message: string) {
        this.alertify.alert(message);
    }

    public error(message: string) {
        this.alertify.alert(message);
    }

    public confirm(message: string): Promise<boolean> {
        return this.$q((resolve, reject) => {
            this.alertify.confirm(message, function () {
                resolve(true)
            }, function () {
                resolve(false);
            })
        });
    }
}


