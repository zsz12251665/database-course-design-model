import { v4 as uuid } from 'uuid';
import BaseEntity from './base';
import Copy from './Copy';
import User from './User';

interface ITransaction {
	id: string;
	user_id: string;
	copy_id: string;
	borrowDate: Date;
	returnDate: Date | null;
	isFinePaid: boolean | null;
}

interface UserReference {
	user_id: string;
	user_name: string;
	user_isAdministrator: boolean;
	user_authentication: string;
	user_salt: string;
}

interface CopyReference {
	copy_id: string;
	copy_book_id: string;
	copy_book_title: string;
	copy_book_authors: string;
}

export default class Transaction extends BaseEntity<typeof Transaction> {
	static readonly entityName = 'transaction';

	static readonly fineRate = 1.0; //? TBC
	static readonly timeLimit = 30 * 86400 * 1000; //? TBC

	id!: string;
	user!: User;
	copy!: Copy;
	borrowDate!: Date;
	returnDate!: Date | null;
	isFinePaid!: boolean | null;

	get dueDate(): Date {
		return new Date(this.borrowDate.getTime() + Transaction.timeLimit);
	}

	get fine(): number {
		if (this.returnDate === null || this.isFinePaid === null)
			return NaN;
		if (this.isFinePaid)
			return 0;
		else
			return Math.max(0, this.returnDate.getTime() - this.dueDate.getTime()) * Transaction.fineRate; //? TBC
	}

	constructor(user: User, copy: Copy, borrowDate: Date = new Date()) {
		super();
		this.id = uuid();
		this.user = user;
		this.copy = copy;
		this.borrowDate = borrowDate;
		this.returnDate = null;
		this.isFinePaid = null;
	}

	static unwrap(wrapped: ITransaction & UserReference & CopyReference): Transaction {
		const user = User.unwrap({
			id: wrapped.user_id,
			name: wrapped.user_name,
			isAdministrator: wrapped.user_isAdministrator,
			authentication: wrapped.user_authentication,
			salt: wrapped.user_salt
		});
		const copy = Copy.unwrap({
			id: wrapped.copy_id,
			book_id: wrapped.copy_book_id,
			book_title: wrapped.copy_book_title,
			book_authors: wrapped.copy_book_authors
		});
		const transaction = new Transaction(user, copy, wrapped.borrowDate);
		transaction.returnDate = wrapped.returnDate;
		transaction.isFinePaid = wrapped.isFinePaid;
		transaction.entry = wrapped.id;
		transaction.id = wrapped.id;
		return transaction;
	}

	wrap(): ITransaction {
		return {
			id: this.id,
			user_id: this.user.id,
			copy_id: this.copy.id,
			borrowDate: this.borrowDate,
			returnDate: this.returnDate,
			isFinePaid: this.isFinePaid
		};
	}
}
