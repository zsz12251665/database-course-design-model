import { OkPacket } from 'mysql';
import BaseQuery from './base';

/** Add a new entry to the table */
export default class InsertQuery<T> extends BaseQuery<OkPacket> {
	/**
	 * @param table name of the target table
	 * @param entity the new entry to be inserted
	 * @example To add a student named `John` with student number `00001`,
	 * ```ts
	 * new InsertQuery('students', { name: 'John', number: '00001' })
	 * ```
	 */
	constructor(table: string, entity: Partial<T>) {
		const keys = Object.keys(entity).map((key) => `\`${key}\``).join(', ');
		const escapes = Object.keys(entity).map(() => '?').join(', ');
		const parameters = Object.values(entity);
		super(`INSERT INTO \`${table}\` (${keys}) VALUES (${escapes})`, parameters);
	}
}
