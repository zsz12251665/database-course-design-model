import mysql from 'mysql';

const pool = mysql.createPool({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE
});


export default class BaseQuery<T> {
	protected sqlQuery!: string;
	protected parameters?: unknown[];

	constructor(sqlQuery: string, parameters?: unknown[]) {
		this.sqlQuery = sqlQuery;
		this.parameters = parameters;
	}

	commit(): Promise<T> {
		return new Promise((resolve, reject) => {
			pool.query(this.sqlQuery, this.parameters, (error, result) => {
				if (error !== null)
					reject(error);
				else
					resolve(result);
			});
		});
	}
}
