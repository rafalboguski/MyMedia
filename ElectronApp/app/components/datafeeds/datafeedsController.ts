class DatafeedsController {

    static $inject = ['$window', 'ModalService', '$routeParams', '$scope', '$rootScope', '$http', '$location', '$q',
        'datafeedsService', 'StarsService', 'Utils', 'myModalService', '$sce'];

    constructor(
        private $window: ng.IWindowService,
        private modalService,
        private $routeParams,
        private $scope,
        private $rootScope: IAppRootScope,
        private $http: ng.IHttpService,
        private $location: ng.ILocationService,
        private $q: ng.IQService,
        private datafeedsService: DatafeedsService,
        private starsService: StarsService,
        private utils: Utils,
        private myModalService,
        private $sce: ng.ISCEProvider
    ) {

        var _C = this;
        $scope._C = this;
        //-------------------------------------
        $scope.scope = $scope;
        $scope.datafeeds = null;

        $scope.filter = {};

        // DATA Get
        $scope.getDatafeeds = () => {
            datafeedsService.getDatafeeds({}, { includeStar: true }).then((list) => {
                $scope.datafeeds = list;
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