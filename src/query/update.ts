import BaseQuery from './base';
import { OkPacket, Primary } from './typings';

export default class UpdateQuery<T> extends BaseQuery<OkPacket> {
	constructor(table: string, id: Primary<T>, entity: Partial<T>) {
		const escapes = Object.keys(entity).map((key) => `\`${key}\`=?`).join(', ');
		const parameters = Object.values(entity).concat([id]);
		super(`UPDATE \`${table}\` SET ${escapes} WHERE \`id\`=?`, parameters);
	}
}
