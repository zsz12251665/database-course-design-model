import { OkPacket } from 'mysql';
import BaseQuery from './base';

/** Remove an entry from the table */
export default class DeleteQuery extends BaseQuery<OkPacket> {
	/**
	 * @param table name of the target table
	 * @param id primary key of the entry to be removed
	 * @example To remove mission with its id as 'M0010',
	 * ```ts
	 * new DeleteQuery('missions', 'M0010')
	 * ```
	 */
	constructor(table: string, id: string) {
		super(`DELETE FROM \`${table}\` WHERE \`id\`=?`, [id]);
	}
}
