import { myApp, Services, Dto } from '../App'

export class UtilsService {

    popovers: Services.PopoversService;

    static $inject = ['$rootScope', '$sce',];

    constructor(private $rootScope: any, private $sce: ng.ISCEService) {

        this.popovers = new Services.PopoversService($sce);
    }

    deepMerge = (target, source) => {
        for (let key in source) {
            let original = target[key];
            let next = source[key];

            if (original && next && typeof next == "object") {
                this.deepMerge(original, next);
            } else {
                target[key] = next;
            }
        }
        return target;
    };
}


