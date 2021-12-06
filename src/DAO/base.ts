import { strict as assert } from 'assert';
import pluralize from 'pluralize';
import Query from '../query';
import { SelectOptions } from '../query/select';
import { IEntityType } from './typings';

//? 后面错误处理可以考虑单开一个文件/模块
const INSERT_ERROR_MESSAGE = 'The entry has been inserted into the database!';
const UPDATE_ERROR_MESSAGE = 'The entry is not in the database!';
const DELETE_ERROR_MESSAGE = 'The entry is not in the database!';

type Entity<T extends IEntityType> = BaseEntity<T> & InstanceType<T> & { constructor: T };
type Wrapped<T extends IEntityType> = ReturnType<InstanceType<T>['wrap']>;
type StaticThisType = typeof BaseEntity & IEntityType;

export abstract class BaseEntity<T extends IEntityType> {
	protected entry?: string;

	async insert(this: Entity<T>): Promise<void> {
		assert(this.entry === undefined, INSERT_ERROR_MESSAGE);
		return Query.insert<Wrapped<T>>(pluralize(this.constructor.entityName), this.wrap() as Wrapped<T>)
			.then(() => { this.entry = this.id; });
	}

	async update(this: Entity<T>): Promise<void> {
		assert(this.entry !== undefined, UPDATE_ERROR_MESSAGE);
		return Query.update<Wrapped<T>>(pluralize(this.constructor.entityName), this.entry, this.wrap() as Wrapped<T>)
			.then(() => { this.entry = this.id; });
	}

	async delete(this: Entity<T>): Promise<void> {
		assert(this.entry !== undefined, DELETE_ERROR_MESSAGE);
		return Query.delete(pluralize(this.constructor.entityName), this.entry)
			.then(() => { this.entry = undefined; });
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	static async select<T extends IEntityType>(this: StaticThisType, conditions?: string, parameters?: any[], options?: SelectOptions<Wrapped<T>>): Promise<InstanceType<T>[]> {
		let sqlQuery = `* FROM \`${this.entityName}_view\``;
		if (conditions !== undefined)
			sqlQuery += ` WHERE ${conditions}`;
		return Query.select<Wrapped<T>, Wrapped<T>>(sqlQuery, parameters, options)
			.then((wrapArray) => wrapArray.map((wrapped) => this.unwrap(wrapped) as InstanceType<T>));
	}

	static async update<T extends IEntityType>(this: StaticThisType, id: string, entity: Partial<Wrapped<T>>): Promise<void> {
		return Query.update<Wrapped<T>>(pluralize(this.entityName), id, entity);
	}

	static async delete(this: StaticThisType, id: string): Promise<void> {
		return Query.delete(pluralize(this.entityName), id);
	}
}

export default BaseEntity;
