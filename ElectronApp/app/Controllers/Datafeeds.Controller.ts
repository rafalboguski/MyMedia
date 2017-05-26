import { myApp, Models, Dto, Repositories, Services, Controllers } from '../App'
import { GenericController, IController } from './Generic.Controller'

import * as angular from 'angular';

export class DatafeedsController extends GenericController implements IController {

    static $inject = ['$routeParams', '$scope', '$location', '$q', 'DatafeedsRepository', 'StarsRepository', 'ShortcutsService'];

    constructor(
        private $routeParams,
        private $scope,
        private $location: ng.ILocationService,
        private $q: ng.IQService,
        private datafeedsService: Repositories.DatafeedsRepository,
        private starsService: Repositories.StarsRepository,
        shortcutsService: Services.ShortcutsService

    ) {
        super(shortcutsService);
        $scope._C = this;
        //-------------------------------------
        $scope.scope = $scope;
        $scope.datafeeds = null;

        // DATA Get
        $scope.getDatafeeds = () => {
        };

    }

    init() {

    }

    // Routing  
    getRouteParams() {
        this.$scope.view = 'List';
    };

    shortcuts = [
        { // CTRL + A - add datafeed
            modyfier: 'ctrl',
            key: 65,
            action: () => {
                this.$location.path('/datafeed/null');
                this.$scope.$apply();
            }
        },
    ];

}
