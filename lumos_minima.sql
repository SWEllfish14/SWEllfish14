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

-- L’esportazione dei dati non era selezionata.

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

-- L’esportazione dei dati non era selezionata.

-- Dump della struttura di tabella lumosminima.gestione_guasto
CREATE TABLE IF NOT EXISTS `gestione_guasto` (
  `Username_manutentore` varchar(32) NOT NULL DEFAULT '',
  `id_guasto` int(11) NOT NULL,
  PRIMARY KEY (`Username_manutentore`,`id_guasto`),
  KEY `fk_id_guasto` (`id_guasto`),
  CONSTRAINT `fk_id_guasto` FOREIGN KEY (`id_guasto`) REFERENCES `guasto` (`ID`),
  CONSTRAINT `fk_username_manutentore` FOREIGN KEY (`Username_manutentore`) REFERENCES `manutentore` (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- L’esportazione dei dati non era selezionata.

-- Dump della struttura di tabella lumosminima.guasto
CREATE TABLE IF NOT EXISTS `guasto` (
  `ID` int(11) NOT NULL,
  `zona_geografica` varchar(50) DEFAULT NULL,
  `id_area_illuminata` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_id_area_illuminata_guasto` (`id_area_illuminata`),
  CONSTRAINT `fk_id_area_illuminata_guasto` FOREIGN KEY (`id_area_illuminata`) REFERENCES `area_illuminata` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- L’esportazione dei dati non era selezionata.

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

-- L’esportazione dei dati non era selezionata.

-- Dump della struttura di tabella lumosminima.manutentore
CREATE TABLE IF NOT EXISTS `manutentore` (
  `Username` varchar(32) NOT NULL DEFAULT '',
  `password` varchar(64) NOT NULL DEFAULT '',
  PRIMARY KEY (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- L’esportazione dei dati non era selezionata.

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

-- L’esportazione dei dati non era selezionata.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
