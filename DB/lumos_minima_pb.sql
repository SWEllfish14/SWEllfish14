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

-- Dump dei dati della tabella lumosminima_pb.amministratore: ~6 rows (circa)
INSERT INTO `amministratore` (`nome_utente`, `password`, `tipo`, `comune_afferenza`) VALUES
	('admin1', 'e6bdb6e1a603d2fa854b9e351f358f1c7cd2c48e6ad84a5f3896d4e1355d828f', 'A', NULL),
	('admin2', 'd16202b7561fb8e73ac302f336cc65fa431ec44456ea15d26706807b403bf212', 'S', 'Padova'),
	('admin3', '6b2f8c490437796b294456b67f8143dd447a1435b74f68039efcc6a9a7c4449e', 'A', ''),
	('admin4', '6c2c45e92d719cf8cc0b8c43120645e21592d0e79562e7c15fbb5e3deca9b933', 'A', ''),
	('admin5', 'c3c83ec2605270e1bd76d045f96564c26e31673d63cd5d1103c4af81fc399e09', 'A', ''),
	('admin6', 'b7865d9448d1d7ab06adef7e7ade45cf4e8d1fc5b892eddcd2d901eb1c982751', 'S', 'Mantova');

-- Dump della struttura di tabella lumosminima_pb.area_illuminata
CREATE TABLE IF NOT EXISTS `area_illuminata` (
  `ID` int(10) NOT NULL,
  `città` varchar(128) NOT NULL DEFAULT '',
  `zona_geografica_città` varchar(128) NOT NULL DEFAULT '',
  `modalità_funzionamento` char(1) NOT NULL DEFAULT '',
  `luminosità_standard` int(11) NOT NULL,
  `luminosità_rilevamento` int(11) NOT NULL,
  `luminosità_manuale` int(11) DEFAULT NULL,
  `stato` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dump dei dati della tabella lumosminima_pb.area_illuminata: ~12 rows (circa)
INSERT INTO `area_illuminata` (`ID`, `città`, `zona_geografica_città`, `modalità_funzionamento`, `luminosità_standard`, `luminosità_rilevamento`, `luminosità_manuale`, `stato`) VALUES
	(1, 'Padova', 'Piazzale Stazione', 'A', 4, 10, NULL, 1),
	(2, 'Asiago', 'Piazza Carli', 'A', 6, 7, NULL, 0),
	(3, 'Genova', 'Stazione FS', 'M', 6, 7, 3, 1),
	(4, 'Pizzo Calabro', 'Via Angelis', 'M', 3, 5, 1, 1),
	(5, 'Torino', 'Stadio', 'M', 3, 5, 10, 0),
	(6, 'Firenze', 'Ponte Vecchio', 'A', 1, 3, NULL, 1),
	(7, 'Padova', 'Ospedali', 'A', 1, 3, NULL, 1),
	(8, 'Venezia', 'Campo San Torvaso', 'A', 8, 10, NULL, 1),
	(9, 'Brindisi', 'Via Brombeis', 'M', 3, 7, 10, 1),
	(10, 'Mestre', 'Terraglio', 'A', 6, 9, NULL, 1),
	(11, 'Siracusa', 'Via Nazionale', 'A', 3, 9, NULL, 1),
	(12, 'Roma', 'Altare della Patria', 'M', 1, 6, 8, 0);

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

-- Dump della struttura di tabella lumosminima_pb.gestione_guasto_manutentore
CREATE TABLE IF NOT EXISTS `gestione_guasto_manutentore` (
  `id_guasto` int(10) NOT NULL,
  `username_manutentore` varchar(128) NOT NULL DEFAULT '',
  KEY `FK_gestione_guasto_manutentore_guasto` (`id_guasto`),
  KEY `FK_gestione_guasto_manutentore_manutentore` (`username_manutentore`),
  CONSTRAINT `FK_gestione_guasto_manutentore_guasto` FOREIGN KEY (`id_guasto`) REFERENCES `guasto` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `FK_gestione_guasto_manutentore_manutentore` FOREIGN KEY (`username_manutentore`) REFERENCES `manutentore` (`username`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dump dei dati della tabella lumosminima_pb.gestione_guasto_manutentore: ~0 rows (circa)

-- Dump della struttura di tabella lumosminima_pb.guasto
CREATE TABLE IF NOT EXISTS `guasto` (
  `ID` int(10) NOT NULL,
  `data_rilevamento` date NOT NULL,
  `stato` char(1) DEFAULT NULL,
  `id_area_illuminata` int(11) NOT NULL,
  `data_risoluzione` date DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_guasto_area_illuminata` (`id_area_illuminata`),
  CONSTRAINT `FK_guasto_area_illuminata` FOREIGN KEY (`id_area_illuminata`) REFERENCES `area_illuminata` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dump dei dati della tabella lumosminima_pb.guasto: ~8 rows (circa)
INSERT INTO `guasto` (`ID`, `data_rilevamento`, `stato`, `id_area_illuminata`, `data_risoluzione`) VALUES
	(1, '2023-04-13', NULL, 11, NULL),
	(2, '2023-05-02', NULL, 11, NULL),
	(3, '2023-04-11', NULL, 7, NULL),
	(4, '2023-05-17', NULL, 5, NULL),
	(5, '2023-04-13', NULL, 10, NULL),
	(6, '2023-05-16', NULL, 7, NULL),
	(7, '2023-04-03', NULL, 6, NULL),
	(8, '2023-01-06', NULL, 10, NULL);

-- Dump della struttura di tabella lumosminima_pb.lampione
CREATE TABLE IF NOT EXISTS `lampione` (
  `ID` int(11) NOT NULL,
  `IP` varchar(50) NOT NULL,
  `tipo_interazione` varchar(50) NOT NULL,
  `luminosità_default` int(11) NOT NULL,
  `luminosità_impostata` int(11) NOT NULL,
  `id_area_illuminata` int(10) NOT NULL,
  `stato` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_id_area_illuminata` (`id_area_illuminata`),
  CONSTRAINT `FK_id_area_illuminata` FOREIGN KEY (`id_area_illuminata`) REFERENCES `area_illuminata` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dump dei dati della tabella lumosminima_pb.lampione: ~82 rows (circa)
INSERT INTO `lampione` (`ID`, `IP`, `tipo_interazione`, `luminosità_default`, `luminosità_impostata`, `id_area_illuminata`, `stato`) VALUES
	(102, '76.59.9.77', 'PUSH', 7, 4, 11, 1),
	(103, '245.189.183.100', 'PUSH', 5, 4, 5, 1),
	(104, '145.133.140.236', 'PUSH', 9, 5, 7, 1),
	(115, '59.177.30.101', 'PUSH', 6, 8, 4, 1),
	(122, '26.109.23.239', 'PUSH', 1, 4, 3, 1),
	(125, '17.47.72.112', 'PUSH', 5, 1, 11, 1),
	(133, '215.67.242.248', 'PUSH', 1, 6, 6, 1),
	(139, '74.50.118.234', 'PUSH', 9, 1, 2, 1),
	(147, '131.228.166.2', 'PUSH', 8, 6, 2, 0),
	(148, '46.8.230.6', 'PUSH', 3, 9, 1, 0),
	(158, '75.114.146.81', 'PUSH', 5, 8, 11, 0),
	(160, '232.199.42.205', 'PUSH', 5, 7, 6, 0),
	(173, '123.122.90.243', 'PUSH', 4, 9, 9, 0),
	(177, '71.151.160.106', 'PUSH', 4, 4, 5, 0),
	(182, '114.241.193.37', 'PUSH', 2, 1, 11, 1),
	(185, '198.62.15.219', 'PUSH', 5, 1, 2, 0),
	(188, '201.210.151.222', 'PUSH', 9, 8, 4, 1),
	(198, '110.177.218.121', 'PUSH', 1, 4, 8, 0),
	(206, '209.119.10.4', 'PUSH', 9, 5, 4, 1),
	(207, '243.12.212.66', 'PUSH', 7, 7, 1, 1),
	(209, '41.207.245.215', 'PUSH', 5, 2, 6, 0),
	(221, '76.190.167.32', 'PUSH', 6, 6, 6, 1),
	(225, '125.235.167.155', 'PUSH', 4, 1, 1, 0),
	(240, '176.211.199.129', 'PUSH', 3, 8, 9, 1),
	(243, '27.194.216.2', 'PUSH', 6, 6, 9, 0),
	(300, '170.137.77.67', 'PUSH', 1, 4, 4, 0),
	(303, '148.124.126.66', 'PUSH', 5, 6, 3, 0),
	(315, '173.209.178.83', 'PUSH', 7, 8, 6, 1),
	(318, '82.189.32.13', 'PUSH', 2, 3, 5, 0),
	(324, '12.230.101.60', 'PUSH', 8, 4, 6, 0),
	(391, '215.245.85.154', 'PUSH', 3, 7, 9, 1),
	(397, '68.74.19.250', 'PUSH', 7, 2, 10, 0),
	(399, '170.227.54.237', 'PUSH', 5, 3, 2, 1),
	(401, '125.49.250.227', 'PUSH', 2, 1, 3, 0),
	(428, '195.59.77.218', 'PUSH', 8, 6, 5, 0),
	(435, '17.206.156.172', 'PUSH', 2, 5, 9, 0),
	(438, '163.203.94.169', 'PUSH', 9, 7, 4, 0),
	(439, '84.12.140.5', 'PUSH', 6, 6, 4, 1),
	(442, '109.86.157.108', 'PUSH', 5, 3, 8, 0),
	(454, '24.184.191.125', 'PUSH', 4, 6, 2, 0),
	(462, '73.107.46.82', 'PUSH', 1, 8, 6, 1),
	(477, '113.73.72.47', 'PUSH', 7, 5, 7, 0),
	(497, '248.67.67.150', 'PUSH', 2, 2, 8, 0),
	(502, '197.96.128.1', 'PUSH', 4, 6, 9, 1),
	(524, '23.82.214.123', 'PUSH', 7, 3, 10, 0),
	(549, '76.54.208.162', 'PUSH', 1, 4, 2, 0),
	(570, '11.204.10.27', 'PUSH', 2, 2, 5, 0),
	(597, '231.241.166.108', 'PUSH', 5, 9, 3, 1),
	(625, '42.198.223.39', 'PUSH', 2, 4, 9, 0),
	(626, '137.232.163.83', 'PUSH', 4, 9, 5, 0),
	(627, '241.208.120.235', 'PUSH', 1, 9, 8, 0),
	(634, '55.95.84.204', 'PUSH', 3, 3, 11, 1),
	(644, '166.93.141.183', 'PUSH', 5, 5, 5, 1),
	(662, '113.236.142.104', 'PUSH', 1, 8, 7, 1),
	(674, '89.210.232.118', 'PUSH', 3, 5, 1, 0),
	(677, '160.171.176.26', 'PUSH', 1, 2, 2, 1),
	(684, '155.181.3.246', 'PUSH', 7, 1, 5, 0),
	(697, '156.73.235.2', 'PUSH', 9, 9, 10, 1),
	(713, '203.233.37.58', 'PUSH', 6, 7, 6, 1),
	(738, '148.25.130.151', 'PUSH', 6, 5, 4, 1),
	(741, '222.173.230.7', 'PUSH', 9, 8, 8, 0),
	(776, '154.229.19.116', 'PUSH', 3, 1, 9, 1),
	(778, '109.77.241.78', 'PUSH', 4, 1, 11, 1),
	(790, '2.182.228.190', 'PUSH', 3, 9, 9, 1),
	(801, '240.18.53.156', 'PUSH', 1, 9, 5, 1),
	(820, '133.231.205.39', 'PUSH', 3, 7, 4, 1),
	(825, '204.167.198.23', 'PUSH', 6, 7, 7, 1),
	(830, '152.114.122.208', 'PUSH', 3, 3, 6, 1),
	(837, '122.209.27.91', 'PUSH', 6, 8, 8, 1),
	(847, '48.63.156.92', 'PUSH', 4, 1, 10, 0),
	(855, '92.105.72.231', 'PUSH', 3, 3, 8, 0),
	(860, '153.154.250.92', 'PUSH', 4, 4, 5, 0),
	(873, '9.163.53.154', 'PUSH', 9, 7, 6, 0),
	(886, '201.238.8.219', 'PUSH', 5, 4, 10, 1),
	(894, '191.218.119.203', 'PUSH', 8, 9, 6, 1),
	(904, '156.137.241.177', 'PUSH', 5, 1, 7, 1),
	(913, '206.16.59.53', 'PUSH', 2, 9, 5, 1),
	(914, '210.6.221.175', 'PUSH', 1, 1, 5, 1),
	(923, '137.123.2.237', 'PUSH', 2, 8, 5, 1),
	(927, '243.140.216.131', 'PUSH', 7, 5, 1, 1),
	(943, '203.196.180.24', 'PUSH', 2, 8, 1, 1),
	(992, '207.63.63.226', 'PUSH', 8, 8, 1, 1);

-- Dump della struttura di tabella lumosminima_pb.manutentore
CREATE TABLE IF NOT EXISTS `manutentore` (
  `username` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL DEFAULT '',
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dump dei dati della tabella lumosminima_pb.manutentore: ~8 rows (circa)
INSERT INTO `manutentore` (`username`, `password`) VALUES
	('manutentore1', 'e2f79a7bcc2ef71bf08a8dc382c27d8eff24a74c09bea4134dfc46885236f0af'),
	('manutentore2', '1d9dfaa227ce3b6634bc4140280a04f41df0515349499652c73dde16242d8665'),
	('manutentore3', '442e27ea9a3eb30434cb9f3fd8788114bfb25a9bcdb58f18312e3e6bad8e697e'),
	('manutentore4', '281df7c0f32ba8da6da46e04efaaf6f9b00fef1905127196bd172a259106715e'),
	('manutentore5', 'f32af73a388a45a6b75ef0c3771b40d5db26c6ad3d7487fbd09c823feabcc6d4'),
	('manutentore6', 'd0c56381223a1656459d6393e332ffaedf2fe74c28ad0b7968e35f18572eadf7'),
	('manutentore7', '70d2cbcda0fb6248d602a3fbfc9cdbe8e38f22ac6d6ebbe0cd2adf5981d68bdb'),
	('manutentore8', '59d2caa592b6c50c6958f467aa03a8d44cd4c20c453f9d96b7eb4d506fcd572d');

-- Dump della struttura di tabella lumosminima_pb.sensore
CREATE TABLE IF NOT EXISTS `sensore` (
  `ID` int(11) NOT NULL,
  `IP` varchar(50) NOT NULL,
  `polling_time` int(11) NOT NULL,
  `zona_geografica_posizionamento` varchar(50) NOT NULL,
  `tipo_interazione` varchar(50) NOT NULL,
  `raggio_azione` int(11) NOT NULL,
  `id_area_illuminata` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_id_area` (`id_area_illuminata`),
  CONSTRAINT `FK_id_area` FOREIGN KEY (`id_area_illuminata`) REFERENCES `area_illuminata` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dump dei dati della tabella lumosminima_pb.sensore: ~20 rows (circa)
INSERT INTO `sensore` (`ID`, `IP`, `polling_time`, `zona_geografica_posizionamento`, `tipo_interazione`, `raggio_azione`, `id_area_illuminata`) VALUES
	(4, '200.98.144.217', 7, 'Entrata Stadio', 'PUSH', 33, 5),
	(21, '227.100.88.28', 14, 'Retro Altare', 'PUSH', 40, 11),
	(25, '20.174.98.216', 43, 'Varco ZTL', 'PUSH', 57, 9),
	(43, '158.233.11.83', 32, 'Striscie Pedonali ', 'PUSH', 10, 1),
	(77, '65.92.199.219', 10, 'Entrata galleria', 'PUSH', 59, 5),
	(82, '167.17.34.248', 44, 'Fine Via Siracusa', 'PUSH', 69, 11),
	(95, '111.120.28.51', 41, 'Uscita galleria', 'PUSH', 73, 10),
	(98, '187.133.177.192', 23, 'Parcheggi Auto', 'PUSH', 56, 4),
	(109, '173.245.16.58', 27, 'Ingeresso Pedonale', 'PUSH', 80, 6),
	(110, '211.150.23.221', 21, 'Varco ZTL', 'PUSH', 5, 9),
	(114, '58.224.150.246', 5, 'Ponte', 'PUSH', 76, 6),
	(131, '25.141.73.127', 31, 'Uscita chiesa', 'PUSH', 61, 8),
	(138, '131.35.12.104', 10, 'Angolo sud piazza', 'PUSH', 81, 2),
	(142, '21.46.193.58', 48, 'Piazza', 'PUSH', 13, 2),
	(161, '125.85.182.21', 10, 'Ingresso Stazione', 'PUSH', 50, 3),
	(189, '121.2.66.220', 18, 'Varco Policlinico', 'PUSH', 19, 7),
	(203, '246.13.218.178', 23, 'Parcheggi Taxi', 'PUSH', 26, 1),
	(205, '228.120.101.143', 10, 'Vie di fuga terraglio', 'PUSH', 28, 10),
	(211, '59.47.80.230', 10, 'Usicta FS', 'PUSH', 15, 3),
	(224, '107.249.16.168', 11, 'Biglietteria fs', 'PUSH', 77, 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
