CREATE VIEW `user_view` AS
	SELECT * FROM `users`;

CREATE VIEW `book_view` AS
	SELECT * FROM `books`;

CREATE VIEW `copy_view` AS
	SELECT `copies`.`id` AS `id`,
		`books`.`id` AS `book_id`,
		`books`.`title` AS `book_title`,
		`books`.`authors` AS `book_authors`
	FROM `copies`
		INNER JOIN `books` ON `copies`.`book_id`=`books`.`id`;

CREATE VIEW `transaction_view` AS
	SELECT `transactions`.`id` AS `id`,
		`transactions`.`borrowDate` AS `borrowDate`,
		`transactions`.`returnDate` AS `returnDate`,
		`transactions`.`isFinePaid` AS `isFinePaid`,
		`users`.`id` AS `user_id`,
		`users`.`name` AS `user_name`,
		`users`.`isAdministrator` AS `user_isAdministrator`,
		`users`.`authentication` AS `user_authentication`,
		`users`.`salt` AS `user_salt`,
		`copy_view`.`id` AS `copy_id`,
		`copy_view`.`book_id` AS `copy_book_id`,
		`copy_view`.`book_title` AS `copy_book_title`,
		`copy_view`.`book_authors` AS `copy_book_authors`
	FROM (`transactions`
		INNER JOIN `users` ON `transactions`.`user_id`=`users`.`id`)
		INNER JOIN `copy_view` ON `transactions`.`copy_id`=`copy_view`.`id`;

CREATE VIEW `comment_view` AS
	SELECT `comments`.`id` AS `id`,
		`comments`.`content` AS `content`,
		`comments`.`createdTime` AS `createdTime`,
		`users`.`id` AS `user_id`,
		`users`.`name` AS `user_name`,
		`users`.`isAdministrator` AS `user_isAdministrator`,
		`users`.`authentication` AS `user_authentication`,
		`users`.`salt` AS `user_salt`,
		`books`.`id` AS `book_id`,
		`books`.`title` AS `book_title`,
		`books`.`authors` AS `book_authors`
	FROM (`comments`
		INNER JOIN `users` ON `comments`.`user_id`=`users`.`id`)
		INNER JOIN `books` ON `comments`.`book_id`=`books`.`id`;

CREATE VIEW `notification_view` AS
	SELECT `notifications`.`id` AS `id`,
		`notifications`.`message` AS `message`,
		`notifications`.`sentTime` AS `sentTime`,
		`notifications`.`isRead` AS `isRead`,
		`users`.`id` AS `user_id`,
		`users`.`name` AS `user_name`,
		`users`.`isAdministrator` AS `user_isAdministrator`,
		`users`.`authentication` AS `user_authentication`,
		`users`.`salt` AS `user_salt`
	FROM `notifications`
		INNER JOIN `users` ON `notifications`.`user_id`=`users`.`id`;
