INSERT INTO `users` VALUES
	('00000', 'admin', 1, '845aad55a5accac5b842a1aa7b376490bf0a103f41085b617e10b2ae077a2289bb8cd8bb2ea39d45dcdae59750e7ae20c30f39eadd3fc9ae24d6114088ddb4c4', '1b6edce4bdb7b106aff4956b565367a1'),
	('00001', 'user 1', 0, 'bb688cc40a1e2fbd112462d2295b7703a5fe81fc730dc0de52347a949e0ad1f10501df9d5f4b0536b131f03cf5c98fd761f5bc64218c366be6162609f1bbfe10', '88f9676002372a06dd2544ffd3227318'),
	('00002', 'user 2', 0, 'c6b3a3009b91ad32bd0fbb6e2ab27424b2c871c9caec956e2c7a4fa6e130bb2d3df95bf55d6abd4e96246c33bbfc7009c12dbba442c66e67b86995f8f3648d60', '98920293cfe971f6c4e11a0d1a091e63');

INSERT INTO `books` VALUES
	('9780262033848', 'Introduction to Algorithms', 'Thomas H. Cormen'),
	('9781119366447', 'Professional JavaScript for Web Developers', 'Matt Frisbie'),
	('9781260084504', 'Database System Concepts', 'Abraham Silberschatz\nHenry Korth\nS. Sudarshan'),
	('9798749522319', 'Alice in Wonderland', 'Lewis Carroll');

INSERT INTO `copies` VALUES
	('2b332125-f092-4545-97ce-7b2fcf033ad6', '9780262033848'),
	('9ec1f957-7777-4917-973b-c723d6d01c98', '9780262033848'),
	('a7856270-4189-4b4a-9a0a-f2ce0609020e', '9780262033848'),
	('2c801bb1-68e4-4049-920b-a8ed168e2b5e', '9781119366447'),
	('d5c7f17d-324d-4a27-80a8-fca3065c8d78', '9781260084504'),
	('7fb3521e-d08c-4103-9ad8-c04ce5c0d225', '9798749522319');

INSERT INTO `transactions` VALUES
	('7718c7fd-6ebf-4f5b-9832-bfa3f1ab85ce', '00000', '2c801bb1-68e4-4049-920b-a8ed168e2b5e', '2020-01-01', '2020-01-30', NULL),
	('8c31a186-d579-4591-99f2-aa4013dcf794', '00001', '7fb3521e-d08c-4103-9ad8-c04ce5c0d225', '2020-12-26', '2021-12-26', 1),
	('a75bc6f2-9640-4672-9f2b-46fae92a6395', '00001', '9ec1f957-7777-4917-973b-c723d6d01c98', '2020-01-02', '2021-01-03', 0),
	('55c4c3bc-a1bf-48c5-9f03-5212296c51ea', '00000', 'd5c7f17d-324d-4a27-80a8-fca3065c8d78', '2021-10-26', NULL, NULL),
	('c2480837-777b-43bc-ac05-74fdd61d4c0e', '00000', '2b332125-f092-4545-97ce-7b2fcf033ad6', '2021-12-26', NULL, NULL);

INSERT INTO `comments` VALUES
	('7b2b671a-c3f1-49f1-acc7-2cf3192f8e89', '00001', '9798749522319', 'Great book!', '2021-01-01 00:00:00'),
	('0909f33d-afa5-42b3-aa18-88a9102af789', '00000', '9781260084504', 'TOOOOO difficult', '2021-11-20 00:00:00');

INSERT INTO `notifications` VALUES
	('0bdaf6a6-73d3-4b1f-a24f-4da7c6b0d5a0', '00001', 'You have a new message', '2000-01-01 08:00:00', 1),
	('99689f45-3654-4e61-8adc-f6fc9ed786d8', '00001', 'Please return the book', '2021-10-10 10:10:10', 0),
	('b0bab42a-605a-44ad-8271-9c19a84bd407', '00000', 'Test', '2021-11-20 21:11:20', 0),
	('ff0c51f7-1190-42bf-b6aa-c36f15e3eaef', '00000', 'hello,admin', '2021-12-26 00:31:01', 1);
