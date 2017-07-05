import { myApp, Models, Dto, Repositories, Services } from '../../App'

interface ITableHeaderScope extends ng.IScope {
    text: string;
    filter: Models.ModelFilter;
    property: string;
    source(): any

    reverseOrder();
}

export class TableHeaderDirective implements ng.IDirective {

    restrict = 'A';
    require: ['ngModel'];
    replace: true;
    templateUrl = './app/Directives/tableHeader/tableHeader.html';
    scope = {
        //@ reads the attribute value, = provides two-way binding, & works with functions
        text: '@',
        filter: '=',
        property: '@',
        source: '&'
    };

    link = ($scope: ITableHeaderScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {

        $scope.reverseOrder = () => {
            $scope.filter.orderBy = $scope.property;
            $scope.filter.ascending = !$scope.filter.ascending;
            $scope.source();
        }
    }

    static factory(): ng.IDirectiveFactory {
        const directive = () => new TableHeaderDirective();
        directive.$inject = [];
        return directive;
    }
}

//  myApp.directive('thExtended', [TableHeaderDirective.factory()]);