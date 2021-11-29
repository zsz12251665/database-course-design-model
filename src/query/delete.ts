import BaseQuery from './base';

export default class DeleteQuery extends BaseQuery<void> {
	constructor(table: string, id: string) {
		super(`DELETE FROM \`${table}\` WHERE \`id\`=?`, [id]);
	}
}
