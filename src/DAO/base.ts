import { strict as assert } from 'assert';
import pluralize from 'pluralize';
import { CountQuery, DeleteQuery, InsertQuery, SelectQuery, UpdateQuery } from '../query';
import { IEntityType, SelectOptions } from './typings';

//? 后面错误处理可以考虑单开一个文件/模块
const INSERT_ERROR_MESSAGE = 'The entry has been inserted into the database!';
const UPDATE_ERROR_MESSAGE = 'The entry is not in the database!';
const DELETE_ERROR_MESSAGE = 'The entry is not in the database!';

type Entity<T extends IEntityType> = BaseEntity<T> & InstanceType<T>;
type Wrapped<T extends IEntityType> = ReturnType<InstanceType<T>['wrap']>;
type ViewEntry<T extends IEntityType> = Parameters<T['unwrap']>[0];

export abstract class BaseEntity<T extends IEntityType> {
	protected entry?: string;

	async insert(this: Entity<T>): Promise<void> {
		assert(this.entry === undefined, INSERT_ERROR_MESSAGE);
		const query = new InsertQuery<Wrapped<T>>(pluralize((this.constructor as T).entityName), this.wrap() as Wrapped<T>);
		await query.commit();
		this.entry = this.id;
	}

	async update(this: Entity<T>): Promise<void> {
		assert(this.entry !== undefined, UPDATE_ERROR_MESSAGE);
		const query = new UpdateQuery<Wrapped<T>>(pluralize((this.constructor as T).entityName), this.entry, this.wrap() as Wrapped<T>);
		await query.commit();
		this.entry = this.id;
	}

	async delete(this: Entity<T>): Promise<void> {
		assert(this.entry !== undefined, DELETE_ERROR_MESSAGE);
		const query = new DeleteQuery(pluralize((this.constructor as T).entityName), this.entry);
		await query.commit();
		this.entry = undefined;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	static async select<T extends IEntityType>(this: T, conditions?: string, parameters?: any[], options?: SelectOptions<ViewEntry<T>>): Promise<InstanceType<T>[]> {
		const query = new SelectQuery<ViewEntry<T>>(this.entityName + '_view');
		if (conditions) query.where(conditions, parameters);
		if (options?.orders !== undefined) query.orderBy(...options.orders);
		if (options?.offset !== undefined) query.offset(options.offset);
		if (options?.limit !== undefined) query.limit(options.limit);
		const res = await query.commit();
		return res.map((wrapped) => this.unwrap(wrapped) as InstanceType<T>);
	}

	static async selectById<T extends IEntityType>(this: T, id: string): Promise<InstanceType<T> | null> {
		const query = new SelectQuery<ViewEntry<T>>(this.entityName + '_view')
			.where('id=?', [id])
			.limit(1);
		const res = await query.commit();
		if (res.length > 0)
			return this.unwrap(res[0]) as InstanceType<T>;
		else
			return null;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	static async count<T extends IEntityType>(this: T, conditions?: string, parameters?: any[]): Promise<number> {
		const query = new CountQuery<ViewEntry<T>>(this.entityName + '_view');
		if (conditions) query.where(conditions, parameters);
		const res = await query.commit();
		return res[0].count;
	}

	static async update<T extends IEntityType>(this: T, id: string, entity: Partial<Wrapped<T>>): Promise<void> {
		const query = new UpdateQuery<Wrapped<T>>(pluralize(this.entityName), id, entity);
		await query.commit();
	}

	static async delete<T extends IEntityType>(this: T, id: string): Promise<void> {
		const query = new DeleteQuery(pluralize(this.entityName), id);
		await query.commit();
	}
}

export default BaseEntity;
