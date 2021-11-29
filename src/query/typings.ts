export type OrderPair<T> = [keyof T, 'ASC' | 'DESC'];

export interface SelectOptions<T> {
	orders?: OrderPair<T>[];
	offset?: number;
	limit?: number;
}

export type Primary<T> = T extends { id: infer PK } ? PK : unknown;

export type RowData = Record<string, unknown>;

export { OkPacket } from 'mysql';
