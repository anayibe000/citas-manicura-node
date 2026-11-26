-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: andi_cardenas
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `servicios`
--

LOCK TABLES `servicios` WRITE;
/*!40000 ALTER TABLE `servicios` DISABLE KEYS */;
INSERT INTO `servicios` VALUES (1,'Retiro de semipermanente','Retiro cuidadoso del esmaltado semipermanente mediante un procedimiento especial.','Para retirar el servicio anterior antes de realizar un nuevo servicio.',45,NULL,12000.00,1),(2,'Retiro de Soft Gel','Retiro cuidadoso del sistema Soft Gel, eliminando el producto de manera adecuada.','Para quienes desean retirar el sistema antes de realizar un nuevo servicio o dejar sus uñas naturales.',60,NULL,15000.00,1),(3,'Retiro de Polygel','Retiro cuidadoso del sistema Polygel mediante el procedimiento correspondiente.','Para quienes desean retirar el sistema antes de realizar un nuevo servicio o dejar sus uñas naturales.',60,NULL,15000.00,1),(4,'Retiro de acrílico','Retiro cuidadoso del sistema acrílico mediante el procedimiento correspondiente.','Para quienes desean retirar el sistema antes de realizar un nuevo servicio o realizar un nuevo procedimiento.',80,NULL,18000.00,1),(5,'Manicura convencional','Manicura realizada sobre la uña natural con esmaltado tradicional.','Para quienes buscan un servicio sencillo y un cambio de color sin utilizar sistemas de larga duración.',80,'Depende del cuidado de la clienta',20000.00,0),(6,'Pedicura convencional','Pedicura realizada con esmaltado tradicional.','Para quienes buscan un servicio sencillo para mantener y embellecer las uñas de los pies.',80,'Depende del cuidado de la clienta',20000.00,0),(9,'Semipermanente','Esmaltado realizado sobre la uña natural.','Para quienes desean mantener sus uñas cuidadas por más tiempo.',90,'20 dias',42000.00,0),(10,'Soft Gel','Extensión realizada con uñas de gel sobre la uña natural.','Para personas que desean tener las uñas más largas.',150,'20 dias',65000.00,0),(11,'Builder Gel','Se trabaja sobre el largo de la uña natural, aportando firmeza y grosor.','Para personas que desean mantener el largo de sus uñas naturales.',150,'20 dias',60000.00,0),(12,'Recubrimiento en Polygel','Se trabaja sobre la uña natural, aprovechando un largo aproximado de número 2.','Para personas que ya tienen un largo natural.',150,'20 dias',65000.00,0);
/*!40000 ALTER TABLE `servicios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-26 18:04:00
