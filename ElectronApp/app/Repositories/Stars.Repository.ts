import { myApp, Models, Repositories, Services } from '../App'

export class StarsRepository extends Repositories.GenericRepository {

    static $inject = ['$q', 'AlertsService'];

    constructor($q: ng.IQService, AlertsService: Services.AlertsService) {
        super($q, AlertsService);
    }

    public getStar(id: number): Promise<Models.Star> {
        return this.execute(() => {
            return this.query('select * from stars where id = ?', [id]);
        });
    }

    public getStars(): Promise<Models.Star[]> {
        return this.execute(() => {
            return this.query('select * from stars');
        });
    }

    public insertStar(star: Models.Star): Promise<number> {
        return this.execute(() => {
            return this.query('insert into stars(name) set ? values(?)', [star.name]);
        });
    }

    public updateStar(set, id: number): Promise<Models.Star[]> {
        return this.execute(() => {
            return this.query('update stars set ? where id = ?', [set, id]);
        });
    }
}