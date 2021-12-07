import { OkPacket } from 'mysql';
import BaseQuery from './base';

export default class DeleteQuery extends BaseQuery<OkPacket> {
	constructor(table: string, id: string) {
		super(`DELETE FROM \`${table}\` WHERE \`id\`=?`, [id]);
	}
}
