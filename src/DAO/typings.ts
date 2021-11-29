export interface IEntity {
	id: string;
	wrap(): { id: string };
}

export interface IEntityType {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	new(...args: any): IEntity;
	tableName: string;
	selectQuery: string;
	unwrap(wrapped: { id: string }): IEntity;
}

export type Wrapped<T extends IEntityType> = ReturnType<InstanceType<T>['wrap']>;
