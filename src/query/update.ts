import BaseQuery from './base';

export default class UpdateQuery<T> extends BaseQuery<void> {
	constructor(table: string, id: string, entity: Partial<T>) {
		const escapes = Object.keys(entity).map((key) => `\`${key}\`=?`).join(', ');
		const parameters = Object.values(entity).concat([id]);
		super(`UPDATE \`${table}\` SET ${escapes} WHERE \`id\`=?`, parameters);
	}
}
