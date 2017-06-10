import { myApp, Models, Repositories } from '../App'
import * as _ from 'lodash'

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

    public search(value: string): Promise<Models.Keyword[]> {
        if (!value) {
            return this.getAll();
        }

        return this.execute(() => {
            return this.query("SELECT * FROM keywords WHERE value = ?", [value]);
        });
    }

    public create(keyword: Models.Keyword): Promise<{ insertId: number }> {
        return this.execute(() => {
            return this.query("INSERT INTO keywords SET ?", keyword);
        });
    }

    public createMany(keywords: Models.Keyword[]): Promise<{ created: Models.Keyword[], failed: Models.Keyword[] }> {
        var promises = [];

        for (let keyword of keywords) {
            promises.push(this.create(keyword)
                .then(data => {
                    keyword.id = data.insertId;
                    return keyword
                })
                .catch(err => {
                    return keyword;
                }));
        }

        return this.$q.all(promises)
            .then((data) => {
                return {
                    created: _.reject(data, { "id": null }),
                    failed: _.filter(data, { id: null })
                }
            })
    }

    // public update(set, id: number): Promise<Models.Star[]> {
    //     return this.execute(() => {
    //         return this.query('update keywords set ? where id = ?', [set, id]);
    //     });
    // }

    public delete(id: number): Promise<void> {
        return this.execute(() => {
            return this.query('DELETE FROM keywords WHERE id = ?', [id]);
        });
    }
}