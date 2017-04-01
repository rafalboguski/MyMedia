class Datafeed implements IModel {

    _id: number;

    name: string = null;

    stars_ids: Array<number> = [];
    tags_ids: Array<number> = [];

    linkFrom: string = null;
    linkTo: string = null;
    rangeFrom: number = null;
    rangeTo: number = null;
    dateFrom: Date = null;
    dateTo: Date = null;
    textFrom: string = null;
    textTo: string = null;
    text: string = null;
    rank: number = null; // <0;5>

    marked: boolean = null;
    done: boolean = null;

    timestamp: Date = null;

    //tmp
    stars: Array<Star> = [];

    openLinkFrom(self) {
        opn(self.linkFrom);
    }

    openLinkTo(self) {
        opn(self.linkTo);
    }

    getClear(): Datafeed {
        var clear = angular.copy(this)
        delete clear.stars;

        return clear;
    }
}
interface IDatafeedIncludes {
    includeStar?: boolean;
}

class DatafeedsService {

    private collection: string = 'datafeeds';

    constructor(
        private $rootScope: ng.IRootScopeService,
        private $q: ng.IQService,
        private AlertsService: AlertsService,
        private GenericService: GenericService,
        private starsService: StarsService) {
    }

    // run after fetching from db
    build(model?: Object): Datafeed {
        let datafeed: Datafeed = this.GenericService.buildNEW(model, new Datafeed());

        return datafeed;
    };

    // Get
    getDatafeed(id: number): Promise<Datafeed> {
        return this.GenericService.single(this.collection, id, this);
    };

    getDatafeeds(search: object = {}, includes?: IDatafeedIncludes, pagination?: Models.Pagination): Promise<{ items: Datafeed[], count: number }> {
        return this.GenericService.many(this.collection, search, this, pagination).then((res) => {

            pagination.items = res.count;

            if (includes && includes.includeStar) {
                let starPromises = [];

                for (let datafeed of res.items as Datafeed[]) {
                    for (let id of datafeed.stars_ids) {
                        starPromises.push(this.starsService.getStar(id).then(star => {
                            datafeed.stars.push(star)
                        }));
                    }
                }

                this.$q.all(starPromises).then(() => {
                    return res;
                })
            }

            return res;
        });
    };

    // Set
    addDatafeed(model: Datafeed): Promise<number> {
        return this.GenericService.add(this.collection, model);
    };

    saveDatafeed(model: Datafeed): Promise<Datafeed> {
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

angular.module('myApp').service('datafeedsService', ['$rootScope', '$q', 'AlertsService', 'GenericService', 'StarsService', DatafeedsService]);


