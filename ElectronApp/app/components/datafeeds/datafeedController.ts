class DatafeedController {

    static $inject = ['$rootScope', '$scope', '$q', 'datafeedsService', 'StarsService', '$routeParams', 'Utils', '$http'];

    _datafeedId: number = null;

    constructor(
        private $rootScope: IAppRootScope,
        private $scope,
        private $q: ng.IQService,
        private datafeedsService: DatafeedsService,
        private StarsService: StarsService,
        private $routeParams,
        private Utils: Utils,
        private $http: ng.IHttpService
    ) {

        var _C = this;
        //-------------------------------------
        $scope.view = null;
        $scope.datafeed = null;
        $scope.datafeedOryginal = null;

        // UI
        $scope.today = () => {
            return new Date();
        };

        // DATA Set
        $scope.saveDatafeed = () => {
            let datafeed = <Datafeed>$scope.datafeed;

            if (datafeed._id) {
                datafeedsService.saveDatafeed($scope.datafeed).then(datafeed => {
                    init();
                });
            } else {
                datafeedsService.addDatafeed($scope.datafeed).then(id => {
                    $routeParams.datafeedId = id;
                    init();
                });
            }
        };

        // DATA Get
        $scope.getDatafeed = () => {
            if ($scope.view == 'Edit') {
                datafeedsService.getDatafeed(_C._datafeedId).then(datafeed => {
                    $scope.datafeed = datafeed;
                    $scope.datafeedOryginal = angular.copy(datafeed);
                    $rootScope.windowTitle = 'Datafeed "' + datafeed.name + '"';
                    $apply($scope);
                });
            }
            else if ($scope.view == 'Add') {
                $scope.datafeed = datafeedsService.build();
                $rootScope.windowTitle = 'Add datafeed';
            }
        };

        // Init
        function init() {
            _C.getRouteParams();
            _C.configureShortcuts();

            $scope.getDatafeed();
        };

        //-------------------------------------
        $rootScope.settingsPromise.then(res => {
            init();
        })
    }

    // ---------------------------------------------------------

    getRouteParams() {
        this._datafeedId = parseInt(this.$routeParams.datafeedId);

        if (this._datafeedId) {
            this.$scope.view = 'Edit';
            this.$rootScope.windowTitle = 'Datafeed';
        }
        else {
            this.$scope.view = 'Add';
            this.$rootScope.windowTitle = 'Add datafeed';
        }
        console.log(this.$scope.view + ' View');
    }

    configureShortcuts() {
        this.Utils.registerShortcuts(this, [
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
        ])
    }
}

angular.module('myApp').controller('datafeedController', DatafeedController);