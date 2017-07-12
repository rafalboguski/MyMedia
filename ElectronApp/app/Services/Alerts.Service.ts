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

    public toastInfo(message: string) {
        this.alertify.message(message);
    }

    public toastSuccess(message: string) {
        this.alertify.success(message);
    }

    public toastError(message: string) {
        this.alertify.error(message);
    }

    public toastWarning(message: string) {
        this.alertify.toastWarning(message);
    }
}


