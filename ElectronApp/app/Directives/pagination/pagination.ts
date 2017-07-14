import { myApp, Models, Dto, Repositories, Services } from '../../App'
import * as _ from "lodash";

interface IPaginationScope extends ng.IScope {
    filter: Models.ModelFilter<any>
    source()

    $rootScope
    pagination: Models.PaginationFilter

    changePage(i: number)

    pageExists(page: number): boolean

    range(from: number, to: number): number[];
}

export class PaginationDirective implements ng.IDirective {

    restrict = 'EA';
    replace: true;
    templateUrl = 'app/directives/pagination/pagination.html';
    scope = { //@ reads the attribute value, = provides two-way binding, & works with functions
        filter: '=',
        source: '&'
    };

    constructor(private $location: ng.ILocationService) {
    }

    link = ($scope: IPaginationScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
        $scope.pagination = $scope.filter.pagination;

        $scope.pageExists = (page: number): boolean => {
            return page > 0 && page <= $scope.pagination.pages;
        }

        $scope.range = (from: number, to: number): number[] => {
            return _.range(from, to);
        };

        $scope.changePage = (i: number) => {
            $scope.pagination.calculatePages();

            if ($scope.pageExists(i)) {
                if ($scope.pagination.pageSize < 1) {
                    $scope.pagination.pageSize = 1;
                }

                $scope.pagination.page = i;
                $scope.source();
            }
        }
    }

    static factory(): ng.IDirectiveFactory {
        const directive = ($location: ng.ILocationService) => new PaginationDirective($location);
        directive.$inject = ['$location'];
        return directive;
    }
}