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

    private collection: string = 'stars';

    constructor(
        private $rootScope: IAppRootScope,
        private $location: ng.ILocationService,
        private alertsService: AlertsService,
        private $q: ng.IQService,
        private genericService: GenericService,
        private settingsService: SettingsService) {
    }

    // run after fetching from db
    build(model): Star {
        var self = this;

        let star: Star = self.genericService.buildNEW(model, new Star());

        // set paths
        let coverThumbnailPath: string;
        let coverFullPath: string;

        if (star._id !== null && star.hasCover) {
            coverThumbnailPath = self.$rootScope.settings.pathGlobalData + '\\covers\\' + self.collection + '\\thumbails\\' + star._id + ".jpg";
            coverFullPath = self.$rootScope.settings.pathGlobalData + '\\covers\\' + self.collection + '\\full\\' + star._id + ".jpg";
        }
        else {
            coverThumbnailPath = self.$rootScope.settings.pathGlobalData + '\\covers\\placeholder.jpg';
            coverFullPath = self.$rootScope.settings.pathGlobalData + '\\covers\\placeholder.jpg';
        }
        star.coverThumbnailPath = coverThumbnailPath.split('\\').join('/') + '?' + new Date().getTime();
        star.coverFullPath = coverFullPath.split('\\').join('/') + '?' + new Date().getTime();

        return star;
    };

    // Get
    getStar(id: number): Promise<Star> {
        return this.genericService.single(this.collection, id, this);
    };

    getStars(search = {}): Promise<Array<Star>> {
        return this.genericService.many(this.collection, search, this);
    };

    // Set
    addStar(star: Star) {
        return this.genericService.add(this.collection, star).then(id => {
            star._id = id;

            return this.saveStar(star).then(res => {
                return star._id;
            })
        });
    };

    saveStar(star: Star) {
        return this.generateThumbnail(star).then(() => {
            return this.genericService.save(this.collection, star);
        });
    };

    // Remove
    removeStar(star, callback) {
        this.genericService.mongo((db) => {
            var collection = db.collection('stars');

            collection.deleteOne({ _id: star._id }, (err, result) => {
                db.close()

                if (angular.isFunction(callback))
                    callback(result);
            });
        });
    };

    generateThumbnail(star: Star): any {

        // variable is set ony whe new photo was picked
        if (!star.newCoverPath) {
            console.log('No star.tmp.newCoverPath');
            return this.$q.resolve();
        }

        star.hasCover = true;

        var src = star.newCoverPath;

        var pathThumbnail = this.$rootScope.settings.pathGlobalData + '\\covers\\stars\\thumbails\\' + star._id + ".jpg";
        var pathFull = this.$rootScope.settings.pathGlobalData + '\\covers\\stars\\full\\' + star._id + '.jpg';

        require('fs-path').writeFile(pathFull, fs.readFileSync(src));

        var command = '"' + this.$rootScope.settings.pathThumbnailGenerator + '\\tg.exe" ';
        command += '"' + src + '" ';
        command += '"' + pathThumbnail + '" ';
        command += '300 300 false true';

        var d = this.$q.defer();
        require("cmd-exec").init().exec(command, (err, res) => {
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
