import { OkPacket } from 'mysql';
import BaseQuery from './base';

export default class InsertQuery<T> extends BaseQuery<OkPacket> {
	constructor(table: string, entity: Partial<T>) {
		const keys = Object.keys(entity).map((key) => `\`${key}\``).join(', ');
		const escapes = Object.keys(entity).map(() => '?').join(', ');
		const parameters = Object.values(entity);
		super(`INSERT INTO \`${table}\` (${keys}) VALUES (${escapes})`, parameters);
	}
}
