class StarsService {

    private rootScope: RootScope;
    private location: ng.ILocationService;
    private AlertsService: any;
    private q: ng.IQService;
    private GenericService: GenericService;
    private SettingsService: any;

    private collectionName: string = 'stars';
    private $servive = this;
    constructor($rootScope: RootScope, $location: ng.ILocationService, AlertsService: AlertsService, $q: ng.IQService, GenericService: GenericService, SettingsService: any) {

        this.rootScope = $rootScope;
        this.location = $location;
        this.AlertsService = AlertsService;
        this.q = $q;
        this.GenericService = GenericService;
        this.SettingsService = SettingsService;

    }

    // run after fetching from db
    build(model: any) {
        var self = this;

        model = self.GenericService.build(model, {
            properties: {
                _id: null,
                name: null,
                hasCover: false,
            },
            tmp: {
                coverThumbnailPath: null,
                coverFullPath: null,
                newCoverPath: null // userd to insert new image
            },
            functions: {

            }
        });

        var coverThumbnailPath;
        var coverFullPath;
        // set paths
        if (model._id !== null && model.hasCover) {
            coverThumbnailPath = self.rootScope.settings.paths.globalData + '\\covers\\' + self.collectionName + '\\thumbails\\' + model._id + ".jpg";

            coverFullPath = self.rootScope.settings.paths.globalData + '\\covers\\' + self.collectionName + '\\full\\' + model._id + ".jpg";

        }
        else {
            coverThumbnailPath = self.rootScope.settings.paths.globalData + '\\covers\\placeholder.jpg';
            coverFullPath = self.rootScope.settings.paths.globalData + '\\covers\\placeholder.jpg';
        }
        model.tmp.coverThumbnailPath = coverThumbnailPath.split('\\').join('/') + '?' + new Date().getTime();
        model.tmp.coverFullPath = coverFullPath.split('\\').join('/') + '?' + new Date().getTime();

        return model;
    };

    // run before saving in db
    clean(model) {
        var self = this;

        self.GenericService.clean(model);
    };

    // Get
    getStar(id) {
        var self = this;

        return self.GenericService.single(self.collectionName, id, self);
    };

    getStars(search) {
        var self = this;

        if (!search)
            search = {};
        return self.GenericService.many(self.collectionName, search, self);
    };

    // Set
    addStar(model) {
        var self = this;

        var tmp = angular.copy(model.tmp);
        return self.GenericService.add(self.collectionName, model).then(id => {
            model._id = id;
            model.tmp = tmp;
            return self.$servive.generateThumbnail(model).then(function () {
                return self.$servive.saveStar(model).then(res => {
                    return model._id;
                })
            });

        });
    };

    saveStar(model) {
        var self = this;
        return self.generateThumbnail(model).then(function () {
            return self.GenericService.save(self.collectionName, model);
        });
    };

    // Remove
    removeStar(star, callback) {
        this.GenericService.mongo(function (db) {
            var collection = db.collection('stars');

            collection.deleteOne({ _id: star._id }, function (err, result) {
                db.close()

                if (angular.isFunction(callback))
                    callback(result);
            });
        });
    };

    generateThumbnail(star): any {

        var self = this;
        // variable is set ony whe new photo was picked
        if (!star.tmp.newCoverPath) {
            console.log('No star.tmp.newCoverPath');
            return self.q.resolve();
        }

        star.hasCover = true;

        var src = star.tmp.newCoverPath;

        var pathThumbnail = self.rootScope.settings.paths.globalData + '\\covers\\stars\\thumbails\\' + star._id + ".jpg";
        var pathFull = self.rootScope.settings.paths.globalData + '\\covers\\stars\\full\\' + star._id + '.jpg';

        require('fs-path').writeFile(pathFull, fs.readFileSync(src));

        var command = '"' + self.rootScope.settings.paths.thumbnailGenerator + '\\tg.exe" ';
        command += '"' + src + '" ';
        command += '"' + pathThumbnail + '" ';
        command += '300 300 false true';

        var d = self.q.defer();
        require("cmd-exec").init().exec(command, function (err, res) {
            if (err) {
                alert(err)
                console.log(err.message);
                d.reject(err);
            }
            d.resolve(pathThumbnail);
        });
        return d.promise;
    };


}

angular.module('myApp').service('StarsService', ['$rootScope', '$location', 'AlertsService', '$q', 'GenericService', 'SettingsService', StarsService]);
