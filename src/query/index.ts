import DeleteQuery from './delete';
import InsertQuery from './insert';
import SelectQuery, { SelectOptions } from './select';
import UpdateQuery from './update';

export { DeleteQuery, InsertQuery, SelectQuery, UpdateQuery };

let verbose = false;

export default {
	/**
	 * Build a `SelectQuery` and commit immediately
	 * @param sqlQuery field list and conditions for the query
	 * @param parameters values for escapes
	 * @param options query Options
	 * @returns an array of query results
	 * @example The statement below returns an array of all users in ascending order:
	 * ```ts
	 * select<User>('* FROM `users`', { orders: ['id', 'ASC'] });
	 * ```
	 * @example The statement below returns the numbers of male and female students whose height is over 170 (cm):
	 * ```ts
	 * select<Student>('`gender`, COUNT(`id`) FROM `students` WHERE `height`>? GROUP BY `gender`', [170]);
	 * ```
	 */
	select<T, R = Record<string, unknown> >(sqlQuery: string, parameters?: unknown[], options?: SelectOptions<T>): Promise<R[]> {
		const query = new SelectQuery<T, R>('SELECT ' + sqlQuery, parameters);
		if (options?.orders !== undefined) query.orderBy(...options.orders);
		if (options?.offset !== undefined) query.offset(options.offset);
		if (options?.limit !== undefined) query.limit(options.limit);
		if (verbose) console.log(query);
		return query.commit();
	},

	/**
	 * Build an `InsertQuery` and commit immediately
	 * @param table target table name
	 * @param entity the entry to be inserted
	 * @returns An OK packet
	 */
	insert<T>(table: string, entity: Partial<T>): Promise<void> {
		const query = new InsertQuery<T>(table, entity);
		if (verbose) console.log(query);
		return query.commit();
	},

	/**
	 * Build an `UpdateQuery` and commit immediately
	 * @param table target table name
	 * @param id the primary key of the entry to be modified
	 * @param entity the modified data
	 * @returns An OK packet
	 */
	update<T>(table: string, id: string, entity: Partial<T>): Promise<void> {
		const query = new UpdateQuery<T>(table, id, entity);
		if (verbose) console.log(query);
		return query.commit();
	},

	/**
	 * Build a `DeleteQuery` and commit immediately
	 * @param table target table name
	 * @param id the primary key of the entry to be deleted
	 * @returns An OK packet
	 */
	delete(table: string, id: string): Promise<void> {
		const query = new DeleteQuery(table, id);
		if (verbose) console.log(query);
		return query.commit();
	},

	/**
	 * Switch verbose mode (print the query before commit)
	 * @param v whether the verbose mode is switched on
	 */
	verbose(v = true): void { verbose = v; }
};
