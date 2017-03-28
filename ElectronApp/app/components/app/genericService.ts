class GenericService {

    private q: ng.IQService;
    private AlertsService: AlertsService;

    constructor($q: ng.IQService, AlertsService: AlertsService) {
        this.q = $q;
        this.AlertsService = AlertsService;
    }

    mongo(job, self?) {

        mongoClient.connect('mongodb://localhost:27017/media', (err, db) => {

            if (err) {
                return err;
            }

            job(db, self);
        });
    };

    // run after fetching from db
    buildNEW(model, data) {

        if (!model) {
            model = {};
        }

        // add fiels if they don't exist
        _.defaults(model, data);

        return model;
    };

    execute(fun) {
        return mongoClient.connect(_DB)
            .then(db => { return fun(db); })
            .catch(error => {
                alert(error);
                console.error(error);
                return this.q.reject(error);
            });
    };

    // CRUD
    single(collection: string, id: number | string, service: any): Promise<IModel> {
        return this.execute(db => {
            return db.collection(collection).findOne({ _id: id })
                .then(result => {

                    if (result) { service.build(result); }

                    db.close();
                    return this.q.resolve(result);
                })
        });
    };

    many(collection: string, search: any, service: any): Promise<IModel[]> {
        return this.execute(db => {
            return db.collection(collection).find(search).toArray()
                .then(result => {

                    angular.forEach(result, (value, key) => { service.build(value); });

                    db.close();
                    return this.q.resolve(result);
                });
        });
    };

    any(collection: string, search): Promise<boolean> {
        return this.execute(db => {
            return db.collection(collection).findOne(search)
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

    add(collection: string, model: IModel): Promise<string | number> {
        var self = this;

        model = model.getClear();

        return self.execute(db => {

            var collection = db.collection(collection);

            return this.getNext_Id(db, collection).then(autoIndex => {

                model._id = <number>autoIndex;

                return collection.insert(model).then(result => {
                    db.close();
                    return this.q.resolve(model._id);
                });
            });

        });
    };

    save(collection: string, document: IModel): Promise<IModel> {
        var self = this;
        document = document.getClear();

        return self.execute(db => {

            return self.any(collection, { _id: document._id }).then(result => {
                if (!result) {
                    throw 'Document doesn\'t exist in database';
                }
                else {

                    return db.collection(collection).updateOne({ _id: document._id }, document).then(result => {
                        db.close();
                        return this.q.resolve(result);
                    });
                }
            })

        });
    };

    remove(star, callback) {
        this.mongo(function (db) {
            var collection = db.collection('stars');

            collection.deleteOne({ _id: star._id }, function (err, result) {
                db.close()

                if (angular.isFunction(callback))
                    callback(result);
            });
        });
    };

    // Utils
    getNext_Id(db: IDBDatabase, collection: string) {

        var d = $.Deferred();
        autoIncrement.getNextSequence(db, collection, function (error, res) {

            if (error) {
                d.reject(error);
            }

            d.resolve(res);
        });
        return d.promise();
    };

}

angular.module('myApp').service('GenericService', ['$q', 'AlertsService', GenericService]);