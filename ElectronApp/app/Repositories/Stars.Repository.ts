import { myApp, Models, Repositories } from '../App'

export class StarsRepository extends Repositories.GenericRepository {

    static $inject = ['$q'];

    constructor($q: ng.IQService) {
        super($q);
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