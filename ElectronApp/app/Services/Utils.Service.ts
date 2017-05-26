import { myApp, Services, Dto } from '../App'

export class UtilsService {

    popovers: Services.PopoversService;

    static $inject = ['$rootScope', '$sce',];

    constructor(
        private $rootScope: any,
        private $sce: ng.ISCEService
    ) {

        this.popovers = new Services.PopoversService($sce);
    }
}


