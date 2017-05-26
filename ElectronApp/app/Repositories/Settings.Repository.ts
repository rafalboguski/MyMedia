import { myApp, Models } from '../App'

export class SettingsRepository {

    static $inject = ['$q'];

    constructor(private $q: ng.IQService) {
    }

    Get(): Promise<Models.Settings> {
        return this.$q((resolve, reject) => {
            // SQL
            resolve(null);
        })
            .then((settings: Models.Settings) => {
                if (settings) {
                    return settings;
                }
                else {
                    this.Add().then(this.Get);
                }
            });
    }

    private Add(): Promise<number> {
        let model: Models.Settings = new Models.Settings();;

        return this.$q((resolve, reject) => {
            // SQL
            resolve(null);
        })
    }

    Save(settings: Models.Settings): Promise<any> {
        return this.$q((resolve, reject) => {
            // SQL
            resolve(null);
        })
    }
}
