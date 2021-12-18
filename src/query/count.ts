import BaseQuery from './base';

/** Count the number entries for a specific table */
export default class CountQuery<T> extends BaseQuery<[{ count: number }]> {
	/**
	 * @param table name of the target table
	 * @example To count the total number of users,
	 * ```ts
	 * new CountQuery<User>('users')
	 * ```
	 * @example To count the number of students whose height is over 170 (cm),
	 * ```ts
	 * new CountQuery<Student>('students')
	 *     .where('`height`>? GROUP BY `gender`', [170])
	 * ```
	 */
	constructor(table: string) {
		super(`SELECT COUNT(*) AS \`count\` FROM \`${table}\``);
	}

	/**
	 * Filter the entries which satisfy the condition
	 * @param conditions the conditions of the WHERE clause in SQL SELECT query
	 * @param parameters values for escapes in conditions
	 * @returns `this`
	 */
	where(conditions: string, parameters?: unknown[]): CountQuery<T> {
		this.sqlQuery += ' WHERE ' + conditions;
		this.parameters = parameters;
		return this;
	}
}
