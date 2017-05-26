import { myApp, Models } from '../App';

import * as mysql from 'mysql';

export class GenericRepository {

    protected _connection: mysql.IConnection;

    static $inject = ['$q'];

    constructor(protected $q: ng.IQService) {
    }

    private createConnection(): Promise<mysql.IConnection> {

        return this.$q((resolve, reject) => {
            var connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '27BauzzerAb123456',
                database: 'library'
            });
            /*
            connection.config.queryFormat = function (query, values) {
                if (!values) return query;
                return query.replace(/\:(\w+)/g, function (txt, key) {
                    if (values.hasOwnProperty(key)) {
                        return this.escape(values[key]);
                    }
                    return txt;
                }.bind(this));
            };
            */
            connection.connect();

            this._connection = connection;
            resolve(connection);
        })
    }

    protected execute(fun: () => Promise<any>) {
        return this.createConnection()
            .then(fun)
            .then(data => {
                this._connection.end();
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
}