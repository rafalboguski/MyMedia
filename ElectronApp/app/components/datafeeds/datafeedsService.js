angular.module('myApp')
    .service('datafeedsService', ['$rootScope', '$location', 'alertsService', 'genericService',
        function ($rootScope, $location, alertsService, genericService) {

            var collectionName = 'datafeeds';

            // run after fetching from db
            this.build = function (model) {

                model = genericService.build(model, {
                    properties: {
                        _id: null,
                        name: null,

                        stars_ids: null,
                        tags_ids: null,

                        linkFrom: null,
                        linkTo: null,
                        rangeFrom: null,
                        rangeTo: null,
                        dateFrom: null,
                        dateTo: null,
                        textFrom: null,
                        textTo: null,
                        text: null,
                        rank: null, // <0;5>

                        marked: null,
                        done: null,

                        timestamp: null,
                    },
                    tmp: {
                    },
                    functions: {
                        openLinkFrom: function (self) {
                            const opn = require('opn');
                            opn(self.linkFrom);
                        },
                        openLinkTo: function (self) {
                            const opn = require('opn');
                            opn(self.linkTo);
                        }

                    }
                });

                return model;
            };

            // run before saving in db
            this.clean = function (model) {
                genericService.clean(model);
            };

            // Get
            this.getDatafeed = function (id) {
                return genericService.single(collectionName, id, this.build);
            };

            this.getDatafeeds = function () {
                return genericService.many(collectionName, {}, this.build);
            };

            // Set
            this.addDatafeed = function (model) {
                return genericService.add(collectionName, model);
            };

            this.saveDatafeed = function (model) {
                return genericService.save(collectionName, model);
            };

            // Remove
            this.removeDatafeed = function (star, callback) {
                mongo(function (db) {
                    var collection = db.collection('stars');

                    collection.deleteOne({ _id: star._id }, function (err, result) {
                        db.close()

                        if (angular.isFunction(callback))
                            callback(result);
                    });
                });
            };


        }]);


