-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versione server:              11.0.2-MariaDB - mariadb.org binary distribution
-- S.O. server:                  Win64
-- HeidiSQL Versione:            12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dump della struttura del database lumosminima
CREATE DATABASE IF NOT EXISTS `lumosminima` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
USE `lumosminima`;

-- Dump della struttura di tabella lumosminima.amministratore
CREATE TABLE IF NOT EXISTS `amministratore` (
  `Username` varchar(32) NOT NULL,
  `PASSWORD` varchar(634) NOT NULL,
  PRIMARY KEY (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dump dei dati della tabella lumosminima.amministratore: ~7 rows (circa)
INSERT INTO `amministratore` (`Username`, `PASSWORD`) VALUES
	('admin', '1234'),
	('andrea', '1234'),
	('claudio', '1234'),
	('davide', '1234'),
	('elena', '1234'),
	('francesco', '1234'),
	('jude', '1234');

-- Dump della struttura di tabella lumosminima.area_illuminata
CREATE TABLE IF NOT EXISTS `area_illuminata` (
  `ID` int(11) NOT NULL,
  `zona_geografica` varchar(128) NOT NULL,
  `stato` char(1) NOT NULL,
  `luminosita_impostata` int(11) NOT NULL,
  `luminosita_default` int(11) NOT NULL,
  `user_amministratore` varchar(32) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_user_amministratore` (`user_amministratore`),
  CONSTRAINT `fk_user_amministratore` FOREIGN KEY (`user_amministratore`) REFERENCES `amministratore` (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dump dei dati della tabella lumosminima.area_illuminata: ~13 rows (circa)
INSERT INTO `area_illuminata` (`ID`, `zona_geografica`, `stato`, `luminosita_impostata`, `luminosita_default`, `user_amministratore`) VALUES
	(1, 'Padova_via Scrovegni', '1', 5, 2, 'admin'),
	(2, 'Mantova', '0', 9, 1, 'andrea'),
	(3, 'Parma', '1', 3, 0, 'jude'),
	(4, 'Viareggio', '0', 5, 9, 'elena'),
	(5, 'Catania', '1', 5, 9, 'claudio'),
	(6, 'Gorizia', '1', 8, 3, 'francesco'),
	(7, 'Cittadella', '0', 10, 1, 'davide'),
	(8, 'Roma', '1', 10, 1, 'davide'),
	(9, 'Napoli', '0', 1, 1, 'davide'),
	(10, 'Verona', '0', 1, 1, 'elena'),
	(11, 'Torino', '1', 1, 1, 'elena'),
	(12, 'Asiago', '1', 1, 10, 'elena'),
	(13, 'Firenze', '0', 1, 10, 'andrea');

-- Dump della struttura di tabella lumosminima.gestione_guasto
CREATE TABLE IF NOT EXISTS `gestione_guasto` (
  `Username_manutentore` varchar(32) NOT NULL DEFAULT '',
  `id_guasto` int(11) NOT NULL,
  PRIMARY KEY (`Username_manutentore`,`id_guasto`),
  KEY `fk_id_guasto` (`id_guasto`),
  CONSTRAINT `fk_id_guasto` FOREIGN KEY (`id_guasto`) REFERENCES `guasto` (`ID`),
  CONSTRAINT `fk_username_manutentore` FOREIGN KEY (`Username_manutentore`) REFERENCES `manutentore` (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dump dei dati della tabella lumosminima.gestione_guasto: ~0 rows (circa)

-- Dump della struttura di tabella lumosminima.guasto
CREATE TABLE IF NOT EXISTS `guasto` (
  `ID` int(11) NOT NULL,
  `zona_geografica` varchar(50) DEFAULT NULL,
  `id_area_illuminata` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_id_area_illuminata_guasto` (`id_area_illuminata`),
  CONSTRAINT `fk_id_area_illuminata_guasto` FOREIGN KEY (`id_area_illuminata`) REFERENCES `area_illuminata` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dump dei dati della tabella lumosminima.guasto: ~6 rows (circa)
INSERT INTO `guasto` (`ID`, `zona_geografica`, `id_area_illuminata`) VALUES
	(1, 'Gorizia', 6),
	(2, 'Padova', 1);

-- Dump della struttura di tabella lumosminima.lampione
CREATE TABLE IF NOT EXISTS `lampione` (
  `IP` varchar(12) NOT NULL,
  `ID` varchar(12) NOT NULL,
  `polling_time` int(11) NOT NULL,
  `status` char(1) NOT NULL DEFAULT '0',
  `iterazione` varchar(50) NOT NULL,
  `luminosita_default` int(11) NOT NULL,
  `luminosita_impostata` int(11) NOT NULL,
  `id_area_illuminata` int(11) NOT NULL,
  KEY `fk_id_area_illuminata_lampioni` (`id_area_illuminata`),
  CONSTRAINT `fk_id_area_illuminata_lampioni` FOREIGN KEY (`id_area_illuminata`) REFERENCES `area_illuminata` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dump dei dati della tabella lumosminima.lampione: ~13 rows (circa)
INSERT INTO `lampione` (`IP`, `ID`, `polling_time`, `status`, `iterazione`, `luminosita_default`, `luminosita_impostata`, `id_area_illuminata`) VALUES
	('2003001255', '123', 3, '1', 'push', 5, 8, 5),
	('192.168.2.25', '124', 3, '1', 'push', 5, 8, 1),
	('2003001250', '125', 3, '1', 'push', 2, 10, 1),
	('2003001230', '126', 3, '1', 'push', 2, 10, 2),
	('2003001229', '127', 3, '1', 'push', 6, 10, 2),
	('2003001228', '128', 3, '1', 'push', 0, 10, 3),
	('2003001238', '129', 3, '1', 'push', 3, 7, 4),
	('2013001238', '130', 3, '1', 'push', 2, 7, 4),
	('2013001221', '131', 3, '1', 'push', 2, 7, 5),
	('2013001233', '132', 3, '1', 'push', 5, 7, 5),
	('2014001233', '133', 3, '1', 'push', 7, 7, 6),
	('2014001288', '134', 3, '1', 'push', 7, 9, 7),
	('2015001288', '135', 3, '1', 'push', 8, 9, 7);

-- Dump della struttura di tabella lumosminima.manutentore
CREATE TABLE IF NOT EXISTS `manutentore` (
  `Username` varchar(32) NOT NULL DEFAULT '',
  `password` varchar(64) NOT NULL DEFAULT '',
  PRIMARY KEY (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dump dei dati della tabella lumosminima.manutentore: ~0 rows (circa)
INSERT INTO `manutentore` (`Username`, `password`) VALUES
	('manutentore', 'abcd');

-- Dump della struttura di tabella lumosminima.sensore
CREATE TABLE IF NOT EXISTS `sensore` (
  `IP` varchar(12) NOT NULL DEFAULT '',
  `zona_geografica` varchar(64) NOT NULL DEFAULT '',
  `iterazione` varchar(50) NOT NULL DEFAULT '',
  `raggio_azione` int(11) NOT NULL,
  `polling_time` int(11) NOT NULL,
  `id_area_illuminata` int(11) NOT NULL,
  PRIMARY KEY (`IP`),
  KEY `fk_id_area_illuminata` (`id_area_illuminata`),
  CONSTRAINT `fk_id_area_illuminata` FOREIGN KEY (`id_area_illuminata`) REFERENCES `area_illuminata` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dump dei dati della tabella lumosminima.sensore: ~8 rows (circa)
INSERT INTO `sensore` (`IP`, `zona_geografica`, `iterazione`, `raggio_azione`, `polling_time`, `id_area_illuminata`) VALUES
	('122288798', 'cittadella mura', 'pull', 25, 3, 7),
	('123188762', 'Parma', 'pull', 25, 3, 3),
	('123188798', 'Viareggio varo Brombeis', 'pull', 25, 3, 4),
	('123198762', 'Mantova', 'pull', 25, 3, 2),
	('192168116', 'Gorizia', 'pull', 10, 3, 6),
	('192168123', 'Padova', 'pull', 10, 3, 1),
	('198188798', 'Catania Parco', 'pull', 25, 3, 5),
	('198288798', 'gorizia', 'pull', 25, 3, 6);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
