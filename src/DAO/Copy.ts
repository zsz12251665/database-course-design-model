import { v4 as uuid } from 'uuid';
import BaseEntity from './base';
import Book from './Book';

interface ICopy {
	id: string;
	book_id: string;
}

interface BookReference {
	book_id: string;
	book_title: string;
	book_authors: string;
}

export default class Copy extends BaseEntity<typeof Copy> {
	static readonly entityName = 'copy';

	id!: string;
	book!: Book;

	constructor(book: Book) {
		super();
		this.id = uuid();
		this.book = book;
	}

	static unwrap(wrapped: ICopy & BookReference): Copy {
		const book = Book.unwrap({
			id: wrapped.book_id,
			title: wrapped.book_title,
			authors: wrapped.book_authors
		});
		const copy = new Copy(book);
		copy.entry = wrapped.id;
		copy.id = wrapped.id;
		return copy;
	}

	wrap(): ICopy {
		return {
			id: this.id,
			book_id: this.book.id
		};
	}
}
