export interface IEntity {
	id: string;
	wrap(): { id: string };
}

export interface IEntityType {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	new(...args: any): IEntity;
	readonly entityName: string;
	unwrap(wrapped: { id: string }): IEntity;
}
