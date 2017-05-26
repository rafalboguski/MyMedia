import { myApp, Models, Dto, Repositories, Services, Controllers } from '../App'
import { GenericController, IController } from './Generic.Controller'

import * as angular from 'angular';

export class StarController extends GenericController implements IController {

    static $inject = ['$scope', '$q', '$location', '$routeParams', 'StarsRepository', 'DialogsSerive', 'ShortcutsService'];

    _starId: number;

    constructor(
        private $scope,
        private $q: ng.IQProvider,
        private $location: ng.ILocationService,
        private $routeParams,
        private starsRepository: Repositories.StarsRepository,
        private dialogsService: Services.DialogsService,
        shortcutsService: Services.ShortcutsService
    ) {
        super(shortcutsService);
        var _C = this;
        //-------------------------------------
        $scope.view = null;
        $scope.star = null;
        $scope.starOryginal = null;

        // UI File Drop
        $scope.onFilesDropped = ($files: Array<any>, $event: Event) => {
            addCover($files[0].path);
        };

        $scope.addCoverDialog = () => {
            dialogsService.selectFileDialog(null)
                .then((res: Array<string>) => {
                    if (res) {
                        addCover(res[0]);
                    }
                });
        };

        var addCover = (path: string) => {
            path = path.split('\\').join('/');
            let star = <Models.Star>$scope.star;

        }

        // DATA Set
        $scope.saveStar = () => {
            let star = <Models.Star>$scope.star;

            if (star._id) {
            } else {
            }
        };

        // DATA Get
        $scope.getStar = () => {
            if ($scope.view == 'Edit') {

            }
            else if ($scope.view == 'Add') {
            }
        };

        //-------------------------------------
        // $rootScope.settingsPromise.then(() => {
        //     $scope.init();
        // })
    }
    init() {
        this.getRouteParams();

        //this.getStar();
    };
    // ---------------------------------------------------------

    getRouteParams() {
        this._starId = parseInt(this.$routeParams.starId);

        if (this._starId) {
            this.$scope.view = 'Edit';

        }
        else {
            this.$scope.view = 'Add';
        }

        console.log(this.$scope.view + ' View');
    }

    shortcuts = [
        { // CTRL + S - Save
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
