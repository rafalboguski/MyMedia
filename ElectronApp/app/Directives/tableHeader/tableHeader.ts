import { myApp, Models, Dto, Repositories, Services } from '../../App'

interface ITableHeaderScope extends ng.IScope {
    showSearch: string | boolean;
    showOrder: string | boolean;

    label: string;
    property: string;
    filter: Models.ModelFilter<any>;
    showSearchInput: boolean;

    searchText: string;

    source(): any
    reverseOrder();
    toggleSearchInput();
}

export class TableHeaderDirective implements ng.IDirective {

    restrict = 'A';
    replace: true;
    templateUrl = './app/Directives/tableHeader/tableHeader.html';
    scope = { //@ reads the attribute value, = provides two-way binding, & works with functions
        showSearch: '=?',
        showOrder: '=?',
        label: '@',
        filter: '=',
        property: '@',
        source: '&'
    };

    constructor() {

    }

    link = ($scope: ITableHeaderScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {

        if ($scope.showSearch == undefined) {
            $scope.showSearch = true;
        }

        if ($scope.showOrder == undefined) {
            $scope.showOrder = true;
        }

        $scope.showSearchInput = true;

        $scope.reverseOrder = () => {

            if ($scope.filter.orderBy == $scope.property) {
                $scope.filter.ascending = !$scope.filter.ascending;
            }

            $scope.filter.orderBy = $scope.property;
            $scope.source();
        }

        $scope.toggleSearchInput = () => {
            // $scope.showSearchInput = !$scope.showSearchInput
            // if ($scope.showSearchInput) {
            //     setTimeout(() => { (element[0].querySelector('.th-search-input') as any).focus(); }, 50);
            // }
        }

        $scope.$watch('searchText', (newValue) => {
            $scope.filter.pattern[$scope.property] = newValue;
            $scope.source();
        });
    }

    static factory(): ng.IDirectiveFactory {
        const directive = () => new TableHeaderDirective();
        directive.$inject = [];
        return directive;
    }
}