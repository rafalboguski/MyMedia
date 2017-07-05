import { myApp, Models } from '../App';

import * as mysql from 'mysql';

export class GenericRepository {

    private _connection: mysql.IConnection;

    static $inject = ['$q'];

    constructor(protected $q: ng.IQService) {
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
                    console.error(err);
                    return reject(err);
                }
                resolve(rows);
            });
        });

    };

    protected sqlFilter(sql: string, filter: Models.ModelFilter): string {
        for (var key in filter.exact) {
            let value = filter.exact[key];
            if ((value != null && value != '') && filter.exact.hasOwnProperty(key)) {
                sql += `AND ${key} = '${value}'`;
            }
        }

        for (var key in filter.pattern) {
            let value = filter.pattern[key];
            if ((value != null && value != '') && filter.pattern.hasOwnProperty(key)) {
                sql += `AND ${key} like '%${value}'%`;
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

    protected sqlOrderBy(sql: string, filter: Models.ModelFilter): string {
        sql += ` ORDER BY ${filter.orderBy} ${filter.ascending ? 'ASC' : 'DESC'}`;
        return sql;
    }
}