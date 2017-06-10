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
}