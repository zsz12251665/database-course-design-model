import BaseQuery from './base';
import { OrderPair, RowData } from './typings';

export default class SelectQuery<T> extends BaseQuery<RowData[]> {
	orderBy(...orders: OrderPair<T>[]): SelectQuery<T> {
		this.sqlQuery += ' ORDER BY ' + orders.map((pair) => pair.join(' ')).join(', ');
		return this;
	}

	offset(offset: number): SelectQuery<T> {
		this.sqlQuery += ` OFFSET ${offset}`;
		return this;
	}

	limit(limit: number): SelectQuery<T> {
		this.sqlQuery += ` LIMIT ${limit}`;
		return this;
	}
}
