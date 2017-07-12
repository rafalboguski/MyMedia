import { Models, Services } from '../App';
import * as mysql from 'mysql';

export class GenericRepository {

    private _connection: mysql.IConnection;

    static $inject = ['$q', 'AlertsService'];

    constructor(protected $q: ng.IQService, protected _AlertsService: Services.AlertsService) {
    }

    private createConnection(): Promise<mysql.IConnection> {

        return this.$q((resolve, reject) => {
            if (!this._connection) {
                let connection = mysql.createConnection({
                    host: '127.0.0.1',
                    user: 'root',
                    password: '27BauzzerAb123456',
                    database: 'library'
                });

                connection.connect();

                this._connection = connection;

            }
            resolve(this._connection);
        })
    }

    protected execute(fun: () => Promise<any>) {
        return this.createConnection()
            .then(fun)
            .then(data => {
                //this._connection.end();
                return data;
            });
    };

    protected query(sql: string, params: any = null): Promise<any> {

        return this.$q((resolve, reject) => {
            this._connection.query(sql, params, (err, rows, fields) => {
                if (err) {
                    if (err.code == 'ECONNREFUSED') {
                        this._AlertsService.error('Could not connect to DB');
                    }
                    console.error(err);
                    return reject(err);
                }
                resolve(rows);
            });
        });

    };

    protected sqlWhere(filter: Models.ModelFilter<any>): string {
        let sql = '';
        for (var key in filter.exact) {
            let value = filter.exact[key];
            if ((value != null && value != '') && filter.exact.hasOwnProperty(key)) {
                sql += `AND ${key} = '${value}'`;
            }
        }

        for (var key in filter.pattern) {
            let value = filter.pattern[key];
            if ((value != null && value != '') && filter.pattern.hasOwnProperty(key)) {
                sql += `AND ${key} LIKE '%${value}%'`;
            }
        }

        for (var key in filter.exists) {
            let value = filter.exists[key];
            if (value != null && filter.exists.hasOwnProperty(key)) {
                if (value == false) // show that has empty column
                    sql += `AND ${key} > ' '`;
                else // show that has data in column
                    sql += `AND ${key} <= ' '`;
            }
        }

        return sql;
    }

    protected sqlOrder(filter: Models.ModelFilter<any>): string {
        return ` ORDER BY ${filter.orderBy} ${filter.ascending ? 'ASC' : 'DESC'}`;
    }

    protected sqlLimit(filter: Models.ModelFilter<any>, sql_with_where: string): string {

        if (filter.pagination && (filter.pagination.mode == Models.PaginationMode.Enabled || filter.pagination.mode == Models.PaginationMode.Scroll)) {
            this.execute(() => {
                return this.query(sql_with_where)
                    .then((data: any[]) => filter.pagination.ItemsCount = data.length)
            });

            return ` LIMIT ${(filter.pagination.page - 1) * filter.pagination.pageSize}, ${(filter.pagination.page) * filter.pagination.pageSize}`;
        }

        return '';
    }
}