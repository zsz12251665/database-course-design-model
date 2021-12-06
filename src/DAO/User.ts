import { strict as assert } from 'assert';
import { randomBytes, createHmac } from 'crypto';
import BaseEntity from './base';

const NO_HASH_ALGORITHM_ERROR_MESSAGE = 'No Hash algorithm is provided!';

const createSalt = () => randomBytes(Number(process.env.SALT_LENGTH));
function createAuthentication(password: string, salt: Buffer): string {
	assert(process.env.HASH_ALGORITHM !== undefined, NO_HASH_ALGORITHM_ERROR_MESSAGE);
	return createHmac(process.env.HASH_ALGORITHM, salt).update(password).digest('hex');
}

interface IUser {
	id: string;
	name: string;
	isAdministrator: boolean;
	authentication: string;
	salt: string;
}

export default class User extends BaseEntity<typeof User> {
	static readonly entityName = 'user';

	id!: string;
	name!: string;
	isAdministrator!: boolean;

	private authentication!: string;
	private salt!: Buffer;

	set password(password: string) {
		this.salt = createSalt();
		this.authentication = createAuthentication(password, this.salt);
	}

	authenticate(password: string): boolean {
		return this.authentication === createAuthentication(password, this.salt);
	}

	constructor(id: string, name: string, password: string) {
		super();
		this.id = id;
		this.name = name;
		this.isAdministrator = false;
		this.password = password;
	}

	static unwrap(wrapped: IUser): User {
		const user = new User(wrapped.id, wrapped.name, '');
		user.entry = wrapped.id;
		user.isAdministrator = wrapped.isAdministrator;
		user.authentication = wrapped.authentication;
		user.salt = Buffer.from(wrapped.salt, 'hex');
		return user;
	}

	wrap(): IUser {
		return {
			id: this.id,
			name: this.name,
			isAdministrator: this.isAdministrator,
			authentication: this.authentication,
			salt: this.salt.toString('hex')
		};
	}

}
