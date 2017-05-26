import { myApp, Models, Dto, Repositories, Services } from '../App'
import { GenericController, IController } from './Generic.Controller'
import * as angular from 'angular';

export class DatafeedController extends GenericController implements IController {

    static $inject = ['$scope', '$q', 'datafeedsService', 'StarsService', '$routeParams', 'ShortcutsService'];

    constructor(
        private $scope: any,
        private $q: ng.IQService,
        private datafeedsService: Repositories.DatafeedsRepository,
        private StarsService: Repositories.StarsRepository,
        private $routeParams,
        shortcutsService: Services.ShortcutsService

    ) {
        super(shortcutsService);
    }

    init() {

    }

    shortcuts = [
        { // CTRL + S
            modyfier: 'ctrl',
            key: 83,
            action: () => {
                alert('save');
            }
        },
        { // ESC
            modyfier: undefined,
            key: 27,
            action: () => {
                this.$scope.cancel();
            }
        },
    ];
}
