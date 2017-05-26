import { myApp, Models, Repositories } from '../App'

export class KeywordsRepository extends Repositories.GenericRepository {

    static $inject = ['$q'];

    constructor($q: ng.IQService) {
        super($q);
    }

    public getAll(): Promise<Models.Keyword[]> {
        return this.execute(() => {
            return this.query('select * from keywords');
        });
    }

    public insert(keyword: Models.Keyword): Promise<number> {
        return this.execute(() => {
            return this.query("INSERT INTO keywords SET ?", keyword);
        });
    }

    public update(set, id: number): Promise<Models.Star[]> {
        return this.execute(() => {
            return this.query('update keywords set ? where id = ?', [set, id]);
        });
    }
    public delete() {

    }
}