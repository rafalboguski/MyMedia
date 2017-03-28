const opn = require('opn');


class Datafeed implements IModel {

    _id: number;

    name: string;

    stars_ids: number[];
    tags_ids: number[];

    linkFrom: string;
    linkTo: string;
    rangeFrom: number;
    rangeTo: number;
    dateFrom: Date;
    dateTo: Date;
    textFrom: string;
    textTo: string;
    text: string;
    rank: number; // <0;5>

    marked: boolean;
    done: boolean;

    timestamp: Date;

    openLinkFrom(self) {
        opn(self.linkFrom);
    }

    openLinkTo(self) {
        opn(self.linkTo);
    }

    getClear(): Datafeed {
        return angular.copy(this);
    }
}

class DatefeedsService {

    private collection: string = 'datafeeds';

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
        model = this.GenericService.buildNEW(model, new Datafeed());

        return model;
    };

    // Get
    getDatafeed(id) {
        return this.GenericService.single(this.collection, id, this);
    };

    getDatafeeds() {
        return this.GenericService.many(this.collection, {}, this);
    };

    // Set
    addDatafeed(model) {
        return this.GenericService.add(this.collection, model);
    };

    saveDatafeed(model) {
        return this.GenericService.save(this.collection, model);
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


