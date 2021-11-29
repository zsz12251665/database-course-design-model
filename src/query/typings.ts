export type OrderPair<T> = [keyof T, 'ASC' | 'DESC'];

export interface SelectOptions<T> {
	orders?: OrderPair<T>[];
	offset?: number;
	limit?: number;
}

//? 为何此处id不直接固定为number或string，这样后面很多接口和函数都不需要加入类型，感觉会更简洁一些？
export type Primary<T> = T extends { id: infer PK } ? NonNullable<PK> : unknown;

export { OkPacket } from 'mysql';
