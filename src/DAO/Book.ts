import BaseEntity from './base';

interface IBook {
	id: string;
	title: string;
	authors: string;
}

export default class Book extends BaseEntity<typeof Book> {
	static readonly entityName = 'book';

	id!: string;
	title!: string;
	authors!: string[];

	get ISBN(): string { return this.id; }
	set ISBN(isbn: string) { this.id = isbn; }

	constructor(isbn: string, title: string, authors: string[]) {
		super();
		this.id = isbn;
		this.title = title;
		this.authors = authors;
	}

	static unwrap(wrapped: IBook): Book {
		const authors = wrapped.authors.split('\n');
		const book = new Book(wrapped.id, wrapped.title, authors);
		book.entry = wrapped.id;
		return book;
	}

	wrap(): IBook {
		return {
			id: this.id,
			title: this.title,
			authors: this.authors.join('\n')
		};
	}
}
