import { myApp, Models, Dto, Repositories, Services } from '../../App'

interface ITableHeaderScope extends ng.IScope {
    showSearch: string | boolean;
    showOrder: string | boolean;

    label: string;
    property: string;
    filter: Models.ModelFilter;
    showSearchInput: boolean;

    searchText: string;

    source(): any
    reverseOrder();
}

export class TableHeaderDirective implements ng.IDirective {

    restrict = 'A';
    replace: true;
    templateUrl = './app/Directives/tableHeader/tableHeader.html';
    scope = {
        //@ reads the attribute value, = provides two-way binding, & works with functions
        showSearch: '=?',
        showOrder: '=?',
        label: '@',
        filter: '=',
        property: '@',
        source: '&'
    };

    link = ($scope: ITableHeaderScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {

        if ($scope.showSearch == undefined) {
            $scope.showSearch = true;
        }

        if ($scope.showOrder == undefined) {
            $scope.showOrder = true;
        }

        $scope.showSearchInput = false;

        $scope.reverseOrder = () => {
            $scope.filter.orderBy = $scope.property;
            $scope.filter.ascending = !$scope.filter.ascending;
            $scope.source();
        }

        $scope.$watch('searchText', (newValue) => {

            $scope.filter.pattern[$scope.property] = newValue;
            // todo: wait before firing request after each keypress
            $scope.source();
        });
    }

    static factory(): ng.IDirectiveFactory {
        const directive = () => new TableHeaderDirective();
        directive.$inject = [];
        return directive;
    }
}

//  myApp.directive('thExtended', [TableHeaderDirective.factory()]);