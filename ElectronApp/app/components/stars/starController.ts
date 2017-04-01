class StarController {

    static $inject = ['$rootScope', '$scope', '$q', '$location', '$routeParams', 'StarsService', 'Utils'];

    _starId: number;

    constructor(
        private $rootScope: IAppRootScope,
        private $scope,
        private $q: ng.IQProvider,
        private $location: ng.ILocationService,
        private $routeParams,
        private starsService: StarsService,
        private utils: Utils
    ) {

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
            dialog.selectFileDialog((res: Array<string>) => {
                if (res) {
                    addCover(res[0]);
                    $apply($scope);
                }
            });
        };

        var addCover = (path: string) => {
            path = path.split('\\').join('/');
            let star = <Star>$scope.star;

            star.newCoverPath = path;
            star.coverThumbnailPath = path;
            star.coverFullPath = path;
        }

        // DATA Set
        $scope.saveStar = () => {
            let star = <Star>$scope.star;

            if (star._id) {
                starsService.saveStar(star).then(result => {
                    $scope.init();
                });
            } else {
                starsService.addStar(star).then(result => {
                    $routeParams.starId = result;
                    $scope.init();
                });
            }
        };

        // DATA Get
        $scope.getStar = () => {
            if ($scope.view == 'Edit') {
                starsService.getStar(_C._starId).then(star => {
                    $scope.star = star;
                    $scope.starOryginal = angular.copy(star);
                    $rootScope.windowTitle = 'Star "' + star.name + '"';
                    $apply($scope);
                });

            }
            else if ($scope.view == 'Add') {
                $scope.star = starsService.build();
                $rootScope.windowTitle = 'Add star';
            }
        };

        // Init
        $scope.init = () => {
            _C.getRouteParams();
            _C.configureShortcuts();

            $scope.getStar();
        };

        //-------------------------------------
        $rootScope.settingsPromise.then(() => {
            $scope.init();
        })
    }

    // ---------------------------------------------------------

    getRouteParams() {
        this._starId = parseInt(this.$routeParams.starId);

        if (this._starId) {
            this.$scope.view = 'Edit';
            this.$rootScope.windowTitle = 'Star';

        }
        else {
            this.$scope.view = 'Add';
            this.$rootScope.windowTitle = 'Add star';
        }

        console.log(this.$scope.view + ' View');
    }

    configureShortcuts() {
        this.utils.registerShortcuts(this, [
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
        ])
    }
}

angular.module('myApp').controller('starController', StarController);