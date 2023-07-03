-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versione server:              11.1.0-MariaDB - mariadb.org binary distribution
-- S.O. server:                  Win64
-- HeidiSQL Versione:            12.3.0.6589
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

-- Dump dei dati della tabella lumosminima.area_illuminata: ~7 rows (circa)
INSERT INTO `area_illuminata` (`ID`, `zona_geografica`, `stato`, `luminosita_impostata`, `luminosita_default`, `user_amministratore`) VALUES
	(1, 'Padova_via Scrovegni', '1', 8, 2, 'admin'),
	(2, 'Mantova', '0', 9, 1, 'andrea'),
	(3, 'Parma', '1', 3, 0, 'jude'),
	(4, 'Viareggio', '0', 5, 9, 'elena'),
	(5, 'Catania', '1', 9, 9, 'claudio'),
	(6, 'Gorizia', '1', 8, 3, 'francesco'),
	(7, 'Cittadella', '0', 10, 1, 'davide');

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

-- Dump dei dati della tabella lumosminima.guasto: ~1 rows (circa)
INSERT INTO `guasto` (`ID`, `zona_geografica`, `id_area_illuminata`) VALUES
	(0, 'Viareggio', 4);

-- Dump della struttura di tabella lumosminima.lampione
CREATE TABLE IF NOT EXISTS `lampione` (
  `IP` varchar(12) NOT NULL,
  `polling_time` int(11) NOT NULL,
  `status` varchar(50) NOT NULL,
  `iterazione` varchar(50) NOT NULL,
  `luminosita_default` int(11) NOT NULL,
  `luminosita_impostata` int(11) NOT NULL,
  `id_area_illuminata` int(11) NOT NULL,
  KEY `fk_id_area_illuminata_lampioni` (`id_area_illuminata`),
  CONSTRAINT `fk_id_area_illuminata_lampioni` FOREIGN KEY (`id_area_illuminata`) REFERENCES `area_illuminata` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dump dei dati della tabella lumosminima.lampione: ~1 rows (circa)
INSERT INTO `lampione` (`IP`, `polling_time`, `status`, `iterazione`, `luminosita_default`, `luminosita_impostata`, `id_area_illuminata`) VALUES
	('2003001255', 3, '1', 'push', 5, 8, 5);

-- Dump della struttura di tabella lumosminima.manutentore
CREATE TABLE IF NOT EXISTS `manutentore` (
  `Username` varchar(32) NOT NULL DEFAULT '',
  `password` varchar(64) NOT NULL DEFAULT '',
  PRIMARY KEY (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dump dei dati della tabella lumosminima.manutentore: ~1 rows (circa)
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

-- Dump dei dati della tabella lumosminima.sensore: ~1 rows (circa)
INSERT INTO `sensore` (`IP`, `zona_geografica`, `iterazione`, `raggio_azione`, `polling_time`, `id_area_illuminata`) VALUES
	('192168116', 'boh', 'pull', 10, 3, 6);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
