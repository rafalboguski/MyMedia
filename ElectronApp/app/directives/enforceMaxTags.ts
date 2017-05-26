// class enforceMaxTags implements ng.IDirective {

//     require = 'ngModel'

//     constructor() {
//     }

//     link = ($scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ngModelController: ng.INgModelController) => {
//         var maxTags = attrs.maxTags ? parseInt(attrs.maxTags, 10) : null;
//         ngModelController.$validators.checkLength = function (value) {

//             if (attrs.onlyFromList == 'true') {
//                 if (value && value.length > 0 && !value[value.length - 1]._id) {
//                     value.splice(value.length - 1, 1);
//                 }
//             }

//             if (value && maxTags && value.length > maxTags) {
//                 value.splice(value.length - 2, 1);
//             }
//             return value;
//         };
//     }

//     static factory(): ng.IDirectiveFactory {
//         const directive = () => new enforceMaxTags();
//         directive.$inject = [];
//         return directive;
//     }
// }
// angular.module('myApp').directive('enforceMaxTags', [enforceMaxTags.factory()]);