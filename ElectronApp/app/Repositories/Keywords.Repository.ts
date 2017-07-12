import { Models, Repositories, Services } from '../App'
import * as _ from 'lodash'

export class KeywordsRepository extends Repositories.GenericRepository {

    static $inject = ['$q', 'AlertsService'];

    constructor($q: ng.IQService, AlertsService: Services.AlertsService) {
        super($q, AlertsService);
    }

    public getKeywords(filter: Models.KeywordFilter): Promise<Models.Keyword[]> {

        let sql = "SELECT * FROM keywords WHERE 1=1 ", where = '', order = '', limit = '';

        if (filter) {
            where = this.sqlWhere(filter);
            order = this.sqlOrder(filter);
            limit = this.sqlLimit(filter, sql + where + order);
        }

        return this.execute(() => { return this.query(sql + where + order + limit) });
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
            .then((data: Models.Keyword[]) => {
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