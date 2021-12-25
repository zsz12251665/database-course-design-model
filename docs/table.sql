CREATE TABLE `users` (
	`id` VARCHAR(255) NOT NULL PRIMARY KEY,
	`name` VARCHAR(255) NOT NULL,
	`isAdministrator` BOOLEAN NOT NULL DEFAULT 0,
	`authentication` CHAR(128) NOT NULL,
	`salt` CHAR(32) NOT NULL
);

CREATE TABLE `books` (
	`id` VARCHAR(15) NOT NULL PRIMARY KEY COMMENT 'ISBN',
	`title` VARCHAR(255) NOT NULL,
	`authors` TEXT NOT NULL
);
CREATE FULLTEXT INDEX `books_title_authors_fulltext` ON `books`(`title`, `authors`);

CREATE TABLE `copies` (
	`id` CHAR(36) NOT NULL PRIMARY KEY COMMENT 'UUID',
	`book_id` VARCHAR(15) NOT NULL
);
ALTER TABLE `copies`
	ADD FOREIGN KEY (`book_id`) REFERENCES `books`(`id`)
		ON DELETE CASCADE
		ON UPDATE CASCADE;
CREATE INDEX `copies_book_id` ON `copies`(`book_id`);

CREATE TABLE `transactions` (
	`id` CHAR(36) NOT NULL PRIMARY KEY COMMENT 'UUID',
	`user_id` VARCHAR(255) NOT NULL,
	`copy_id` CHAR(36) NOT NULL,
	`borrowTime` DATE NOT NULL,
	`returnTime` DATE DEFAULT NULL,
	`isFinePaid` BOOLEAN DEFAULT NULL
);
ALTER TABLE `transactions`
	ADD FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
		ON DELETE CASCADE
		ON UPDATE CASCADE;
ALTER TABLE `transactions`
	ADD FOREIGN KEY (`copy_id`) REFERENCES `copies`(`id`)
		ON DELETE CASCADE
		ON UPDATE CASCADE;
CREATE INDEX `transactions_user_id` ON `transactions`(`user_id`);
CREATE INDEX `transactions_copy_id` ON `transactions`(`copy_id`);

CREATE TABLE `comments` (
	`id` CHAR(36) NOT NULL PRIMARY KEY COMMENT 'UUID',
	`user_id` VARCHAR(255) NOT NULL,
	`book_id` VARCHAR(15) NOT NULL,
	`content` TEXT NOT NULL,
	`createdTime` TIMESTAMP NOT NULL
);
ALTER TABLE `comments`
	ADD FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
		ON DELETE CASCADE
		ON UPDATE CASCADE;
ALTER TABLE `comments`
	ADD FOREIGN KEY (`book_id`) REFERENCES `books`(`id`)
		ON DELETE CASCADE
		ON UPDATE CASCADE;
CREATE INDEX `comments_user_id` ON `comments`(`user_id`);
CREATE INDEX `comments_book_id` ON `comments`(`book_id`);

CREATE TABLE `notifications` (
	`id` CHAR(36) NOT NULL PRIMARY KEY COMMENT 'UUID',
	`user_id` VARCHAR(255) NOT NULL,
	`message` TEXT NOT NULL,
	`sentTime` TIMESTAMP NOT NULL,
	`isRead` BOOLEAN NOT NULL DEFAULT 0
);
ALTER TABLE `notifications`
	ADD FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
		ON DELETE CASCADE
		ON UPDATE CASCADE;
CREATE INDEX `notifications_user_id` ON `notifications`(`user_id`);
