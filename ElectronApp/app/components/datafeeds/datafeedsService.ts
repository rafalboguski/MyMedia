class DatefeedsService {

    private collectionName: string = 'datafeeds';

    private rootScope: ng.IRootScopeService;
    private location: ng.ILocationService;
    private AlertsService: AlertsService;
    private GenericService: GenericService;

    constructor($rootScope: ng.IRootScopeService, $location: ng.ILocationService, AlertsService: AlertsService, GenericService: GenericService) {
        this.rootScope = $rootScope;
        this.location = $location;
        this.AlertsService = AlertsService;
        this.GenericService = GenericService;
    }

    // run after fetching from db
    build(model) {
        model = this.GenericService.build(model, {
            properties: {
                _id: null,
                name: null,

                stars_ids: [],
                tags_ids: [],

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
    clean(model) {
        this.GenericService.clean(model);
    };

    // Get
    getDatafeed(id) {
        return this.GenericService.single(this.collectionName, id, this);
    };

    getDatafeeds() {
        return this.GenericService.many(this.collectionName, {}, this);
    };

    // Set
    addDatafeed(model) {
        return this.GenericService.add(this.collectionName, model);
    };

    saveDatafeed(model) {
        return this.GenericService.save(this.collectionName, model);
    };

    // Remove
    removeDatafeed(star, callback) {
        this.GenericService.mongo(function (db) {
            var collection = db.collection('stars');

            collection.deleteOne({ _id: star._id }, function (err, result) {
                db.close()

                if (angular.isFunction(callback))
                    callback(result);
            });
        });
    };
}

angular.module('myApp').service('datafeedsService', ['$rootScope', '$location', 'AlertsService', 'GenericService', DatefeedsService]);


