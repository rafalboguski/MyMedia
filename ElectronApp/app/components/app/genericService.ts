declare var mongoClient: mongodb.MongoClient; mongoClient = require('mongodb').MongoClient;
declare var autoIncrement; autoIncrement = require("mongodb-autoincrement");
declare var opn; opn = require('opn');

declare var _DB: string; _DB = 'mongodb://localhost:27017/media';

class GenericService {

    private q: ng.IQService;
    private AlertsService: AlertsService;

    constructor($q: ng.IQService, AlertsService: AlertsService) {
        this.q = $q;
        this.AlertsService = AlertsService;
    }

    // legacy
    mongo(job: ((db: mongodb.Db, self) => any), self?) {

        mongoClient.connect('mongodb://localhost:27017/media', (err, db: mongodb.Db) => {

            if (err) {
                return err;
            }

            job(db, self);
        });
    };

    // run after fetching from db
    buildNEW(model, data: IModel) {

        if (!model) {
            model = {};
        }

        // add fiels if they don't exist
        _.defaults(model, data);

        return model;
    };

    connect(fun: ((db: mongodb.Db) => any)) {
        return mongoClient.connect(_DB)
            .then(db => { return fun(db); })
            .catch(error => {
                alert(error);
                console.error(error);
                return this.q.reject(error);
            });
    };

    // CRUD
    single(collectionName: string, id: number | string, service: any): Promise<IModel> {
        return this.connect(db => {
            return db.collection(collectionName).findOne({ _id: id })
                .then(result => {

                    if (result) { service.build(result); }

                    db.close();
                    return this.q.resolve(result);
                })
        })
    };

    many(collectionName: string, search: any, service: any): Promise<IModel[]> {
        return this.connect(db => {
            return db.collection(collectionName).find(search).toArray()
                .then(result => {

                    angular.forEach(result, (value, key) => { service.build(value); });

                    db.close();
                    return this.q.resolve(result);
                });
        });
    };

    any(collectionName: string, search): Promise<boolean> {
        return this.connect(db => {
            return db.collection(collectionName).findOne(search)
                .then(result => {

                    if (result) {
                        return this.q.resolve(true);
                    }
                    else {
                        return this.q.resolve(false);
                    }
                })
        });
    };

    // todo get, if not add and get

    add(collectionName: string, model: IModel): Promise<string | number> {

        model = model.getClear();

        return this.connect(db => {

            var collection = db.collection(collectionName);

            return this.getNext_Id(db, collectionName).then((autoIndex: number) => {

                model._id = autoIndex;

                return collection.insert(model).then(result => {
                    db.close();
                    return this.q.resolve(model._id);
                });
            });

        });
    };

    save(collectionName: string, document: IModel): Promise<IModel> {
        document = document.getClear();

        return this.connect(db => {
            return db.collection(collectionName).findOneAndUpdate({ _id: document._id }, document).then(res => {
                db.close();

                if (res.lastErrorObject.n !== 1) {
                    return this.q.reject('Document doesn\'t exist in database');
                }
                return this.q.resolve(res);
            });
        });
    };

    remove(star, callback) {
        this.mongo((db) => {
            var collection = db.collection('stars');

            collection.deleteOne({ _id: star._id }, (err, result) => {
                db.close()

                if (angular.isFunction(callback))
                    callback(result);
            });
        });
    };

    // Utils
    getNext_Id(db: mongodb.Db, collectionName: string): Promise<number> {
        var d = this.q.defer<number>()

        autoIncrement.getNextSequence(db, collectionName, (err, autoIndex: number) => {
            if (err) {
                d.reject(err);
            }
            d.resolve(autoIndex);
        });

        return d.promise as Promise<number>;
    };

}

angular.module('myApp').service('GenericService', ['$q', 'AlertsService', GenericService]);