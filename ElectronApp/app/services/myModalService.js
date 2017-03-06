angular.module('myApp')
    .service('myModalService', ['$rootScope', '$location', 'alertsService', '$q', 'genericService', 'ModalService',
        function ($rootScope, $location, alertsService, $q, genericService, ModalService) {


            this.DataFeed = function (controller, modal_data, callback) {
                ModalService.showModal({
                    templateUrl: "app/views/modals/datafeed.html",
                    controller: "datafeedController",
                    inputs: {
                        data: modal_data
                    }
                }).then(function (modal) {
                    modal.element.modal();
                    modal.element.on('hidden.bs.modal', function () { controller.configureShortcuts(); });
                    modal.close.then(function (result) {
                        controller.configureShortcuts();

                        callback(result);
                    });
                });
            }

        }]);
