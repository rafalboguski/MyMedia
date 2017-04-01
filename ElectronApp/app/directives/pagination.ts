class PaginationDirective implements ng.IDirective {

    restrict = 'EA';
    replace: true;
    scope = {
        //@ reads the attribute value, = provides two-way binding, & works with functions
        loadItemsFn: '&',
        pagination: '='
    };
    templateUrl = 'app/directives/pagination.html';

    constructor(private $rootScope: IAppRootScope) {
    }

    link = ($scope: any, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
        $scope.$rootScope = this.$rootScope;

        $scope.changePage = (i: number) => {

            if ($scope.pagination.pageSize < 1) {
                $scope.pagination.pageSize = 1;
            }

            $scope.pagination.page = i;
            $scope.loadItemsFn()();
        }

        $scope.canPrevious = () => {
            return $scope.pagination.page > 1;
        }

        $scope.previousPage = () => {

            if ($scope.canPrevious()) {
                $scope.changePage($scope.pagination.page - 1);
            }
        }

        $scope.canNext = () => {
            return !($scope.pagination.page >= $scope.pagination.pages());
        }

        $scope.nextPage = () => {

            if ($scope.canNext()) {
                $scope.changePage($scope.pagination.page + 1);
            }
        }
    }

    static factory(): ng.IDirectiveFactory {
        const directive = ($rootScope: IAppRootScope) => new PaginationDirective($rootScope);
        directive.$inject = ['$rootScope'];
        return directive;
    }
}

angular.module('myApp').directive('paginationControlls', ['$rootScope', PaginationDirective.factory()]);