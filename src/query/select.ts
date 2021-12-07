import BaseQuery from './base';

type OrderPair<T> = [keyof T, 'ASC' | 'DESC'];

/** Query entries for a specific table */
export default class SelectQuery<T> extends BaseQuery<T[]> {
	/**
	 * @param table name of the target table
	 * @example To list an array of all users in ascending order,
	 * ```ts
	 * new SelectQuery<User>('users').orderBy(['id', 'ASC'])
	 * ```
	 * @example To query students whose height is over 170 (cm),
	 * ```ts
	 * new SelectQuery<Student>('students')
	 *     .where('`height`>? GROUP BY `gender`', [170])
	 * ```
	 */
	constructor(table: string) {
		super(`SELECT * FROM \`${table}\``);
	}

	/**
	 * Filter the entries which satisfy the condition
	 * @param conditions the conditions of the WHERE clause in SQL SELECT query
	 * @param parameters values for escapes in conditions
	 * @returns `this`
	 */
	where(conditions: string, parameters?: unknown[]): SelectQuery<T> {
		this.sqlQuery += ' WHERE ' + conditions;
		this.parameters = parameters;
		return this;
	}

	/**
	 * Sort the result entries in the given orders
	 * @param orders the key columns and sorting orders
	 * @returns `this`
	 */
	orderBy(...orders: OrderPair<T>[]): SelectQuery<T> {
		if (orders.length > 0) {
			const orderQuery = orders.map((pair) => pair.join(' ')).join(', ');
			this.sqlQuery += ' ORDER BY ' + orderQuery;
		}
		return this;
	}

	/**
	 * Set the starting number of the first result entry
	 * @param offset the number of entries in the front to be excluded
	 * @returns `this`
	 */
	offset(offset: number): SelectQuery<T> {
		this.sqlQuery += ` OFFSET ${offset}`;
		return this;
	}

	/**
	 * Limit the number the returning entries
	 * (only the first on them will be returned)
	 * @param limit the maximum number of entries to be returned
	 * @returns `this`
	 */
	limit(limit: number): SelectQuery<T> {
		this.sqlQuery += ` LIMIT ${limit}`;
		return this;
	}
}
