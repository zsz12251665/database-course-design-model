import BaseQuery from './base';

type OrderPair<T> = [keyof T, 'ASC' | 'DESC'];

export interface SelectOptions<T> {
	orders?: OrderPair<T>[];
	offset?: number;
	limit?: number;
}


export default class SelectQuery<T, R = Record<string, unknown>> extends BaseQuery<R[]> {
	orderBy(...orders: OrderPair<T>[]): SelectQuery<T, R> {
		if (orders.length > 0)
			this.sqlQuery += ' ORDER BY ' + orders.map((pair) => pair.join(' ')).join(', ');
		return this;
	}

	offset(offset: number): SelectQuery<T, R> {
		this.sqlQuery += ` OFFSET ${offset}`;
		return this;
	}

	limit(limit: number): SelectQuery<T, R> {
		this.sqlQuery += ` LIMIT ${limit}`;
		return this;
	}
}
