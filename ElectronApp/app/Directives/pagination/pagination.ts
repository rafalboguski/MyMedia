import { myApp, Models, Dto, Repositories, Services } from '../../App'

interface IPaginationScope extends ng.IScope {
    filter: Models.ModelFilter<any>
    source()

    pagination: Models.PaginationFilter

    changePage(i: number)

    canPrevious()
    previousPage()
    canNext()
    nextPage()
}

export class PaginationDirective implements ng.IDirective {

    restrict = 'EA';
    replace: true;
    templateUrl = 'app/directives/pagination.html';
    scope = { //@ reads the attribute value, = provides two-way binding, & works with functions
        filter: '=',
        source: '&'
    };

    constructor(private $rootScope: any) {
    }

    link = ($scope: IPaginationScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
        $scope.$rootScope = this.$rootScope;

        $scope.pagination = $scope.filter.pagination;

        $scope.changePage = (i: number) => {

            if ($scope.pagination.pageSize < 1) {
                $scope.pagination.pageSize = 1;
            }

            $scope.pagination.page = i;
            $scope.source()();
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
        const directive = ($rootScope: any) => new PaginationDirective($rootScope);
        directive.$inject = ['$rootScope'];
        return directive;
    }
}