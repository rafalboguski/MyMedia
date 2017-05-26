import { myApp, Models } from '../App'

export class DatasourcesRepository {

    static $incject = ['$q',];

    constructor(
        private $q: ng.IQService,
    ) {
    }

    GetAll(): Promise<Models.DataSource[]> {
        return this.$q((resolve, reject) => {
            resolve(null);
        })
    }

    Add(path: string) {
        return this.$q((resolve, reject) => {
            resolve();
        })
    }

    AddMany(paths: string[]): Promise<any> {
        return this.$q((resolve, reject) => {
            resolve();
        })
    }

    Delete(id: number) {
        return this.$q((resolve, reject) => {
            resolve();
        })
    }

    DeleteAll() {
        return this.$q((resolve, reject) => {
            resolve();
        })
    }
}

