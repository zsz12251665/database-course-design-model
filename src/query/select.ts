import BaseQuery from './base';

type OrderPair<T> = [keyof T, 'ASC' | 'DESC'];

export interface SelectOptions<T> {
	orders?: OrderPair<T>[];
	offset?: number;
	limit?: number;
}

export default class SelectQuery<T> extends BaseQuery<T[]> {
	orderBy(...orders: OrderPair<T>[]): SelectQuery<T> {
		if (orders.length > 0) {
			const orderQuery = orders.map((pair) => pair.join(' ')).join(', ');
			this.sqlQuery += ' ORDER BY ' + orderQuery;
		}
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
