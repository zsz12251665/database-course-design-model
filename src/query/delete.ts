import BaseQuery from './base';
import { OkPacket, Primary } from './typings';

export default class DeleteQuery<T> extends BaseQuery<OkPacket> {
	constructor(table: string, id: Primary<T>) {
		super(`DELETE FROM \`${table}\` WHERE \`id\`=?`, [id]);
	}
}
