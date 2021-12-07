import { OkPacket } from 'mysql';
import BaseQuery from './base';

/** Modify an entry in a table */
export default class UpdateQuery<T> extends BaseQuery<OkPacket> {
	/**
	 * @param table name of the target table
	 * @param id primary key of the entry to be modified
	 * @param entity modified entry
	 * @example To change the price of item `00001` to $10.00,
	 * ```ts
	 * new UpdateQuery('items', '00001', { price: 10.00 })
	 * ```
	 */
	constructor(table: string, id: string, entity: Partial<T>) {
		const escapes = Object.keys(entity)
			.map((key) => `\`${key}\`=?`)
			.join(', ');
		const parameters = Object.values(entity).concat([id]);
		super(`UPDATE \`${table}\` SET ${escapes} WHERE \`id\`=?`, parameters);
	}
}
