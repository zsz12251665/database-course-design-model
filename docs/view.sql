CREATE VIEW `user_view` AS
	SELECT * FROM `users`;

CREATE VIEW `book_view` AS
	SELECT
			`c`.`book_id` AS `book_id`,
			`b`.`id` AS `id`,
			`b`.`title` AS `title`,
			`b`.`authors` AS `authors`,
			(`cn`.`cnt` - count(`t`.`copy_id`)) AS `available`
	FROM
			(((`db_course_design`.`books` `b`
	JOIN `db_course_design`.`copies` `c` ON
			((`c`.`book_id` = `b`.`id`)))
	JOIN `db_course_design`.`transactions` `t` ON
			((`t`.`copy_id` = `c`.`id`)))
	JOIN (
			SELECT
					`c2`.`book_id` AS `id`,
					count(0) AS `cnt`
			FROM
					`db_course_design`.`copies` `c2`
			GROUP BY
					`c2`.`book_id`) `cn` ON
			((`cn`.`id` = `c`.`book_id`)))
	WHERE
			(`t`.`returnDate` is null)
	GROUP BY
			`c`.`book_id`,
			`b`.`id`,
			`b`.`title`,
			`b`.`authors`,
			`cn`.`cnt`
	UNION
	SELECT
			`b`.`id` AS `id`,
			`b`.`id` AS `id`,
			`b`.`title` AS `title`,
			`b`.`authors` AS `authors`,
			`cn`.`cnt` AS `available`
	FROM
			(`db_course_design`.`books` `b`
	JOIN (
			SELECT
					`c2`.`book_id` AS `id`,
					count(0) AS `cnt`
			FROM
					`db_course_design`.`copies` `c2`
			GROUP BY
					`c2`.`book_id`) `cn` ON
			((`cn`.`id` = `b`.`id`)))
	GROUP BY
			`b`.`id`,
			`b`.`title`,
			`b`.`authors`,
			`cn`.`cnt`
	HAVING
			EXISTS(
			SELECT
					1
			FROM
					(`db_course_design`.`transactions` `t`
			JOIN `db_course_design`.`copies` `c` ON
					((`c`.`id` = `t`.`copy_id`)))
			WHERE
					((`c`.`book_id` = `b`.`id`)
							AND (`t`.`returnDate` is null))) is false

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
