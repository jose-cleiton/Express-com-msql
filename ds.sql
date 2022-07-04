-- Active: 1654864065269@@127.0.0.1@3306
CREATE DATABASE IF NOT EXISTS `db`;
USE `db`;
CREATE TABLE IF NOT EXISTS `person` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `age` int NOT NULL,
  `endereco` varchar(255) NOT NULL, 
  `created_at` DATETIME(3) NOT NULL DEFAULT now(3),
  `updated_at` DATETIME(3)  ON  UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `person` (`name`, `age`, `endereco`) VALUES ('João', '20', 'Rua 1');
INSERT INTO `person` (`name`, `age`, `endereco`) VALUES ('Maria', '20', 'Rua 2');
INSERT INTO `person` (`name`, `age`, `endereco`) VALUES ('José', '20', 'Rua 3');
INSERT INTO `person` (`name`, `age`, `endereco`) VALUES ('Pedro', '20', 'Rua 4');
