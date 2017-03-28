
class Star implements IModel {

    _id: string | number = null;
    name: string = null;
    hasCover: boolean = null;

    // cleared
    coverThumbnailPath: string = null;
    coverFullPath: string = null;
    newCoverPath: string = null; // userd to insert new image

    getClear(): Star {
        var clear = angular.copy(this)

        delete clear.coverThumbnailPath;
        delete clear.coverFullPath;
        delete clear.newCoverPath;

        return clear;
    }
}


class StarsService {

    private rootScope: IAppRootScope;
    private location: ng.ILocationService;
    private AlertsService: any;
    private q: ng.IQService;
    private genericService: GenericService;
    private SettingsService: any;

    private collectionName: string = 'stars';
    constructor($rootScope: IAppRootScope, $location: ng.ILocationService, AlertsService: AlertsService, $q: ng.IQService, GenericService: GenericService, SettingsService: any) {

        this.rootScope = $rootScope;
        this.location = $location;
        this.AlertsService = AlertsService;
        this.q = $q;
        this.genericService = GenericService;
        this.SettingsService = SettingsService;

    }

    // run after fetching from db
    build(model): Star {
        var self = this;

        let star: Star = self.genericService.buildNEW(model, new Star());

        // set paths

        let coverThumbnailPath: string;
        let coverFullPath: string;

        if (star._id !== null && star.hasCover) {
            coverThumbnailPath = self.rootScope.settings.pathGlobalData + '\\covers\\' + self.collectionName + '\\thumbails\\' + star._id + ".jpg";
            coverFullPath = self.rootScope.settings.pathGlobalData + '\\covers\\' + self.collectionName + '\\full\\' + star._id + ".jpg";
        }
        else {
            coverThumbnailPath = self.rootScope.settings.pathGlobalData + '\\covers\\placeholder.jpg';
            coverFullPath = self.rootScope.settings.pathGlobalData + '\\covers\\placeholder.jpg';
        }
        star.coverThumbnailPath = coverThumbnailPath.split('\\').join('/') + '?' + new Date().getTime();
        star.coverFullPath = coverFullPath.split('\\').join('/') + '?' + new Date().getTime();

        return star;
    };

    // Get
    getStar(id: number) {
        var self = this;

        return self.genericService.single(self.collectionName, id, self);
    };

    getStars(search) {
        var self = this;

        if (!search)
            search = {};
        return self.genericService.many(self.collectionName, search, self);
    };

    // Set
    addStar(star: Star) {
        var self = this;

        return self.genericService.add(self.collectionName, star).then(id => {
            star._id = id;

            return self.saveStar(star).then(res => {
                return star._id;
            })
        });
    };

    saveStar(star: Star) {
        var self = this;

        return self.generateThumbnail(star).then(function () {
            return self.genericService.save(self.collectionName, star);
        });
    };

    // Remove
    removeStar(star, callback) {
        this.genericService.mongo(function (db) {
            var collection = db.collection('stars');

            collection.deleteOne({ _id: star._id }, function (err, result) {
                db.close()

                if (angular.isFunction(callback))
                    callback(result);
            });
        });
    };

    generateThumbnail(star: Star): any {

        var self = this;
        // variable is set ony whe new photo was picked
        if (!star.newCoverPath) {
            console.log('No star.tmp.newCoverPath');
            return self.q.resolve();
        }

        star.hasCover = true;

        var src = star.newCoverPath;

        var pathThumbnail = self.rootScope.settings.pathGlobalData + '\\covers\\stars\\thumbails\\' + star._id + ".jpg";
        var pathFull = self.rootScope.settings.pathGlobalData + '\\covers\\stars\\full\\' + star._id + '.jpg';

        require('fs-path').writeFile(pathFull, fs.readFileSync(src));

        var command = '"' + self.rootScope.settings.pathThumbnailGenerator + '\\tg.exe" ';
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
