import { v4 as uuid } from 'uuid';
import BaseEntity from './base';
import Book from './Book';
import User from './User';

interface IComment {
	id: string;
	user_id: string;
	book_id: string;
	content: string;
	createdTime: Date;
}

interface UserReference {
	user_id: string;
	user_name: string;
	user_isAdministrator: boolean;
	user_authentication: string;
	user_salt: string;
}

interface BookReference {
	book_id: string;
	book_title: string;
	book_authors: string;
}

export default class Comment extends BaseEntity<typeof Comment> {
	static readonly entityName = 'comment';

	id!: string;
	user!: User;
	book!: Book;
	content!: string;
	createdTime!: Date;

	constructor(user: User, book: Book, content: string, createdTime: Date = new Date()) {
		super();
		this.id = uuid();
		this.user = user;
		this.book = book;
		this.content = content;
		this.createdTime = createdTime;
	}

	static unwrap(wrapped: IComment & UserReference & BookReference): Comment {
		const user = User.unwrap({
			id: wrapped.user_id,
			name: wrapped.user_name,
			isAdministrator: wrapped.user_isAdministrator,
			authentication: wrapped.user_authentication,
			salt: wrapped.user_salt
		});
		const book = Book.unwrap({
			id: wrapped.book_id,
			title: wrapped.book_title,
			authors: wrapped.book_authors
		});
		const comment = new Comment(user, book, wrapped.content, wrapped.createdTime);
		comment.entry = wrapped.id;
		comment.id = wrapped.id;
		return comment;
	}

	wrap(): IComment {
		return {
			id: this.id,
			user_id: this.user.id,
			book_id: this.book.id,
			content: this.content,
			createdTime: this.createdTime
		};
	}
}
