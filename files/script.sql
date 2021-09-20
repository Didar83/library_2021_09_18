create database db_for_nodejs_api;

CREATE TABLE `authors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `surname` varchar(100) NOT NULL,
  `patronymic` varchar(100) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `date_of_death` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COMMENT='авторы (ФИО автора, годы жизни)';

CREATE TABLE `genres` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title_of_genre` varchar(100) NOT NULL,
  `style_of_genre` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COMMENT='жанры книг (название жанра, стиль)';

CREATE TABLE `books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `author_id` int(11) DEFAULT NULL,
  `genre_id` int(11) DEFAULT NULL,
  `title` varchar(100) NOT NULL,
  `pages_quantity` int(11) DEFAULT NULL,
  `date_of_publication` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `books_authors_author_id_FK` (`genre_id`),
  KEY `books_genres_genre_id_FK` (`author_id`),
  CONSTRAINT `books_authors_author_id_FK` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `books_genres_genre_id_FK` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COMMENT='книги (здесь id автора и жанра, название книги, количество страниц, дата написания).';

USE db_for_nodejs_api;

INSERT INTO authors
(name, surname, patronymic, date_of_birth, date_of_death)
VALUES('Ray', 'Bradbury', 'Douglas', '1920-08-22', '2012-06-05'),
('Zona', 'Gale', 'Breese', '1874-08-26', '1938-12-27'),
('Уильям', 'Шуман', 'Говард', '1910-08-4', null),
('Тестовоеимя', 'Тестоваяфамилия', 'Тестовоеотчество', '1955-08-22', '2021-06-05');

INSERT INTO genres (title_of_genre, style_of_genre) VALUES('Literary Fiction', 'Literary fiction novels are considered works with artistic value and literary merit. They often include political criticism, social commentary, and reflections on humanity. Literary fiction novels are typically character-driven, as opposed to being plot-driven, and follow a character inner story'), ('Historical', 'Historical fiction novels take place in the past. Written with a careful balance of research and creativity, they transport readers to another time and place—which can be real, imagined, or a combination of both. Many historical novels tell stories that involve actual historical figures or historical events within historical settings'), ('Thriller', 'Thriller novels are dark, mysterious, and suspenseful plot-driven stories. They very seldom include comedic elements, but what they lack in humor, they make up for in suspense. Thrillers keep readers on their toes and use plot twists, red herrings, and cliffhangers to keep them guessing until the end'), ('others', 'https://www.masterclass.com/articles/what-are-the-different-genres-of-literature-a-guide-to-14-literary-genres#the-14-main-literary-genres');

INSERT INTO books
(author_id, genre_id, title, pages_quantity, date_of_publication)
VALUES(1, 1, 'The Martian Chronicles', 222, '1950-5-4'),
(2, 2, 'The Loves of Pelleas and Etarre', 155, '1907-12-24'),
(3, 3, 'Мощный Кейси', NULL, '1953-3-21'),
(4, 4, 'Test', 1, '2021-09-18');
