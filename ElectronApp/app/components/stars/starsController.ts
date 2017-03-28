class StarsController {
    static $inject = ['$rootScope', '$scope', '$http', '$location', 'StarsService', 'Utils', 'myModalService'];

    constructor(
        private $rootScope: IAppRootScope,
        private $scope,
        private $http: ng.IHttpService,
        private $location: ng.ILocationService,
        private starsService: StarsService,
        private utils: Utils,
        private myModalService
    ) {

        var _C = this;
        //-------------------------------------
        $scope.stars = [];

        // DATA Get
        $scope.getStars = () => {
            starsService.getStars().then(stars => {
                $scope.stars = stars;
                $apply($scope);
            })
        };

        // Init
        $scope.init = () => {
            _C.getRouteParams();
            _C.configureShortcuts();

            $scope.getStars();
        };
        //-------------------------------------
        $rootScope.settingsPromise.then(() => {
            $scope.init();
        })
    }

    getRouteParams() {
        this.$scope.view = 'List';
        this.$rootScope.windowTitle = 'Stars List';
    }

    configureShortcuts() {
        this.utils.registerShortcuts(this, [
            { // CTRL + A - Add star
                modyfier: 'ctrl',
                key: 65,
                action: () => {
                    this.$location.path('/star/null');
                    $apply(this.$scope);
                }
            },
        ])
    }
}

angular.module('myApp').controller('starsController', StarsController);