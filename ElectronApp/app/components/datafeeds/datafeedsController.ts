


class DatafeedsController {

    static $inject = ['$routeParams', '$scope', '$rootScope', '$location', '$q', 'datafeedsService', 'StarsService', 'Utils'];

    constructor(
        private $routeParams,
        private $scope,
        private $rootScope: IAppRootScope,
        private $location: ng.ILocationService,
        private $q: ng.IQService,
        private datafeedsService: DatafeedsService,
        private starsService: StarsService,
        private utils: Utils
    ) {

        var _C = this;
        $scope._C = this;
        //-------------------------------------
        $scope.scope = $scope;
        $scope.datafeeds = null;

        $scope.filter = {};

        $scope.pagination = new (<any>window).Models.Pagination();


        $scope.pagination.sortBy = [['name', 'asc']];

        // DATA Get
        $scope.getDatafeeds = () => {
            datafeedsService.getDatafeeds({}, { includeStar: true }, $scope.pagination).then((res) => {
                $scope.datafeeds = res.items;
                $apply($scope);
            });
        };

        // Init
        $scope.init = () => {
            _C.getRouteParams();
            _C.configureShortcuts();

            $scope.getDatafeeds();
        };
        //-------------------------------------
        $rootScope.settingsPromise.then(() => {
            $scope.init();
        })
    }

    // ---------------------------------------------------------

    // Routing  
    getRouteParams() {
        this.$scope.view = 'List';
        this.$rootScope.windowTitle = 'Datafeeds List';
    };

    configureShortcuts() {

        this.utils.registerShortcuts(this, [
            { // CTRL + A - add datafeed
                modyfier: 'ctrl',
                key: 65,
                action: () => {
                    this.$location.path('/datafeed/null');
                    $apply(this.$scope);
                }
            },
        ])
    };

}

angular.module('myApp').controller('datafeedsController', DatafeedsController);