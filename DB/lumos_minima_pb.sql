-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versione server:              11.0.2-MariaDB - mariadb.org binary distribution
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


-- Dump della struttura del database lumosminima_pb
CREATE DATABASE IF NOT EXISTS `lumosminima_pb` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
USE `lumosminima_pb`;

-- Dump della struttura di tabella lumosminima_pb.amministratore
CREATE TABLE IF NOT EXISTS `amministratore` (
  `nome_utente` varchar(128) NOT NULL DEFAULT '',
  `password` varchar(128) NOT NULL,
  `tipo` char(1) NOT NULL,
  `comune_afferenza` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`nome_utente`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dump dei dati della tabella lumosminima_pb.amministratore: ~0 rows (circa)

-- Dump della struttura di tabella lumosminima_pb.area_illuminata
CREATE TABLE IF NOT EXISTS `area_illuminata` (
  `ID` int(10) NOT NULL,
  `città` varchar(128) NOT NULL DEFAULT '',
  `zona_geografica_città` varchar(128) NOT NULL DEFAULT '',
  `modalità_funzionamento` char(1) NOT NULL DEFAULT '',
  `luminosità_standard` int(11) NOT NULL,
  `luminosità_rilevamento` int(11) NOT NULL,
  `luminosità_manuale` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dump dei dati della tabella lumosminima_pb.area_illuminata: ~0 rows (circa)

-- Dump della struttura di tabella lumosminima_pb.gestione_admin_area
CREATE TABLE IF NOT EXISTS `gestione_admin_area` (
  `username_admin` varchar(128) NOT NULL DEFAULT '',
  `id_area_illuminata` int(10) NOT NULL,
  PRIMARY KEY (`username_admin`,`id_area_illuminata`),
  KEY `FK_gestione_admin_area_area_illuminata` (`id_area_illuminata`),
  CONSTRAINT `FK_gestione_admin_area_amministratore` FOREIGN KEY (`username_admin`) REFERENCES `amministratore` (`nome_utente`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `FK_gestione_admin_area_area_illuminata` FOREIGN KEY (`id_area_illuminata`) REFERENCES `area_illuminata` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dump dei dati della tabella lumosminima_pb.gestione_admin_area: ~0 rows (circa)

-- Dump della struttura di tabella lumosminima_pb.guasto
CREATE TABLE IF NOT EXISTS `guasto` (
  `ID` int(10) NOT NULL,
  `data_rilevamento` date NOT NULL,
  `status` char(1) DEFAULT NULL,
  `username_manutentore` varchar(128) NOT NULL DEFAULT '',
  `id_area_illuminata` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_id_area_illuminata` (`id_area_illuminata`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dump dei dati della tabella lumosminima_pb.guasto: ~0 rows (circa)

-- Dump della struttura di tabella lumosminima_pb.lampione
CREATE TABLE IF NOT EXISTS `lampione` (
  `ID` int(11) NOT NULL,
  `IP` varchar(50) NOT NULL,
  `tipo_interazione` varchar(50) NOT NULL,
  `luminosità_default` int(11) NOT NULL,
  `luminosità_impostata` int(11) NOT NULL,
  `id_area_illuminata` int(10) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_id_area_illuminata` (`id_area_illuminata`),
  CONSTRAINT `FK_id_area_illuminata` FOREIGN KEY (`id_area_illuminata`) REFERENCES `area_illuminata` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dump dei dati della tabella lumosminima_pb.lampione: ~0 rows (circa)

-- Dump della struttura di tabella lumosminima_pb.manutentore
CREATE TABLE IF NOT EXISTS `manutentore` (
  `username` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dump dei dati della tabella lumosminima_pb.manutentore: ~0 rows (circa)

-- Dump della struttura di tabella lumosminima_pb.sensore
CREATE TABLE IF NOT EXISTS `sensore` (
  `ID` int(11) NOT NULL,
  `IP` varchar(50) NOT NULL,
  `polling_time` int(11) NOT NULL,
  `zona_geografica_posizionamento` varchar(50) NOT NULL,
  `tipo_interazione` varchar(50) NOT NULL,
  `raggio_azione` int(11) NOT NULL,
  `id_area_illuminata` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dump dei dati della tabella lumosminima_pb.sensore: ~0 rows (circa)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
