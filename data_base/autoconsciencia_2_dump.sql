-- MySQL dump 10.13  Distrib 5.7.33, for Linux (aarch64)
--
-- Host: localhost    Database: db_autoconsciencia
-- ------------------------------------------------------
-- Server version	5.7.33-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accion`
--

DROP TABLE IF EXISTS `accion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accion` (
  `acc_id` int(11) NOT NULL AUTO_INCREMENT,
  `acc_descripcion` varchar(120) DEFAULT NULL,
  `acc_activo` int(11) NOT NULL,
  `mea_id` int(11) NOT NULL,
  `umb_id` int(11) NOT NULL,
  PRIMARY KEY (`acc_id`),
  KEY `accion_umbral_idx` (`umb_id`),
  KEY `accion_modeloanalisis_idx` (`mea_id`),
  CONSTRAINT `accion_modeloanalisis` FOREIGN KEY (`mea_id`) REFERENCES `modeloanalisis` (`mea_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `accion_umbral` FOREIGN KEY (`umb_id`) REFERENCES `umbral` (`umb_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accion`
--

LOCK TABLES `accion` WRITE;
/*!40000 ALTER TABLE `accion` DISABLE KEYS */;
/*!40000 ALTER TABLE `accion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aspectoautoconsciencia`
--

DROP TABLE IF EXISTS `aspectoautoconsciencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aspectoautoconsciencia` (
  `aa_id` int(11) NOT NULL AUTO_INCREMENT,
  `aa_nombre` varchar(100) NOT NULL,
  `aa_descripcion` varchar(1000) DEFAULT NULL,
  `aa_peso` double NOT NULL,
  `aa_tipo` int(11) NOT NULL,
  `aa_activo` int(11) NOT NULL,
  `obj_id` int(11) NOT NULL,
  `suj_id` int(11) NOT NULL,
  `ma_id` int(11) NOT NULL,
  PRIMARY KEY (`aa_id`),
  KEY `aspecto_aspecto_idx` (`ma_id`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aspectoautoconsciencia`
--

LOCK TABLES `aspectoautoconsciencia` WRITE;
/*!40000 ALTER TABLE `aspectoautoconsciencia` DISABLE KEYS */;
INSERT INTO `aspectoautoconsciencia` VALUES (67,'ASPECTO1','ES UN ASPECTO',1,5,1,2,74,30),(68,'ESTADO DE LA BATERIA','DETERMINARA EN QUE ESTADO SE ENCUENTRA LA BATERIA',1,5,1,3,75,31),(69,'ASPECTO1','ASPECTO PRUEBA',1,5,1,4,74,37);
/*!40000 ALTER TABLE `aspectoautoconsciencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aspectoautoconsciencia_metrica`
--

DROP TABLE IF EXISTS `aspectoautoconsciencia_metrica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aspectoautoconsciencia_metrica` (
  `met_id` int(11) NOT NULL,
  `aa_id` int(11) NOT NULL,
  PRIMARY KEY (`met_id`,`aa_id`),
  KEY `aspecto_aspecto_idx` (`aa_id`),
  CONSTRAINT `aspecto_aspecto` FOREIGN KEY (`aa_id`) REFERENCES `aspectoautoconsciencia` (`aa_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `aspecto_metrica` FOREIGN KEY (`met_id`) REFERENCES `metrica` (`met_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aspectoautoconsciencia_metrica`
--

LOCK TABLES `aspectoautoconsciencia_metrica` WRITE;
/*!40000 ALTER TABLE `aspectoautoconsciencia_metrica` DISABLE KEYS */;
INSERT INTO `aspectoautoconsciencia_metrica` VALUES (1,68),(1,69),(2,69),(3,69);
/*!40000 ALTER TABLE `aspectoautoconsciencia_metrica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aspectoautoconsciencia_objeto`
--

DROP TABLE IF EXISTS `aspectoautoconsciencia_objeto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aspectoautoconsciencia_objeto` (
  `aa_id` int(11) NOT NULL,
  `obj_id` int(11) NOT NULL,
  `ma_id` int(11) NOT NULL,
  PRIMARY KEY (`aa_id`,`ma_id`,`obj_id`),
  KEY `aspecto_objeto_idx` (`obj_id`,`ma_id`),
  CONSTRAINT `aspecto_aspceto` FOREIGN KEY (`aa_id`) REFERENCES `aspectoautoconsciencia` (`aa_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `aspecto_objeto` FOREIGN KEY (`obj_id`, `ma_id`) REFERENCES `objeto` (`obj_id`, `ma_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aspectoautoconsciencia_objeto`
--

LOCK TABLES `aspectoautoconsciencia_objeto` WRITE;
/*!40000 ALTER TABLE `aspectoautoconsciencia_objeto` DISABLE KEYS */;
INSERT INTO `aspectoautoconsciencia_objeto` VALUES (69,6,37),(69,25,37),(69,36,37),(69,47,37),(69,55,37);
/*!40000 ALTER TABLE `aspectoautoconsciencia_objeto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `criteriodecision`
--

DROP TABLE IF EXISTS `criteriodecision`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `criteriodecision` (
  `cd_id` int(11) NOT NULL AUTO_INCREMENT,
  `cd_nombre` varchar(100) NOT NULL,
  `cd_descripcion` varchar(1000) DEFAULT NULL,
  `cd_activo` int(11) NOT NULL,
  PRIMARY KEY (`cd_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `criteriodecision`
--

LOCK TABLES `criteriodecision` WRITE;
/*!40000 ALTER TABLE `criteriodecision` DISABLE KEYS */;
INSERT INTO `criteriodecision` VALUES (11,'CRITERIO1','ES UN CRITERIO',1),(12,'PORCENTAJE DE BATERIA','CUANDO LA BATERIA SE ENCUENTRE EN UN PORCENTAJE BAJO',1);
/*!40000 ALTER TABLE `criteriodecision` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enumeracion`
--

DROP TABLE IF EXISTS `enumeracion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `enumeracion` (
  `enu_id` int(11) NOT NULL AUTO_INCREMENT,
  `enu_nombre_enumeracion` varchar(45) NOT NULL,
  `enu_nombre_valor` varchar(45) NOT NULL,
  `enu_valor` int(11) DEFAULT NULL,
  PRIMARY KEY (`enu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enumeracion`
--

LOCK TABLES `enumeracion` WRITE;
/*!40000 ALTER TABLE `enumeracion` DISABLE KEYS */;
INSERT INTO `enumeracion` VALUES (1,'TIPO_DATO_SALIDA','BYTE',1),(2,'TIPO_DATO_SALIDA','INTEGER',2),(3,'TIPO_FORMATO','JSON',1),(4,'TIPO_FORMATO','XMI',2),(5,'TIPO_ASPECTO','ESTADO_ACTUAL',1),(6,'TIPO_ASPECTO','PREDICCION',2),(8,'TIPO_COMUNICACION','SÍNCRONA',1),(9,'TIPO_COMUNICACION','ASÍNCRONA',2),(10,'TIPO_METRICA','DIRECTA',1),(11,'TIPO_METRICA','INDIRECTA',2),(12,'TIPO_METRICA','INDICADOR',3),(15,'TIPO_OPERADOR_ASIGNACION','C',1),(16,'TIPO_OPERADOR_ASIGNACION','C++',2),(17,'TIPO_PROCESO','PRE-REFLEXIVO',1),(18,'TIPO_PROCESO','REFLEXIVO',2),(19,'TIPO_RECOLECCION','UNICAMENTE OBJETO SELECCIONADO',1),(20,'TIPO_RECOLECCION','TODOS LOS OBJETOS DE LA MISMA CATEGORIA',2),(21,'TIPO_METODO','METODO DE RECOLECCION DE DATOS',1),(22,'TIPO_METODO','MODELO ANALISIS',2),(23,'TIPO_METODO','METODO CALCULO',3),(24,'TIPO_METRICA_METODO','VARIABLE SIMULACION',4),(25,'TIPO_METRICA_METODO','METADATA',5),(26,'TIPO_ESCALA','ORDINAL',1),(27,'TIPO_ESCALA','NOMINAL',2),(28,'TIPO_ESCALA','INTERVALO',3),(29,'TIPO_PERSPECTIVA','POSITIVA',1),(30,'TIPO_PERSPECTIVA','NEGATIVA',2),(31,'TIPO_OPERADOR_ASIGNACION','C+',1),(32,'TIPO_OPERADOR_ASIGNACION','C+-',1),(33,'TIPO_OPERADOR_ASIGNACION','CA',2),(34,'TIPO_OPERADOR_ASIGNACION','C-+',3),(35,'TIPO_OPERADOR_ASIGNACION','C-',4),(36,'TIPO_OPERADOR_ASIGNACION','C--',5),(37,'TIPO_OPERADOR_ASIGNACION','A',6),(38,'TIPO_OPERADOR_ASIGNACION','D--',7),(39,'TIPO_OPERADOR_ASIGNACION','D-',8),(40,'TIPO_OPERADOR_ASIGNACION','D-+',9),(41,'TIPO_OPERADOR_ASIGNACION','DA',10),(42,'TIPO_OPERADOR_ASIGNACION','D+-',11),(43,'TIPO_OPERADOR_ASIGNACION','D+',12),(44,'TIPO_OPERADOR_ASIGNACION','D++',13),(45,'TIPO_OPERADOR_ASIGNACION','D',14),(46,'TIPO_ESCALA','RATIO',1),(47,'TIPO_DATO_SALIDA','FLOAT',1),(48,'TIPO_VACIO','NULL',NULL);
/*!40000 ALTER TABLE `enumeracion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `escala`
--

DROP TABLE IF EXISTS `escala`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `escala` (
  `esc_id` int(11) NOT NULL AUTO_INCREMENT,
  `esc_nombre` varchar(100) NOT NULL,
  `esc_valores_validos` varchar(1000) NOT NULL,
  `esc_tipo` int(11) NOT NULL,
  `esc_activo` int(11) NOT NULL,
  PRIMARY KEY (`esc_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `escala`
--

LOCK TABLES `escala` WRITE;
/*!40000 ALTER TABLE `escala` DISABLE KEYS */;
INSERT INTO `escala` VALUES (1,'PORCENTAJE','12',26,1);
/*!40000 ALTER TABLE `escala` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `escenariosimulacion`
--

DROP TABLE IF EXISTS `escenariosimulacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `escenariosimulacion` (
  `es_id` int(11) NOT NULL AUTO_INCREMENT,
  `es_nombre` varchar(100) NOT NULL,
  `es_descripcion` varchar(1000) NOT NULL,
  `es_activo` int(11) NOT NULL,
  `mea_id` int(11) NOT NULL,
  PRIMARY KEY (`es_id`),
  KEY `escenario_metodocalculo_idx` (`mea_id`),
  CONSTRAINT `escenario_metodocalculo` FOREIGN KEY (`mea_id`) REFERENCES `metodocalculo` (`mea_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `escenariosimulacion`
--

LOCK TABLES `escenariosimulacion` WRITE;
/*!40000 ALTER TABLE `escenariosimulacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `escenariosimulacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flujodatos`
--

DROP TABLE IF EXISTS `flujodatos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `flujodatos` (
  `flu_id` int(11) NOT NULL AUTO_INCREMENT,
  `ma_id` int(11) NOT NULL,
  `flu_descripcion` varchar(1000) NOT NULL,
  `flu_tipo_comunicacion` varchar(45) NOT NULL,
  PRIMARY KEY (`flu_id`,`ma_id`),
  KEY `flujo_modelo_idx` (`ma_id`),
  CONSTRAINT `flujo_modelo` FOREIGN KEY (`ma_id`) REFERENCES `modeloautoconsciencia` (`ma_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flujodatos`
--

LOCK TABLES `flujodatos` WRITE;
/*!40000 ALTER TABLE `flujodatos` DISABLE KEYS */;
INSERT INTO `flujodatos` VALUES (74,37,'Flujo de recolección de temperatura de la sala (livingroom)','Synchronous'),(78,37,'Flujo de recolección de temperatura del dormitorio (bedroom)','Synchronous'),(82,37,'Flujo de recolección de Co - humo en la cocina (kitchen)','Synchronous'),(86,37,'Flujo de recolección de frecuencia cardiaca del paciente','undefined'),(89,37,'Flujo de agregación que obtiene el promedio diario de la frecuencia cardiaca de un paciente','undefined'),(92,37,'Flujo de datos de la localización del usuario.','Synchronous');
/*!40000 ALTER TABLE `flujodatos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `formula`
--

DROP TABLE IF EXISTS `formula`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `formula` (
  `ri_id` int(11) NOT NULL,
  `for_expresion` varchar(1000) NOT NULL,
  PRIMARY KEY (`ri_id`),
  CONSTRAINT `formula_recurso` FOREIGN KEY (`ri_id`) REFERENCES `recursoimplementacion` (`ri_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formula`
--

LOCK TABLES `formula` WRITE;
/*!40000 ALTER TABLE `formula` DISABLE KEYS */;
INSERT INTO `formula` VALUES (3,'[aaa]');
/*!40000 ALTER TABLE `formula` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `funcion`
--

DROP TABLE IF EXISTS `funcion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `funcion` (
  `ri_id` int(11) NOT NULL,
  `fun_path` varchar(100) NOT NULL,
  `fun_instrucciones` varchar(1000) NOT NULL,
  `fun_pre_existente` int(11) NOT NULL,
  PRIMARY KEY (`ri_id`),
  CONSTRAINT `funcion_recurso` FOREIGN KEY (`ri_id`) REFERENCES `recursoimplementacion` (`ri_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcion`
--

LOCK TABLES `funcion` WRITE;
/*!40000 ALTER TABLE `funcion` DISABLE KEYS */;
/*!40000 ALTER TABLE `funcion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mapeoparametros`
--

DROP TABLE IF EXISTS `mapeoparametros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mapeoparametros` (
  `par_ordinal` int(11) NOT NULL,
  `mea_id` int(11) NOT NULL,
  `mp_tipo_entrada` int(11) NOT NULL,
  `met_id` int(11) DEFAULT NULL,
  `vs_id` int(11) DEFAULT NULL,
  `md_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`par_ordinal`,`mea_id`),
  UNIQUE KEY `md_id_UNIQUE` (`md_id`),
  KEY `mapeo_metodo_idx` (`mea_id`),
  KEY `mapeo_metrica_idx` (`met_id`),
  KEY `mapeo_variable_idx` (`vs_id`),
  CONSTRAINT `mapeo_metodo` FOREIGN KEY (`mea_id`) REFERENCES `metodoaprendizajerazonamiento` (`mea_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mapeo_metrica` FOREIGN KEY (`met_id`) REFERENCES `metrica` (`met_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mapeo_parametros` FOREIGN KEY (`par_ordinal`) REFERENCES `parametro` (`par_ordinal`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mapeo_variable` FOREIGN KEY (`vs_id`) REFERENCES `variablesimulacion` (`vs_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mapeoparametros`
--

LOCK TABLES `mapeoparametros` WRITE;
/*!40000 ALTER TABLE `mapeoparametros` DISABLE KEYS */;
/*!40000 ALTER TABLE `mapeoparametros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `metodoaprendizajerazonamiento`
--

DROP TABLE IF EXISTS `metodoaprendizajerazonamiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `metodoaprendizajerazonamiento` (
  `mea_id` int(11) NOT NULL AUTO_INCREMENT,
  `mea_tipo` int(11) NOT NULL,
  `pa_id` int(11) NOT NULL,
  `met_id` int(11) NOT NULL,
  PRIMARY KEY (`mea_id`),
  KEY `metodoaprendizaje_proceso_idx` (`pa_id`),
  KEY `metodoaprendizaje_metrica_idx` (`met_id`),
  CONSTRAINT `metodoaprendizaje_metrica` FOREIGN KEY (`met_id`) REFERENCES `metrica` (`met_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `metodoaprendizaje_proceso` FOREIGN KEY (`pa_id`) REFERENCES `procesoautoconsciencia` (`pa_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metodoaprendizajerazonamiento`
--

LOCK TABLES `metodoaprendizajerazonamiento` WRITE;
/*!40000 ALTER TABLE `metodoaprendizajerazonamiento` DISABLE KEYS */;
/*!40000 ALTER TABLE `metodoaprendizajerazonamiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `metodocalculo`
--

DROP TABLE IF EXISTS `metodocalculo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `metodocalculo` (
  `mea_id` int(11) NOT NULL,
  `mc_tipo_recurso` int(11) NOT NULL,
  `mc_inicio_periodo_calculo` date DEFAULT NULL,
  `mc_fin_periodo_calculo` date DEFAULT NULL,
  PRIMARY KEY (`mea_id`),
  CONSTRAINT `metodocalculo_metodoaprendizaje` FOREIGN KEY (`mea_id`) REFERENCES `metodoaprendizajerazonamiento` (`mea_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metodocalculo`
--

LOCK TABLES `metodocalculo` WRITE;
/*!40000 ALTER TABLE `metodocalculo` DISABLE KEYS */;
/*!40000 ALTER TABLE `metodocalculo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `metodorecoleccion`
--

DROP TABLE IF EXISTS `metodorecoleccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `metodorecoleccion` (
  `mea_id` int(11) NOT NULL,
  `mr_tipo_comunicacion` int(11) NOT NULL,
  `pro_id` int(11) NOT NULL,
  `flu_id` int(11) NOT NULL,
  `ma_id` int(11) NOT NULL,
  `obj_id` int(11) NOT NULL,
  PRIMARY KEY (`mea_id`),
  KEY `metodo_propiedad_idx` (`pro_id`,`ma_id`,`obj_id`),
  KEY `metodo_flujo_idx` (`flu_id`,`ma_id`),
  CONSTRAINT `metodo_flujo` FOREIGN KEY (`flu_id`, `ma_id`) REFERENCES `flujodatos` (`flu_id`, `ma_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `metodo_metodoaprendizaje` FOREIGN KEY (`mea_id`) REFERENCES `metodoaprendizajerazonamiento` (`mea_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `metodo_propiedad` FOREIGN KEY (`pro_id`, `ma_id`, `obj_id`) REFERENCES `propiedad` (`pro_id`, `ma_id`, `obj_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metodorecoleccion`
--

LOCK TABLES `metodorecoleccion` WRITE;
/*!40000 ALTER TABLE `metodorecoleccion` DISABLE KEYS */;
/*!40000 ALTER TABLE `metodorecoleccion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `metrica`
--

DROP TABLE IF EXISTS `metrica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `metrica` (
  `met_id` int(11) NOT NULL AUTO_INCREMENT,
  `met_nombre` varchar(100) NOT NULL,
  `met_descripcion` varchar(1000) DEFAULT NULL,
  `met_abreviacion` varchar(100) NOT NULL,
  `met_tipo` int(11) DEFAULT NULL,
  `met_activo` int(11) DEFAULT NULL,
  `met_perspectivaindicador` int(11) DEFAULT NULL,
  `esc_id` int(11) NOT NULL,
  `um_id` int(11) NOT NULL,
  PRIMARY KEY (`met_id`),
  KEY `metrica_escala_idx` (`esc_id`),
  KEY `metrica_unidad_idx` (`um_id`),
  CONSTRAINT `metrica_escala` FOREIGN KEY (`esc_id`) REFERENCES `escala` (`esc_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `metrica_unidad` FOREIGN KEY (`um_id`) REFERENCES `unidadmedicion` (`um_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COMMENT='	';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metrica`
--

LOCK TABLES `metrica` WRITE;
/*!40000 ALTER TABLE `metrica` DISABLE KEYS */;
INSERT INTO `metrica` VALUES (1,'NIVEL DE BATERIA','VERIFICARA EL NIVEL DE BATERIA','NB',10,1,48,1,1),(2,'METRICA2','ES UNA METRICA','MM',11,1,48,1,1),(3,'FDSF','ASDa','AA',12,1,29,1,1);
/*!40000 ALTER TABLE `metrica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modeloanalisis`
--

DROP TABLE IF EXISTS `modeloanalisis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `modeloanalisis` (
  `mea_id` int(11) NOT NULL,
  `ma_tipo_recurso` int(11) NOT NULL,
  `cd_id` int(11) NOT NULL,
  PRIMARY KEY (`mea_id`),
  KEY `modelo_criterio_idx` (`cd_id`),
  CONSTRAINT `metodoaprendizaje_modeloanalisis` FOREIGN KEY (`mea_id`) REFERENCES `metodoaprendizajerazonamiento` (`mea_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `modelo_criterio` FOREIGN KEY (`cd_id`) REFERENCES `criteriodecision` (`cd_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='	';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modeloanalisis`
--

LOCK TABLES `modeloanalisis` WRITE;
/*!40000 ALTER TABLE `modeloanalisis` DISABLE KEYS */;
/*!40000 ALTER TABLE `modeloanalisis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modeloautoconsciencia`
--

DROP TABLE IF EXISTS `modeloautoconsciencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `modeloautoconsciencia` (
  `ma_id` int(11) NOT NULL AUTO_INCREMENT,
  `ma_nombre` varchar(100) NOT NULL,
  `ma_descripcion` varchar(1000) NOT NULL,
  `ma_autor` varchar(100) NOT NULL,
  `ma_activo` int(11) NOT NULL DEFAULT '1',
  `ma_modelo_arquitectura` longblob NOT NULL,
  `usr_id` int(11) NOT NULL,
  PRIMARY KEY (`ma_id`),
  KEY `modelo_autoconsciencia_usuario_idx` (`usr_id`),
  CONSTRAINT `modelo_autoconsciencia_usuario` FOREIGN KEY (`usr_id`) REFERENCES `usuario` (`usr_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modeloautoconsciencia`
--

LOCK TABLES `modeloautoconsciencia` WRITE;
/*!40000 ALTER TABLE `modeloautoconsciencia` DISABLE KEYS */;
INSERT INTO `modeloautoconsciencia` VALUES (37,'MODELO1','MODELO','JAIME',1,_binary '{\n  \"MonitorIoT:MonitoringArchitectureModel\": {\n    \"$\": {\n      \"xmi:version\": \"2.0\",\n      \"xmlns:xmi\": \"http://www.omg.org/XMI\",\n      \"xmlns:xsi\": \"http://www.w3.org/2001/XMLSchema-instance\",\n      \"xmlns:MonitorIoT\": \"http://www.uazuay.edu.ec/MonitorIoT\",\n      \"xsi:schemaLocation\": \"http://www.uazuay.edu.ec/MonitorIoT platform:/resource/org.eclipse.tesismetamodelo/model/tesismetamodelo.ecore\",\n      \"name\": \"EmergencySystemArchModel\",\n      \"description\": \"Monitoring architecture for an emergency management system\"\n    },\n    \"containsEntity\": [\n      {\n        \"$\": {\n          \"xsi:type\": \"MonitorIoT:CloudNode\",\n          \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0 //@containsIoTSystem.0/@containsIoTSubSystem.1\",\n          \"id\": \"1\",\n          \"name\": \"GoogleCloudPlatform\",\n          \"Platform\": \"GoogleCloudPlatform\"\n        },\n        \"containsResource\": [\n          {\n            \"$\": {\n              \"xsi:type\": \"MonitorIoT:DataBase\",\n              \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0 //@containsIoTSystem.0/@containsIoTSubSystem.1\",\n              \"id\": \"2\",\n              \"name\": \"GlobalPostgreSQLServer\",\n              \"usesProtocol\": \"//@containsProtocol.2\"\n            },\n            \"containsDataTable\": [\n              {\n                \"$\": {\n                  \"name\": \"HeartRateSummary\",\n                  \"persistenceType\": \"Permanent\",\n                  \"hasLinkServiceToDatable\": \"//@containsLink.15\"\n                },\n                \"composedOfDataColumn\": [\n                  {\n                    \"$\": {\n                      \"name\": \"DialyHeartRate\",\n                      \"hasRuleAsDestination\": \"//@containsDataFlow.4/@containsDataMappingRule.0\"\n                    }\n                  },\n                  {\n                    \"$\": {\n                      \"name\": \"UserId\",\n                      \"dataColumnType\": \"MetaData\",\n                      \"dataType\": \"String\"\n                    }\n                  },\n                  {\n                    \"$\": {\n                      \"name\": \"Date\",\n                      \"dataColumnType\": \"MetaData\",\n                      \"dataType\": \"Date\",\n                      \"formulaExpression\": \"sysdate\"\n                    }\n                  }\n                ]\n              }\n            ]\n          },\n          {\n            \"$\": {\n              \"xsi:type\": \"MonitorIoT:Middleware\",\n              \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0 //@containsIoTSystem.0/@containsIoTSubSystem.1\",\n              \"id\": \"3\",\n              \"name\": \"GlobalExpressServer\",\n              \"usesProtocol\": \"//@containsProtocol.0\"\n            },\n            \"containsService\": [\n              {\n                \"$\": {\n                  \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.1\",\n                  \"id\": \"4\",\n                  \"name\": \"AnalyticalHeartRate\"\n                }\n              }\n            ]\n          },\n          {\n            \"$\": {\n              \"xsi:type\": \"MonitorIoT:NetworkInterface\",\n              \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0 //@containsIoTSystem.0/@containsIoTSubSystem.1\",\n              \"id\": \"5\",\n              \"name\": \"OpticalFiberConnection\",\n              \"connects\": \"//@containsEntity.2 //@containsEntity.4\",\n              \"communicationTechnology\": \"OpticalFiber\"\n            }\n          }\n        ]\n      },\n      {\n        \"$\": {\n          \"xsi:type\": \"MonitorIoT:PhysicalEntity\",\n          \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.1 //@containsIoTSystem.0/@containsIoTSubSystem.0\",\n          \"id\": \"6\",\n          \"name\": \"House\"\n        },\n        \"containsComputingNode\": [\n          {\n            \"$\": {\n              \"xsi:type\": \"MonitorIoT:FogNode\",\n              \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0 //@containsIoTSystem.0/@containsIoTSubSystem.1\",\n              \"id\": \"7\",\n              \"name\": \"LocalAdministrationServer\",\n              \"descrption\": \"Servidor Local\",\n              \"deploymentModel\": \"Private\"\n            },\n            \"containsResource\": [\n              {\n                \"$\": {\n                  \"xsi:type\": \"MonitorIoT:DataBase\",\n                  \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0 //@containsIoTSystem.0/@containsIoTSubSystem.1\",\n                  \"id\": \"8\",\n                  \"name\": \"LocalPostgreSQLServer\",\n                  \"usesProtocol\": \"//@containsProtocol.2\"\n                },\n                \"containsDataTable\": [\n                  {\n                    \"$\": {\n                      \"name\": \"EnvironmentTemperature&Humidity\",\n                      \"persistenceType\": \"Permanent\",\n                      \"hasLinkServiceToDatable\": \"//@containsLink.3\"\n                    },\n                    \"composedOfDataColumn\": [\n                      {\n                        \"$\": {\n                          \"name\": \"Temperature\",\n                          \"hasRulePropertyToDataColumn\": \"//@containsDataFlow.0/@containsDataMappingRule.0 //@containsDataFlow.1/@containsDataMappingRule.0\",\n                          \"dataType\": \"Float\"\n                        }\n                      },\n                      {\n                        \"$\": {\n                          \"name\": \"Humidity\",\n                          \"hasRulePropertyToDataColumn\": \"//@containsDataFlow.0/@containsDataMappingRule.1 //@containsDataFlow.1/@containsDataMappingRule.1\",\n                          \"dataType\": \"Float\"\n                        }\n                      },\n                      {\n                        \"$\": {\n                          \"name\": \"SensorId\",\n                          \"hasRulePropertyToDataColumn\": \"//@containsDataFlow.0/@containsDataMappingRule.2\",\n                          \"dataColumnType\": \"MetaData\",\n                          \"dataType\": \"String\"\n                        }\n                      },\n                      {\n                        \"$\": {\n                          \"name\": \"TimeStamp\",\n                          \"dataColumnType\": \"MetaData\",\n                          \"dataType\": \"Date\",\n                          \"formulaExpression\": \"sysdate\"\n                        }\n                      }\n                    ]\n                  },\n                  {\n                    \"$\": {\n                      \"name\": \"EnvironmentCo&Smoke\",\n                      \"persistenceType\": \"Permanent\",\n                      \"hasLinkServiceToDatable\": \"//@containsLink.8\"\n                    },\n                    \"composedOfDataColumn\": [\n                      {\n                        \"$\": {\n                          \"name\": \"Co\",\n                          \"hasRulePropertyToDataColumn\": \"//@containsDataFlow.2/@containsDataMappingRule.0\",\n                          \"dataType\": \"Float\"\n                        }\n                      },\n                      {\n                        \"$\": {\n                          \"name\": \"Smoke\",\n                          \"hasRulePropertyToDataColumn\": \"//@containsDataFlow.2/@containsDataMappingRule.1\",\n                          \"dataType\": \"Float\"\n                        }\n                      },\n                      {\n                        \"$\": {\n                          \"name\": \"SensorId\",\n                          \"hasRulePropertyToDataColumn\": \"//@containsDataFlow.1/@containsDataMappingRule.2 //@containsDataFlow.2/@containsDataMappingRule.2\",\n                          \"dataColumnType\": \"MetaData\",\n                          \"dataType\": \"String\"\n                        }\n                      },\n                      {\n                        \"$\": {\n                          \"name\": \"TimeStamp\",\n                          \"dataColumnType\": \"MetaData\",\n                          \"dataType\": \"Date\",\n                          \"formulaExpression\": \"sysdate\"\n                        }\n                      }\n                    ]\n                  },\n                  {\n                    \"$\": {\n                      \"name\": \"Location\",\n                      \"persistenceType\": \"Permanent\",\n                      \"hasLinkServiceToDatable\": \"//@containsLink.21\"\n                    },\n                    \"composedOfDataColumn\": [\n                      {\n                        \"$\": {\n                          \"name\": \"LocationId\",\n                          \"hasRulePropertyToDataColumn\": \"//@containsDataFlow.5/@containsDataMappingRule.0\"\n                        }\n                      },\n                      {\n                        \"$\": {\n                          \"name\": \"UserId\",\n                          \"hasRulePropertyToDataColumn\": \"//@containsDataFlow.3/@containsDataMappingRule.1\",\n                          \"dataColumnType\": \"MetaData\",\n                          \"dataType\": \"String\"\n                        }\n                      },\n                      {\n                        \"$\": {\n                          \"name\": \"TimeStamp\",\n                          \"dataColumnType\": \"MetaData\",\n                          \"dataType\": \"Date\",\n                          \"formulaExpression\": \"sysdate\"\n                        }\n                      }\n                    ]\n                  },\n                  {\n                    \"$\": {\n                      \"name\": \"HeartRate\",\n                      \"persistenceType\": \"Permanent\",\n                      \"hasLinkServiceToDatable\": \"//@containsLink.13 //@containsLink.14\"\n                    },\n                    \"composedOfDataColumn\": [\n                      {\n                        \"$\": {\n                          \"name\": \"HeartRate\",\n                          \"hasRulePropertyToDataColumn\": \"//@containsDataFlow.3/@containsDataMappingRule.0\",\n                          \"hasRuleAsSource\": \"//@containsDataFlow.4/@containsDataMappingRule.0\"\n                        }\n                      },\n                      {\n                        \"$\": {\n                          \"name\": \"UserId\",\n                          \"hasRulePropertyToDataColumn\": \"//@containsDataFlow.5/@containsDataMappingRule.1\",\n                          \"dataColumnType\": \"MetaData\",\n                          \"dataType\": \"String\"\n                        }\n                      },\n                      {\n                        \"$\": {\n                          \"name\": \"TimeStamp\",\n                          \"dataColumnType\": \"MetaData\",\n                          \"dataType\": \"Date\",\n                          \"formulaExpression\": \"sysdate\"\n                        }\n                      }\n                    ]\n                  }\n                ]\n              },\n              {\n                \"$\": {\n                  \"xsi:type\": \"MonitorIoT:Middleware\",\n                  \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0 //@containsIoTSystem.0/@containsIoTSubSystem.1\",\n                  \"id\": \"9\",\n                  \"name\": \"LocalExpressServer\",\n                  \"usesProtocol\": \"//@containsProtocol.0\"\n                },\n                \"containsService\": [\n                  {\n                    \"$\": {\n                      \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0\",\n                      \"id\": \"10\",\n                      \"name\": \"SaveTemperature&HumiditySync\",\n                      \"method\": \"POST\",\n                      \"hasLinkAppToService\": \"//@containsLink.2\",\n                      \"hasLinkServiceToDataTable\": \"//@containsLink.3\"\n                    },\n                    \"containsParameter\": [\n                      {\n                        \"$\": {\n                          \"name\": \"Temperature\",\n                          \"dataType\": \"Float\",\n                          \"receives\": \"//@containsEntityCategory.0/@hasPropertyTemplate.0\"\n                        }\n                      },\n                      {\n                        \"$\": {\n                          \"ordinal\": \"1\",\n                          \"name\": \"Humidity\",\n                          \"dataType\": \"Float\",\n                          \"receives\": \"//@containsEntityCategory.0/@hasPropertyTemplate.1\"\n                        }\n                      }\n                    ]\n                  },\n                  {\n                    \"$\": {\n                      \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0\",\n                      \"id\": \"11\",\n                      \"name\": \"SaveLocationSync\",\n                      \"method\": \"POST\",\n                      \"hasLinkAppToService\": \"//@containsLink.20\",\n                      \"hasLinkServiceToDataTable\": \"//@containsLink.21\"\n                    }\n                  },\n                  {\n                    \"$\": {\n                      \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0\",\n                      \"id\": \"12\",\n                      \"name\": \"SaveCo&SmokeSync\",\n                      \"method\": \"POST\",\n                      \"hasLinkAppToService\": \"//@containsLink.7\",\n                      \"hasLinkServiceToDataTable\": \"//@containsLink.8\"\n                    },\n                    \"containsParameter\": [\n                      {\n                        \"$\": {\n                          \"name\": \"Co&Smoke\"\n                        }\n                      }\n                    ]\n                  },\n                  {\n                    \"$\": {\n                      \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0\",\n                      \"id\": \"13\",\n                      \"name\": \"GetTemperatureAirConditioning\"\n                    }\n                  },\n                  {\n                    \"$\": {\n                      \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.1\",\n                      \"id\": \"14\",\n                      \"name\": \"SaveHeartRate Async\",\n                      \"method\": \"POST\",\n                      \"hasLinkServiceToDataTable\": \"//@containsLink.13\",\n                      \"hasLinkServiceToBroker\": \"//@containsLink.12\"\n                    }\n                  },\n                  {\n                    \"$\": {\n                      \"id\": \"15\",\n                      \"name\": \"DailyAverageHeartRate\",\n                      \"hasLinkServiceToDataTable\": \"//@containsLink.14 //@containsLink.15\"\n                    }\n                  }\n                ]\n              },\n              {\n                \"$\": {\n                  \"xsi:type\": \"MonitorIoT:Broker\",\n                  \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.1\",\n                  \"id\": \"16\",\n                  \"name\": \"Mosquitto\",\n                  \"usesProtocol\": \"//@containsProtocol.1\",\n                  \"hasLinkServiceToBroker\": \"//@containsLink.12\",\n                  \"hasLinkAppToBroker\": \"//@containsLink.11\"\n                },\n                \"containsTopic\": [\n                  {\n                    \"$\": {\n                      \"incluyes\": \"//@containsEntity.1/@containsSubPhysicalEntity.3/@hasProperty.1\",\n                      \"id\": \"17\",\n                      \"name\": \"HeartRate\",\n                      \"isTransferredByService\": \"//@containsLink.12\",\n                      \"isTransferredByApp\": \"//@containsLink.11\"\n                    }\n                  }\n                ]\n              },\n              {\n                \"$\": {\n                  \"xsi:type\": \"MonitorIoT:NetworkInterface\",\n                  \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0 //@containsIoTSystem.0/@containsIoTSubSystem.1\",\n                  \"id\": \"18\",\n                  \"name\": \"WifiConnection\",\n                  \"connects\": \"//@containsEntity.4 //@containsEntity.2\"\n                }\n              }\n            ]\n          },\n          {\n            \"$\": {\n              \"xsi:type\": \"MonitorIoT:IoTGateway\",\n              \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0\",\n              \"id\": \"19\",\n              \"name\": \"RaspberryPi3\",\n              \"descrption\": \"Microcontrolador de sensores de temperatura, humedad, Co y Humo\",\n              \"controls\": \"//@containsEntity.1/@containsSubPhysicalEntity.0/@containsComputingNode.1 //@containsEntity.1/@containsSubPhysicalEntity.0/@containsComputingNode.2 //@containsEntity.1/@containsSubPhysicalEntity.1/@containsComputingNode.1 //@containsEntity.1/@containsSubPhysicalEntity.1/@containsComputingNode.2\",\n              \"gatewayType\": \"Microcontroller\"\n            },\n            \"containsResource\": [\n              {\n                \"$\": {\n                  \"xsi:type\": \"MonitorIoT:Application\",\n                  \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0\",\n                  \"id\": \"20\",\n                  \"name\": \"EnvironmentController\",\n                  \"type\": \"Embedded\",\n                  \"hasLinkAppToService\": \"//@containsLink.2 //@containsLink.7\",\n                  \"hasLinkAppToAPI\": \"//@containsLink.1 //@containsLink.6\"\n                }\n              },\n              {\n                \"$\": {\n                  \"xsi:type\": \"MonitorIoT:API\",\n                  \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0\",\n                  \"id\": \"211\",\n                  \"name\": \"DHT11Sensor\",\n                  \"hasLinkAppToAPI\": \"//@containsLink.1\",\n                  \"hasLinkAPIToIoTDevice\": \"//@containsLink.0 //@containsLink.4\"\n                },\n                \"containsParameter\": [\n                  {\n                    \"$\": {\n                      \"name\": \"SensorId\",\n                      \"dataType\": \"String\",\n                      \"receives\": \"//@containsEntityCategory.1/@hasPropertyTemplate.0\"\n                    }\n                  }\n                ],\n                \"containsReturnVariable\": [\n                  {\n                    \"$\": {\n                      \"name\": \"Temperature\",\n                      \"dataType\": \"Float\",\n                      \"returns\": \"//@containsEntityCategory.0/@hasPropertyTemplate.0\"\n                    }\n                  },\n                  {\n                    \"$\": {\n                      \"ordinal\": \"1\",\n                      \"name\": \"Humidity\",\n                      \"dataType\": \"Float\",\n                      \"returns\": \"//@containsEntityCategory.0/@hasPropertyTemplate.1\"\n                    }\n                  }\n                ]\n              },\n              {\n                \"$\": {\n                  \"xsi:type\": \"MonitorIoT:API\",\n                  \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0\",\n                  \"id\": \"21\",\n                  \"name\": \"Co&SmokeSensor\",\n                  \"hasLinkAppToAPI\": \"//@containsLink.6\",\n                  \"hasLinkAPIToIoTDevice\": \"//@containsLink.5\"\n                },\n                \"containsParameter\": [\n                  {\n                    \"$\": {\n                      \"name\": \"SensorId\",\n                      \"dataType\": \"String\",\n                      \"receives\": \"//@containsEntityCategory.3/@hasPropertyTemplate.0\"\n                    }\n                  }\n                ],\n                \"containsReturnVariable\": [\n                  {\n                    \"$\": {\n                      \"name\": \"Co\",\n                      \"dataType\": \"Float\",\n                      \"returns\": \"//@containsEntityCategory.0/@hasPropertyTemplate.2\"\n                    }\n                  },\n                  {\n                    \"$\": {\n                      \"ordinal\": \"1\",\n                      \"name\": \"Smoke\",\n                      \"dataType\": \"Float\",\n                      \"returns\": \"//@containsEntityCategory.0/@hasPropertyTemplate.3\"\n                    }\n                  }\n                ]\n              },\n              {\n                \"$\": {\n                  \"xsi:type\": \"MonitorIoT:API\",\n                  \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0\",\n                  \"id\": \"22\",\n                  \"name\": \"AirConditioningActuator\"\n                }\n              },\n              {\n                \"$\": {\n                  \"xsi:type\": \"MonitorIoT:NetworkInterface\",\n                  \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0\",\n                  \"id\": \"23\",\n                  \"name\": \"BluetoothConnection\",\n                  \"connects\": \"//@containsEntity.3\",\n                  \"communicationTechnology\": \"Bluetooth\"\n                }\n              },\n              {\n                \"$\": {\n                  \"xsi:type\": \"MonitorIoT:NetworkInterface\",\n                  \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0\",\n                  \"id\": \"24\",\n                  \"name\": \"WifiConnection\",\n                  \"connects\": \"//@containsEntity.4\"\n                }\n              }\n            ]\n          }\n        ],\n        \"containsSubPhysicalEntity\": [\n          {\n            \"$\": {\n              \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0\",\n              \"id\": \"25\",\n              \"name\": \"Livingroom\",\n              \"descrption\": \"Sala de la casa\",\n              \"isGrouped\": \"//@containsEntityCategory.0\"\n            },\n            \"hasProperty\": [\n              {\n                \"$\": {\n                  \"id\": \"26\",\n                  \"isBasedOn\": \"//@containsEntityCategory.0/@hasPropertyTemplate.0\",\n                  \"hasRulePropertyToDataColumn\": \"//@containsDataFlow.0/@containsDataMappingRule.0\",\n                  \"name\": \"LivingroomTemperature\"\n                }\n              },\n              {\n                \"$\": {\n                  \"id\": \"27\",\n                  \"isBasedOn\": \"//@containsEntityCategory.0/@hasPropertyTemplate.1\",\n                  \"hasRulePropertyToDataColumn\": \"//@containsDataFlow.0/@containsDataMappingRule.1\",\n                  \"name\": \"LivingroomHumidity\"\n                }\n              }\n            ],\n            \"containsComputingNode\": [\n              {\n                \"$\": {\n                  \"xsi:type\": \"MonitorIoT:Tag\",\n                  \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0\",\n                  \"id\": \"28\",\n                  \"name\": \"Beacon1\",\n                  \"isControlled\": \"//@containsEntity.1/@containsSubPhysicalEntity.3/@containsSubPhysicalEntity.0/@containsComputingNode.0\",\n                  \"hasLinkAPIToIoTDevice\": \"//@containsLink.16\"\n                },\n                \"containsResource\": [\n                  {\n                    \"$\": {\n                      \"xsi:type\": \"MonitorIoT:NetworkInterface\",\n                      \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0\",\n                      \"id\": \"29\",\n                      \"name\": \"BluetoothConnection\",\n                      \"connects\": \"//@containsEntity.3\",\n                      \"communicationTechnology\": \"Bluetooth\"\n                    }\n                  }\n                ]\n              },\n              {\n                \"$\": {\n                  \"xsi:type\": \"MonitorIoT:Sensor\",\n                  \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0\",\n                  \"id\": \"30\",\n                  \"name\": \"DHT11_1\",\n                  \"isGrouped\": \"//@containsEntityCategory.1\",\n                  \"isControlled\": \"//@containsEntity.1/@containsComputingNode.1\",\n                  \"hasLinkAPIToIoTDevice\": \"//@containsLink.0\"\n                },\n                \"hasProperty\": [\n                  {\n                    \"$\": {\n                      \"id\": \"31\",\n                      \"isBasedOn\": \"//@containsEntityCategory.1/@hasPropertyTemplate.0\",\n                      \"hasRulePropertyToDataColumn\": \"//@containsDataFlow.0/@containsDataMappingRule.2\",\n                      \"name\": \"DHT11_1SensorId\",\n                      \"value\": \"DHT11_1\"\n                    }\n                  }\n                ],\n                \"containsResource\": [\n                  {\n                    \"$\": {\n                      \"xsi:type\": \"MonitorIoT:NetworkInterface\",\n                      \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0\",\n                      \"id\": \"32\",\n                      \"name\": \"BluetoothConnection\",\n                      \"connects\": \"//@containsEntity.3\",\n                      \"communicationTechnology\": \"Bluetooth\"\n                    }\n                  }\n                ]\n              },\n              {\n                \"$\": {\n                  \"xsi:type\": \"MonitorIoT:Actuator\",\n                  \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0\",\n                  \"id\": \"33\",\n                  \"name\": \"AirConditioning1\",\n                  \"isControlled\": \"//@containsEntity.1/@containsComputingNode.1\"\n                },\n                \"hasProperty\": [\n                  {\n                    \"$\": {\n                      \"id\": \"34\",\n                      \"name\": \"TemperatureAirConditioning1\"\n                    }\n                  }\n                ],\n                \"containsResource\": [\n                  {\n                    \"$\": {\n                      \"xsi:type\": \"MonitorIoT:NetworkInterface\",\n                      \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0\",\n                      \"id\": \"35\",\n                      \"name\": \"BluetoothConnection\",\n                      \"connects\": \"//@containsEntity.3\",\n                      \"communicationTechnology\": \"Bluetooth\"\n                    }\n                  }\n                ]\n              }\n            ]\n          },\n          {\n            \"$\": {\n              \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0\",\n              \"id\": \"36\",\n              \"name\": \"Bedroom\",\n              \"descrption\": \"Dormitorio de la casa\",\n              \"isGrouped\": \"//@containsEntityCategory.0\"\n            },\n            \"hasProperty\": [\n              {\n                \"$\": {\n                  \"id\": \"37\",\n                  \"isBasedOn\": \"//@containsEntityCategory.0/@hasPropertyTemplate.0\",\n                  \"hasRulePropertyToDataColumn\": \"//@containsDataFlow.1/@containsDataMappingRule.0\",\n                  \"name\": \"BedroomTemperature\"\n                }\n              },\n              {\n                \"$\": {\n                  \"id\": \"38\",\n                  \"isBasedOn\": \"//@containsEntityCategory.0/@hasPropertyTemplate.1\",\n                  \"hasRulePropertyToDataColumn\": \"//@containsDataFlow.1/@containsDataMappingRule.1\",\n                  \"name\": \"BedroomHumidity\"\n                }\n              }\n            ],\n            \"containsComputingNode\": [\n              {\n                \"$\": {\n                  \"xsi:type\": \"MonitorIoT:Tag\",\n                  \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0\",\n                  \"id\": \"39\",\n                  \"name\": \"Beacon2\",\n                  \"isControlled\": \"//@containsEntity.1/@containsSubPhysicalEntity.3/@containsSubPhysicalEntity.0/@containsComputingNode.0\",\n                  \"hasLinkAPIToIoTDevice\": \"//@containsLink.17\"\n                },\n                \"containsResource\": [\n                  {\n                    \"$\": {\n                      \"xsi:type\": \"MonitorIoT:NetworkInterface\",\n                      \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0\",\n                      \"id\": \"40\",\n                      \"name\": \"BluetoothConnection\",\n                      \"connects\": \"//@containsEntity.3\",\n                      \"communicationTechnology\": \"Bluetooth\"\n                    }\n                  }\n                ]\n              },\n              {\n                \"$\": {\n                  \"xsi:type\": \"MonitorIoT:Sensor\",\n                  \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0\",\n                  \"id\": \"41\",\n                  \"name\": \"DHT11_2\",\n                  \"isGrouped\": \"//@containsEntityCategory.1\",\n                  \"isControlled\": \"//@containsEntity.1/@containsComputingNode.1\",\n                  \"hasLinkAPIToIoTDevice\": \"//@containsLink.4\"\n                },\n                \"hasProperty\": [\n                  {\n                    \"$\": {\n                      \"id\": \"42\",\n                      \"isBasedOn\": \"//@containsEntityCategory.1/@hasPropertyTemplate.0\",\n                      \"hasRulePropertyToDataColumn\": \"//@containsDataFlow.1/@containsDataMappingRule.2\",\n                      \"name\": \"DHT11_2SensorId\",\n                      \"value\": \"DHT11_2\"\n                    }\n                  }\n                ],\n                \"containsResource\": [\n                  {\n                    \"$\": {\n                      \"xsi:type\": \"MonitorIoT:NetworkInterface\",\n                      \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0\",\n                      \"id\": \"43\",\n                      \"name\": \"BluetoothConnection\",\n                      \"connects\": \"//@containsEntity.3\",\n                      \"communicationTechnology\": \"Bluetooth\"\n                    }\n                  }\n                ]\n              },\n              {\n                \"$\": {\n                  \"xsi:type\": \"MonitorIoT:Actuator\",\n                  \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0\",\n                  \"id\": \"44\",\n                  \"name\": \"AirConditioning2\",\n                  \"isControlled\": \"//@containsEntity.1/@containsComputingNode.1\"\n                },\n                \"hasProperty\": [\n                  {\n                    \"$\": {\n                      \"id\": \"45\",\n                      \"name\": \"TemperatureAirConditioning2\"\n                    }\n                  }\n                ],\n                \"containsResource\": [\n                  {\n                    \"$\": {\n                      \"xsi:type\": \"MonitorIoT:NetworkInterface\",\n                      \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0\",\n                      \"id\": \"46\",\n                      \"name\": \"BluetoothConnection\",\n                      \"connects\": \"//@containsEntity.3\",\n                      \"communicationTechnology\": \"Bluetooth\"\n                    }\n                  }\n                ]\n              }\n            ]\n          },\n          {\n            \"$\": {\n              \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0\",\n              \"id\": \"47\",\n              \"name\": \"Kitchen\",\n              \"descrption\": \"Cocina de la casa\",\n              \"isGrouped\": \"//@containsEntityCategory.0\"\n            },\n            \"hasProperty\": [\n              {\n                \"$\": {\n                  \"id\": \"48\",\n                  \"isBasedOn\": \"//@containsEntityCategory.0/@hasPropertyTemplate.2\",\n                  \"hasRulePropertyToDataColumn\": \"//@containsDataFlow.2/@containsDataMappingRule.0\",\n                  \"name\": \"KitchenCo\"\n                }\n              },\n              {\n                \"$\": {\n                  \"id\": \"49\",\n                  \"isBasedOn\": \"//@containsEntityCategory.0/@hasPropertyTemplate.2\",\n                  \"hasRulePropertyToDataColumn\": \"//@containsDataFlow.2/@containsDataMappingRule.1\",\n                  \"name\": \"KitchenSmoke\"\n                }\n              }\n            ],\n            \"containsComputingNode\": [\n              {\n                \"$\": {\n                  \"xsi:type\": \"MonitorIoT:Tag\",\n                  \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0\",\n                  \"id\": \"50\",\n                  \"name\": \"Beacon3\",\n                  \"isControlled\": \"//@containsEntity.1/@containsSubPhysicalEntity.3/@containsSubPhysicalEntity.0/@containsComputingNode.0\",\n                  \"hasLinkAPIToIoTDevice\": \"//@containsLink.18\"\n                },\n                \"containsResource\": [\n                  {\n                    \"$\": {\n                      \"xsi:type\": \"MonitorIoT:NetworkInterface\",\n                      \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0\",\n                      \"id\": \"51\",\n                      \"name\": \"BluetoothConnection\",\n                      \"connects\": \"//@containsEntity.3\",\n                      \"communicationTechnology\": \"Bluetooth\"\n                    }\n                  }\n                ]\n              },\n              {\n                \"$\": {\n                  \"xsi:type\": \"MonitorIoT:Sensor\",\n                  \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0\",\n                  \"id\": \"52\",\n                  \"name\": \"Co&Smoke\",\n                  \"isGrouped\": \"//@containsEntityCategory.3\",\n                  \"isControlled\": \"//@containsEntity.1/@containsSubPhysicalEntity.3/@containsSubPhysicalEntity.0/@containsComputingNode.0\",\n                  \"hasLinkAPIToIoTDevice\": \"//@containsLink.5\"\n                },\n                \"hasProperty\": [\n                  {\n                    \"$\": {\n                      \"id\": \"53\",\n                      \"isBasedOn\": \"//@containsEntityCategory.3/@hasPropertyTemplate.0\",\n                      \"hasRulePropertyToDataColumn\": \"//@containsDataFlow.2/@containsDataMappingRule.2\",\n                      \"name\": \"Co&SmokeSensorId\"\n                    }\n                  }\n                ],\n                \"containsResource\": [\n                  {\n                    \"$\": {\n                      \"xsi:type\": \"MonitorIoT:NetworkInterface\",\n                      \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0\",\n                      \"id\": \"54\",\n                      \"name\": \"BluetoothConnection\",\n                      \"connects\": \"//@containsEntity.3\",\n                      \"communicationTechnology\": \"Bluetooth\"\n                    }\n                  }\n                ]\n              }\n            ]\n          },\n          {\n            \"$\": {\n              \"xsi:type\": \"MonitorIoT:HumanUser\",\n              \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0 //@containsIoTSystem.0/@containsIoTSubSystem.1\",\n              \"id\": \"55\",\n              \"name\": \"Patient\",\n              \"descrption\": \"Paciente que vive en la casa\",\n              \"isGrouped\": \"//@containsEntityCategory.2\",\n              \"interactsUsing\": \"//@containsEntity.1/@containsSubPhysicalEntity.3/@containsSubPhysicalEntity.0/@containsComputingNode.0/@containsResource.0\"\n            },\n            \"hasProperty\": [\n              {\n                \"$\": {\n                  \"id\": \"56\",\n                  \"isBasedOn\": \"//@containsEntityCategory.2/@hasPropertyTemplate.0\",\n                  \"hasRulePropertyToDataColumn\": \"//@containsDataFlow.5/@containsDataMappingRule.0\",\n                  \"name\": \"LocationId\"\n                }\n              },\n              {\n                \"$\": {\n                  \"id\": \"57\",\n                  \"isBasedOn\": \"//@containsEntityCategory.2/@hasPropertyTemplate.1\",\n                  \"isIncluded\": \"//@containsEntity.1/@containsComputingNode.0/@containsResource.2/@containsTopic.0\",\n                  \"hasRulePropertyToDataColumn\": \"//@containsDataFlow.3/@containsDataMappingRule.0\",\n                  \"name\": \"HeartRate\"\n                }\n              },\n              {\n                \"$\": {\n                  \"id\": \"58\",\n                  \"isBasedOn\": \"//@containsEntityCategory.2/@hasPropertyTemplate.2\",\n                  \"hasRulePropertyToDataColumn\": \"//@containsDataFlow.3/@containsDataMappingRule.1 //@containsDataFlow.5/@containsDataMappingRule.1\",\n                  \"name\": \"UserId\"\n                }\n              }\n            ],\n            \"containsSubPhysicalEntity\": [\n              {\n                \"$\": {\n                  \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0\",\n                  \"id\": \"59\",\n                  \"name\": \"SmartPhone\"\n                },\n                \"containsComputingNode\": [\n                  {\n                    \"$\": {\n                      \"xsi:type\": \"MonitorIoT:IoTGateway\",\n                      \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0\",\n                      \"id\": \"60\",\n                      \"name\": \"SmartPhoneGateway\",\n                      \"controls\": \"//@containsEntity.1/@containsSubPhysicalEntity.0/@containsComputingNode.0 //@containsEntity.1/@containsSubPhysicalEntity.1/@containsComputingNode.0 //@containsEntity.1/@containsSubPhysicalEntity.2/@containsComputingNode.0 //@containsEntity.1/@containsSubPhysicalEntity.2/@containsComputingNode.1\",\n                      \"gatewayType\": \"Smartphone\"\n                    },\n                    \"containsResource\": [\n                      {\n                        \"$\": {\n                          \"xsi:type\": \"MonitorIoT:Application\",\n                          \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0\",\n                          \"id\": \"61\",\n                          \"name\": \"LocationController\",\n                          \"isUsedByUser\": \"//@containsEntity.1/@containsSubPhysicalEntity.3\",\n                          \"type\": \"Mobile\",\n                          \"hasLinkAppToService\": \"//@containsLink.20\",\n                          \"hasLinkAppToAPI\": \"//@containsLink.19\"\n                        }\n                      },\n                      {\n                        \"$\": {\n                          \"xsi:type\": \"MonitorIoT:API\",\n                          \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0\",\n                          \"id\": \"62\",\n                          \"name\": \"Beacon\",\n                          \"hasLinkAppToAPI\": \"//@containsLink.19\",\n                          \"hasLinkAPIToIoTDevice\": \"//@containsLink.16 //@containsLink.17 //@containsLink.18\"\n                        },\n                        \"containsReturnVariable\": [\n                          {\n                            \"$\": {\n                              \"name\": \"LocationId\",\n                              \"returns\": \"//@containsEntityCategory.2/@hasPropertyTemplate.0\"\n                            }\n                          }\n                        ]\n                      },\n                      {\n                        \"$\": {\n                          \"xsi:type\": \"MonitorIoT:NetworkInterface\",\n                          \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0\",\n                          \"id\": \"63\",\n                          \"name\": \"BluetoothConnection\",\n                          \"connects\": \"//@containsEntity.3\",\n                          \"communicationTechnology\": \"Bluetooth\"\n                        }\n                      },\n                      {\n                        \"$\": {\n                          \"xsi:type\": \"MonitorIoT:NetworkInterface\",\n                          \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0\",\n                          \"id\": \"64\",\n                          \"name\": \"WifiConnection\",\n                          \"connects\": \"//@containsEntity.4\"\n                        }\n                      }\n                    ]\n                  }\n                ]\n              },\n              {\n                \"$\": {\n                  \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.1\",\n                  \"id\": \"65\",\n                  \"name\": \"SmartWatch\"\n                },\n                \"containsComputingNode\": [\n                  {\n                    \"$\": {\n                      \"xsi:type\": \"MonitorIoT:IoTGateway\",\n                      \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.1\",\n                      \"id\": \"655\",\n                      \"name\": \"SmartWatchGateway\",\n                      \"controls\": \"//@containsEntity.1/@containsSubPhysicalEntity.3/@containsSubPhysicalEntity.1/@containsComputingNode.1\",\n                      \"gatewayType\": \"SmartWatch\"\n                    },\n                    \"containsResource\": [\n                      {\n                        \"$\": {\n                          \"xsi:type\": \"MonitorIoT:Application\",\n                          \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.1\",\n                          \"id\": \"66\",\n                          \"name\": \"HealthController\",\n                          \"type\": \"Mobile\",\n                          \"hasLinkAppToAPI\": \"//@containsLink.10\",\n                          \"hasLinkAppToBroker\": \"//@containsLink.11\"\n                        }\n                      },\n                      {\n                        \"$\": {\n                          \"xsi:type\": \"MonitorIoT:API\",\n                          \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.1\",\n                          \"id\": \"67\",\n                          \"name\": \"HeartRateSensor\",\n                          \"hasLinkAppToAPI\": \"//@containsLink.10\",\n                          \"hasLinkAPIToIoTDevice\": \"//@containsLink.9\"\n                        },\n                        \"containsParameter\": [\n                          {\n                            \"$\": {\n                              \"name\": \"UserId\",\n                              \"receives\": \"//@containsEntityCategory.2/@hasPropertyTemplate.2\"\n                            }\n                          }\n                        ],\n                        \"containsReturnVariable\": [\n                          {\n                            \"$\": {\n                              \"name\": \"HeartRate\",\n                              \"returns\": \"//@containsEntityCategory.2/@hasPropertyTemplate.1\"\n                            }\n                          }\n                        ]\n                      },\n                      {\n                        \"$\": {\n                          \"xsi:type\": \"MonitorIoT:NetworkInterface\",\n                          \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.1\",\n                          \"id\": \"68\",\n                          \"name\": \"WifiConnection\",\n                          \"descrption\": \"\",\n                          \"connects\": \"//@containsEntity.4\"\n                        }\n                      }\n                    ]\n                  },\n                  {\n                    \"$\": {\n                      \"xsi:type\": \"MonitorIoT:Sensor\",\n                      \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.1\",\n                      \"id\": \"69\",\n                      \"name\": \"HeartRate1\",\n                      \"isGrouped\": \"//@containsEntityCategory.2\",\n                      \"isControlled\": \"//@containsEntity.1/@containsSubPhysicalEntity.3/@containsSubPhysicalEntity.1/@containsComputingNode.0\",\n                      \"hasLinkAPIToIoTDevice\": \"//@containsLink.9\"\n                    }\n                  }\n                ]\n              }\n            ]\n          }\n        ]\n      },\n      {\n        \"$\": {\n          \"xsi:type\": \"MonitorIoT:Network\",\n          \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0 //@containsIoTSystem.0/@containsIoTSubSystem.1\",\n          \"id\": \"70\",\n          \"name\": \"Internet\",\n          \"descrption\": \"Red de internet\",\n          \"isConnected\": \"//@containsEntity.0/@containsResource.2 //@containsEntity.1/@containsComputingNode.0/@containsResource.3\",\n          \"usesProtocol\": \"//@containsProtocol.0 //@containsProtocol.2\"\n        }\n      },\n      {\n        \"$\": {\n          \"xsi:type\": \"MonitorIoT:Network\",\n          \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0\",\n          \"id\": \"71\",\n          \"name\": \"Proximity\",\n          \"descrption\": \"Red de proximidad a los sensores\",\n          \"isConnected\": \"//@containsEntity.1/@containsSubPhysicalEntity.0/@containsComputingNode.0/@containsResource.0 //@containsEntity.1/@containsSubPhysicalEntity.0/@containsComputingNode.1/@containsResource.0 //@containsEntity.1/@containsSubPhysicalEntity.0/@containsComputingNode.2/@containsResource.0 //@containsEntity.1/@containsSubPhysicalEntity.1/@containsComputingNode.0/@containsResource.0 //@containsEntity.1/@containsSubPhysicalEntity.1/@containsComputingNode.1/@containsResource.0 //@containsEntity.1/@containsSubPhysicalEntity.1/@containsComputingNode.2/@containsResource.0 //@containsEntity.1/@containsSubPhysicalEntity.2/@containsComputingNode.0/@containsResource.0 //@containsEntity.1/@containsSubPhysicalEntity.2/@containsComputingNode.1/@containsResource.0 //@containsEntity.1/@containsSubPhysicalEntity.3/@containsSubPhysicalEntity.0/@containsComputingNode.0/@containsResource.2 //@containsEntity.1/@containsComputingNode.1/@containsResource.4\"\n        }\n      },\n      {\n        \"$\": {\n          \"xsi:type\": \"MonitorIoT:Network\",\n          \"isPartOf\": \"//@containsIoTSystem.0/@containsIoTSubSystem.0 //@containsIoTSystem.0/@containsIoTSubSystem.1\",\n          \"id\": \"72\",\n          \"name\": \"LAN\",\n          \"descrption\": \"Red de área local\",\n          \"isConnected\": \"//@containsEntity.1/@containsSubPhysicalEntity.3/@containsSubPhysicalEntity.0/@containsComputingNode.0/@containsResource.3 //@containsEntity.1/@containsSubPhysicalEntity.3/@containsSubPhysicalEntity.1/@containsComputingNode.0/@containsResource.2 //@containsEntity.1/@containsComputingNode.1/@containsResource.5 //@containsEntity.1/@containsComputingNode.0/@containsResource.3 //@containsEntity.0/@containsResource.2\",\n          \"usesProtocol\": \"//@containsProtocol.0 //@containsProtocol.1 //@containsProtocol.2\"\n        }\n      }\n    ],\n    \"containsIoTSystem\": [\n      {\n        \"$\": {\n          \"id\": \"73\",\n          \"name\": \"EmergencySystem\",\n          \"descrption\": \"Emergency management system aimed at patients or elders who are at home.\",\n          \"domain\": \"Health\"\n        },\n        \"containsIoTSubSystem\": [\n          {\n            \"$\": {\n              \"isComposedOf\": \"//@containsEntity.1/@containsSubPhysicalEntity.0/@containsComputingNode.1 //@containsEntity.1/@containsSubPhysicalEntity.0/@containsComputingNode.0 //@containsEntity.1/@containsSubPhysicalEntity.0/@containsComputingNode.2 //@containsEntity.1/@containsSubPhysicalEntity.1/@containsComputingNode.0 //@containsEntity.1/@containsSubPhysicalEntity.0 //@containsEntity.1/@containsSubPhysicalEntity.1 //@containsEntity.1/@containsSubPhysicalEntity.2 //@containsEntity.1/@containsSubPhysicalEntity.1/@containsComputingNode.1 //@containsEntity.1/@containsSubPhysicalEntity.1/@containsComputingNode.2 //@containsEntity.1/@containsSubPhysicalEntity.2/@containsComputingNode.0 //@containsEntity.1/@containsSubPhysicalEntity.2/@containsComputingNode.1 //@containsEntity.1/@containsSubPhysicalEntity.3 //@containsEntity.1/@containsSubPhysicalEntity.3/@containsSubPhysicalEntity.0 //@containsEntity.1/@containsComputingNode.1 //@containsEntity.1/@containsComputingNode.1/@containsResource.0 //@containsEntity.1/@containsSubPhysicalEntity.3/@containsSubPhysicalEntity.0/@containsComputingNode.0/@containsResource.0 //@containsEntity.1/@containsComputingNode.1/@containsResource.1 //@containsEntity.1/@containsComputingNode.1/@containsResource.2 //@containsEntity.1/@containsComputingNode.1/@containsResource.3 //@containsEntity.1/@containsComputingNode.0 //@containsEntity.1/@containsComputingNode.0/@containsResource.0 //@containsEntity.1/@containsComputingNode.0/@containsResource.1 //@containsEntity.1/@containsComputingNode.0/@containsResource.1/@containsService.0 //@containsEntity.1/@containsComputingNode.0/@containsResource.1/@containsService.2 //@containsEntity.1/@containsComputingNode.0/@containsResource.1/@containsService.1 //@containsEntity.1/@containsComputingNode.0/@containsResource.1/@containsService.3 //@containsEntity.0 //@containsEntity.0/@containsResource.0 //@containsEntity.0/@containsResource.1 //@containsEntity.1 //@containsEntity.2 //@containsEntity.3 //@containsEntity.4 //@containsEntity.1/@containsSubPhysicalEntity.0/@containsComputingNode.0/@containsResource.0 //@containsEntity.1/@containsSubPhysicalEntity.0/@containsComputingNode.1/@containsResource.0 //@containsEntity.1/@containsSubPhysicalEntity.0/@containsComputingNode.2/@containsResource.0 //@containsEntity.1/@containsSubPhysicalEntity.1/@containsComputingNode.0/@containsResource.0 //@containsEntity.1/@containsSubPhysicalEntity.1/@containsComputingNode.1/@containsResource.0 //@containsEntity.1/@containsSubPhysicalEntity.1/@containsComputingNode.2/@containsResource.0 //@containsEntity.1/@containsSubPhysicalEntity.2/@containsComputingNode.0/@containsResource.0 //@containsEntity.1/@containsSubPhysicalEntity.2/@containsComputingNode.1/@containsResource.0 //@containsEntity.1/@containsSubPhysicalEntity.3/@containsSubPhysicalEntity.0/@containsComputingNode.0/@containsResource.2 //@containsEntity.1/@containsSubPhysicalEntity.3/@containsSubPhysicalEntity.0/@containsComputingNode.0/@containsResource.3 //@containsEntity.1/@containsComputingNode.1/@containsResource.4 //@containsEntity.1/@containsComputingNode.1/@containsResource.5 //@containsEntity.1/@containsComputingNode.0/@containsResource.3 //@containsEntity.0/@containsResource.2 //@containsEntity.1/@containsSubPhysicalEntity.3/@containsSubPhysicalEntity.0/@containsComputingNode.0 //@containsEntity.1/@containsSubPhysicalEntity.3/@containsSubPhysicalEntity.0/@containsComputingNode.0/@containsResource.1\",\n              \"id\": \"74\",\n              \"name\": \"EnvironmentalControlSubsystem\",\n              \"descrption\": \"Environmental control subsystem, responsible for monitoring the temperature, the presence of carbon monoxide (Co) and smoke in the environment, as well as the location of the user inside the house.\",\n              \"domain\": \"Domotic\"\n            }\n          },\n          {\n            \"$\": {\n              \"isComposedOf\": \"//@containsEntity.1/@containsSubPhysicalEntity.3 //@containsEntity.1/@containsSubPhysicalEntity.3/@containsSubPhysicalEntity.1 //@containsEntity.1/@containsSubPhysicalEntity.3/@containsSubPhysicalEntity.1/@containsComputingNode.0 //@containsEntity.1/@containsSubPhysicalEntity.3/@containsSubPhysicalEntity.1/@containsComputingNode.0/@containsResource.0 //@containsEntity.1/@containsSubPhysicalEntity.3/@containsSubPhysicalEntity.1/@containsComputingNode.0/@containsResource.1 //@containsEntity.1/@containsSubPhysicalEntity.3/@containsSubPhysicalEntity.1/@containsComputingNode.1 //@containsEntity.1/@containsComputingNode.0 //@containsEntity.1/@containsComputingNode.0/@containsResource.0 //@containsEntity.1/@containsComputingNode.0/@containsResource.1 //@containsEntity.1/@containsComputingNode.0/@containsResource.2 //@containsEntity.1/@containsComputingNode.0/@containsResource.1/@containsService.4 //@containsEntity.0 //@containsEntity.0/@containsResource.0 //@containsEntity.0/@containsResource.1 //@containsEntity.0/@containsResource.1/@containsService.0 //@containsEntity.1 //@containsEntity.2 //@containsEntity.4 //@containsEntity.1/@containsSubPhysicalEntity.3/@containsSubPhysicalEntity.1/@containsComputingNode.0/@containsResource.2 //@containsEntity.1/@containsComputingNode.0/@containsResource.3 //@containsEntity.0/@containsResource.2\",\n              \"id\": \"75\",\n              \"name\": \"HealthSubsystem\",\n              \"descrption\": \"Health subsystem for monitoring the user`s vital signs.\",\n              \"domain\": \"Health\"\n            }\n          }\n        ]\n      }\n    ],\n    \"containsDataFlow\": [\n      {\n        \"$\": {\n          \"id\": \"74\",\n          \"description\": \"Flujo de recolección de temperatura de la sala (livingroom)\",\n          \"isSupported\": \"//@containsLink.0 //@containsLink.1 //@containsLink.2 //@containsLink.3\",\n          \"communicationType\": \"Synchronous\",\n          \"unitOfTime\": \"Minute\",\n          \"flowExecutionTimeInterval\": \"10\"\n        },\n        \"containsDataMappingRule\": [\n          {\n            \"$\": {\n              \"xsi:type\": \"MonitorIoT:PropertyToDataColumn\",\n              \"id\": \"75\",\n              \"relatesColumn\": \"//@containsEntity.1/@containsComputingNode.0/@containsResource.0/@containsDataTable.0/@composedOfDataColumn.0\",\n              \"relatesSpecificProperty\": \"//@containsEntity.1/@containsSubPhysicalEntity.0/@hasProperty.0\"\n            }\n          },\n          {\n            \"$\": {\n              \"xsi:type\": \"MonitorIoT:PropertyToDataColumn\",\n              \"id\": \"76\",\n              \"relatesColumn\": \"//@containsEntity.1/@containsComputingNode.0/@containsResource.0/@containsDataTable.0/@composedOfDataColumn.1\",\n              \"relatesSpecificProperty\": \"//@containsEntity.1/@containsSubPhysicalEntity.0/@hasProperty.1\"\n            }\n          },\n          {\n            \"$\": {\n              \"xsi:type\": \"MonitorIoT:PropertyToDataColumn\",\n              \"id\": \"77\",\n              \"relatesColumn\": \"//@containsEntity.1/@containsComputingNode.0/@containsResource.0/@containsDataTable.0/@composedOfDataColumn.2\",\n              \"relatesSpecificProperty\": \"//@containsEntity.1/@containsSubPhysicalEntity.0/@containsComputingNode.1/@hasProperty.0\"\n            }\n          }\n        ]\n      },\n      {\n        \"$\": {\n          \"id\": \"78\",\n          \"description\": \"Flujo de recolección de temperatura del dormitorio (bedroom)\",\n          \"isSupported\": \"//@containsLink.4 //@containsLink.1 //@containsLink.2 //@containsLink.3\",\n          \"communicationType\": \"Synchronous\",\n          \"unitOfTime\": \"Minute\",\n          \"flowExecutionTimeInterval\": \"10\"\n        },\n        \"containsDataMappingRule\": [\n          {\n            \"$\": {\n              \"xsi:type\": \"MonitorIoT:PropertyToDataColumn\",\n              \"id\": \"79\",\n              \"relatesColumn\": \"//@containsEntity.1/@containsComputingNode.0/@containsResource.0/@containsDataTable.0/@composedOfDataColumn.0\",\n              \"relatesSpecificProperty\": \"//@containsEntity.1/@containsSubPhysicalEntity.1/@hasProperty.0\"\n            }\n          },\n          {\n            \"$\": {\n              \"xsi:type\": \"MonitorIoT:PropertyToDataColumn\",\n              \"id\": \"80\",\n              \"relatesColumn\": \"//@containsEntity.1/@containsComputingNode.0/@containsResource.0/@containsDataTable.0/@composedOfDataColumn.1\",\n              \"relatesSpecificProperty\": \"//@containsEntity.1/@containsSubPhysicalEntity.1/@hasProperty.1\"\n            }\n          },\n          {\n            \"$\": {\n              \"xsi:type\": \"MonitorIoT:PropertyToDataColumn\",\n              \"id\": \"81\",\n              \"relatesColumn\": \"//@containsEntity.1/@containsComputingNode.0/@containsResource.0/@containsDataTable.1/@composedOfDataColumn.2\",\n              \"relatesSpecificProperty\": \"//@containsEntity.1/@containsSubPhysicalEntity.1/@containsComputingNode.1/@hasProperty.0\"\n            }\n          }\n        ]\n      },\n      {\n        \"$\": {\n          \"id\": \"82\",\n          \"description\": \"Flujo de recolección de Co - humo en la cocina (kitchen)\",\n          \"isSupported\": \"//@containsLink.5 //@containsLink.6 //@containsLink.7 //@containsLink.8\",\n          \"communicationType\": \"Synchronous\",\n          \"unitOfTime\": \"Minute\",\n          \"flowExecutionTimeInterval\": \"10\"\n        },\n        \"containsDataMappingRule\": [\n          {\n            \"$\": {\n              \"xsi:type\": \"MonitorIoT:PropertyToDataColumn\",\n              \"id\": \"83\",\n              \"relatesColumn\": \"//@containsEntity.1/@containsComputingNode.0/@containsResource.0/@containsDataTable.1/@composedOfDataColumn.0\",\n              \"relatesSpecificProperty\": \"//@containsEntity.1/@containsSubPhysicalEntity.2/@hasProperty.0\"\n            }\n          },\n          {\n            \"$\": {\n              \"xsi:type\": \"MonitorIoT:PropertyToDataColumn\",\n              \"id\": \"84\",\n              \"relatesColumn\": \"//@containsEntity.1/@containsComputingNode.0/@containsResource.0/@containsDataTable.1/@composedOfDataColumn.1\",\n              \"relatesSpecificProperty\": \"//@containsEntity.1/@containsSubPhysicalEntity.2/@hasProperty.1\"\n            }\n          },\n          {\n            \"$\": {\n              \"xsi:type\": \"MonitorIoT:PropertyToDataColumn\",\n              \"id\": \"85\",\n              \"relatesColumn\": \"//@containsEntity.1/@containsComputingNode.0/@containsResource.0/@containsDataTable.1/@composedOfDataColumn.2\",\n              \"relatesSpecificProperty\": \"//@containsEntity.1/@containsSubPhysicalEntity.2/@containsComputingNode.1/@hasProperty.0\"\n            }\n          }\n        ]\n      },\n      {\n        \"$\": {\n          \"id\": \"86\",\n          \"description\": \"Flujo de recolección de frecuencia cardiaca del paciente\",\n          \"isSupported\": \"//@containsLink.9 //@containsLink.10 //@containsLink.11 //@containsLink.12 //@containsLink.13\",\n          \"unitOfTime\": \"Minute\",\n          \"flowExecutionTimeInterval\": \"30\"\n        },\n        \"containsDataMappingRule\": [\n          {\n            \"$\": {\n              \"xsi:type\": \"MonitorIoT:PropertyToDataColumn\",\n              \"id\": \"87\",\n              \"relatesColumn\": \"//@containsEntity.1/@containsComputingNode.0/@containsResource.0/@containsDataTable.3/@composedOfDataColumn.0\",\n              \"relatesSpecificProperty\": \"//@containsEntity.1/@containsSubPhysicalEntity.3/@hasProperty.1\"\n            }\n          },\n          {\n            \"$\": {\n              \"xsi:type\": \"MonitorIoT:PropertyToDataColumn\",\n              \"id\": \"88\",\n              \"relatesColumn\": \"//@containsEntity.1/@containsComputingNode.0/@containsResource.0/@containsDataTable.2/@composedOfDataColumn.1\",\n              \"relatesSpecificProperty\": \"//@containsEntity.1/@containsSubPhysicalEntity.3/@hasProperty.2\"\n            }\n          }\n        ]\n      },\n      {\n        \"$\": {\n          \"id\": \"89\",\n          \"description\": \"Flujo de agregación que obtiene el promedio diario de la frecuencia cardiaca de un paciente\",\n          \"isSupported\": \"//@containsLink.14 //@containsLink.15\",\n          \"dataFlowType\": \"DataAggregationFlow\",\n          \"unitOfTime\": \"Day\",\n          \"flowExecutionTimeInterval\": \"1\"\n        },\n        \"containsDataMappingRule\": [\n          {\n            \"$\": {\n              \"xsi:type\": \"MonitorIoT:DataColumnToDataColumn\",\n              \"id\": \"90\",\n              \"aggregationOperation\": \"Sum\",\n              \"relatesSourceColumn\": \"//@containsEntity.1/@containsComputingNode.0/@containsResource.0/@containsDataTable.3/@composedOfDataColumn.0\",\n              \"relatesDestinationColumn\": \"//@containsEntity.0/@containsResource.0/@containsDataTable.0/@composedOfDataColumn.0\",\n              \"groupBy\": \"HumanUserId\"\n            }\n          }\n        ]\n      },\n      {\n        \"$\": {\n          \"id\": \"92\",\n          \"description\": \"Flujo de datos de la localización del usuario.\",\n          \"isSupported\": \"//@containsLink.16 //@containsLink.17 //@containsLink.18 //@containsLink.19 //@containsLink.20 //@containsLink.21\",\n          \"communicationType\": \"Synchronous\",\n          \"unitOfTime\": \"Minute\",\n          \"flowExecutionTimeInterval\": \"10\"\n        },\n        \"containsDataMappingRule\": [\n          {\n            \"$\": {\n              \"xsi:type\": \"MonitorIoT:PropertyToDataColumn\",\n              \"id\": \"92\",\n              \"relatesColumn\": \"//@containsEntity.1/@containsComputingNode.0/@containsResource.0/@containsDataTable.2/@composedOfDataColumn.0\",\n              \"relatesSpecificProperty\": \"//@containsEntity.1/@containsSubPhysicalEntity.3/@hasProperty.0\"\n            }\n          },\n          {\n            \"$\": {\n              \"xsi:type\": \"MonitorIoT:PropertyToDataColumn\",\n              \"id\": \"93\",\n              \"relatesColumn\": \"//@containsEntity.1/@containsComputingNode.0/@containsResource.0/@containsDataTable.3/@composedOfDataColumn.1\",\n              \"relatesSpecificProperty\": \"//@containsEntity.1/@containsSubPhysicalEntity.3/@hasProperty.2\"\n            }\n          }\n        ]\n      }\n    ],\n    \"containsLink\": [\n      {\n        \"$\": {\n          \"xsi:type\": \"MonitorIoT:LinkAPIToIoTDevice\",\n          \"supports\": \"//@containsDataFlow.0\",\n          \"id\": \"94\",\n          \"linksIoTDevice\": \"//@containsEntity.1/@containsSubPhysicalEntity.0/@containsComputingNode.1\",\n          \"linksAPI\": \"//@containsEntity.1/@containsComputingNode.1/@containsResource.1\"\n        }\n      },\n      {\n        \"$\": {\n          \"xsi:type\": \"MonitorIoT:LinkAppToAPI\",\n          \"supports\": \"//@containsDataFlow.0 //@containsDataFlow.1\",\n          \"previousLink\": \"//@containsLink.0\",\n          \"id\": \"95\",\n          \"linksAPI\": \"//@containsEntity.1/@containsComputingNode.1/@containsResource.1\",\n          \"linksApp\": \"//@containsEntity.1/@containsComputingNode.1/@containsResource.0\"\n        }\n      },\n      {\n        \"$\": {\n          \"xsi:type\": \"MonitorIoT:LinkAppToService\",\n          \"supports\": \"//@containsDataFlow.0 //@containsDataFlow.1\",\n          \"previousLink\": \"//@containsLink.1\",\n          \"id\": \"96\",\n          \"linksApp\": \"//@containsEntity.1/@containsComputingNode.1/@containsResource.0\",\n          \"linksService\": \"//@containsEntity.1/@containsComputingNode.0/@containsResource.1/@containsService.0\"\n        }\n      },\n      {\n        \"$\": {\n          \"xsi:type\": \"MonitorIoT:LinkServiceToDataTable\",\n          \"supports\": \"//@containsDataFlow.0 //@containsDataFlow.1\",\n          \"previousLink\": \"//@containsLink.2\",\n          \"id\": \"97\",\n          \"linkService\": \"//@containsEntity.1/@containsComputingNode.0/@containsResource.1/@containsService.0\",\n          \"linksDataTable\": \"//@containsEntity.1/@containsComputingNode.0/@containsResource.0/@containsDataTable.0\",\n          \"type\": \"Insert\"\n        }\n      },\n      {\n        \"$\": {\n          \"xsi:type\": \"MonitorIoT:LinkAPIToIoTDevice\",\n          \"supports\": \"//@containsDataFlow.1\",\n          \"id\": \"98\",\n          \"linksIoTDevice\": \"//@containsEntity.1/@containsSubPhysicalEntity.1/@containsComputingNode.1\",\n          \"linksAPI\": \"//@containsEntity.1/@containsComputingNode.1/@containsResource.1\"\n        }\n      },\n      {\n        \"$\": {\n          \"xsi:type\": \"MonitorIoT:LinkAPIToIoTDevice\",\n          \"supports\": \"//@containsDataFlow.2\",\n          \"id\": \"99\",\n          \"linksIoTDevice\": \"//@containsEntity.1/@containsSubPhysicalEntity.2/@containsComputingNode.1\",\n          \"linksAPI\": \"//@containsEntity.1/@containsComputingNode.1/@containsResource.2\"\n        }\n      },\n      {\n        \"$\": {\n          \"xsi:type\": \"MonitorIoT:LinkAppToAPI\",\n          \"supports\": \"//@containsDataFlow.2\",\n          \"previousLink\": \"//@containsLink.5\",\n          \"id\": \"100\",\n          \"linksAPI\": \"//@containsEntity.1/@containsComputingNode.1/@containsResource.2\",\n          \"linksApp\": \"//@containsEntity.1/@containsComputingNode.1/@containsResource.0\"\n        }\n      },\n      {\n        \"$\": {\n          \"xsi:type\": \"MonitorIoT:LinkAppToService\",\n          \"supports\": \"//@containsDataFlow.2\",\n          \"previousLink\": \"//@containsLink.6\",\n          \"id\": \"101\",\n          \"linksApp\": \"//@containsEntity.1/@containsComputingNode.1/@containsResource.0\",\n          \"linksService\": \"//@containsEntity.1/@containsComputingNode.0/@containsResource.1/@containsService.2\"\n        }\n      },\n      {\n        \"$\": {\n          \"xsi:type\": \"MonitorIoT:LinkServiceToDataTable\",\n          \"supports\": \"//@containsDataFlow.2\",\n          \"previousLink\": \"//@containsLink.7\",\n          \"id\": \"102\",\n          \"linkService\": \"//@containsEntity.1/@containsComputingNode.0/@containsResource.1/@containsService.2\",\n          \"linksDataTable\": \"//@containsEntity.1/@containsComputingNode.0/@containsResource.0/@containsDataTable.1\",\n          \"type\": \"Insert\"\n        }\n      },\n      {\n        \"$\": {\n          \"xsi:type\": \"MonitorIoT:LinkAPIToIoTDevice\",\n          \"supports\": \"//@containsDataFlow.3\",\n          \"id\": \"103\",\n          \"linksIoTDevice\": \"//@containsEntity.1/@containsSubPhysicalEntity.3/@containsSubPhysicalEntity.1/@containsComputingNode.1\",\n          \"linksAPI\": \"//@containsEntity.1/@containsSubPhysicalEntity.3/@containsSubPhysicalEntity.1/@containsComputingNode.0/@containsResource.1\"\n        }\n      },\n      {\n        \"$\": {\n          \"xsi:type\": \"MonitorIoT:LinkAppToAPI\",\n          \"supports\": \"//@containsDataFlow.3\",\n          \"previousLink\": \"//@containsLink.9\",\n          \"id\": \"104\",\n          \"linksAPI\": \"//@containsEntity.1/@containsSubPhysicalEntity.3/@containsSubPhysicalEntity.1/@containsComputingNode.0/@containsResource.1\",\n          \"linksApp\": \"//@containsEntity.1/@containsSubPhysicalEntity.3/@containsSubPhysicalEntity.1/@containsComputingNode.0/@containsResource.0\"\n        }\n      },\n      {\n        \"$\": {\n          \"xsi:type\": \"MonitorIoT:LinkAppToBroker\",\n          \"supports\": \"//@containsDataFlow.3\",\n          \"previousLink\": \"//@containsLink.10\",\n          \"id\": \"105\",\n          \"linksApp\": \"//@containsEntity.1/@containsSubPhysicalEntity.3/@containsSubPhysicalEntity.1/@containsComputingNode.0/@containsResource.0\",\n          \"linksBroker\": \"//@containsEntity.1/@containsComputingNode.0/@containsResource.2\",\n          \"transfers\": \"//@containsEntity.1/@containsComputingNode.0/@containsResource.2/@containsTopic.0\"\n        }\n      },\n      {\n        \"$\": {\n          \"xsi:type\": \"MonitorIoT:LinkServiceToBroker\",\n          \"supports\": \"//@containsDataFlow.3\",\n          \"previousLink\": \"//@containsLink.11\",\n          \"id\": \"106\",\n          \"linksBroker\": \"//@containsEntity.1/@containsComputingNode.0/@containsResource.2\",\n          \"linksService\": \"//@containsEntity.1/@containsComputingNode.0/@containsResource.1/@containsService.4\",\n          \"transfers\": \"//@containsEntity.1/@containsComputingNode.0/@containsResource.2/@containsTopic.0\",\n          \"type\": \"Pull\"\n        }\n      },\n      {\n        \"$\": {\n          \"xsi:type\": \"MonitorIoT:LinkServiceToDataTable\",\n          \"supports\": \"//@containsDataFlow.3\",\n          \"previousLink\": \"//@containsLink.12\",\n          \"id\": \"107\",\n          \"linkService\": \"//@containsEntity.1/@containsComputingNode.0/@containsResource.1/@containsService.4\",\n          \"linksDataTable\": \"//@containsEntity.1/@containsComputingNode.0/@containsResource.0/@containsDataTable.3\",\n          \"type\": \"Insert\"\n        }\n      },\n      {\n        \"$\": {\n          \"xsi:type\": \"MonitorIoT:LinkServiceToDataTable\",\n          \"supports\": \"//@containsDataFlow.4\",\n          \"id\": \"108\",\n          \"linkService\": \"//@containsEntity.1/@containsComputingNode.0/@containsResource.1/@containsService.5\",\n          \"linksDataTable\": \"//@containsEntity.1/@containsComputingNode.0/@containsResource.0/@containsDataTable.3\"\n        }\n      },\n      {\n        \"$\": {\n          \"xsi:type\": \"MonitorIoT:LinkServiceToDataTable\",\n          \"supports\": \"//@containsDataFlow.4\",\n          \"previousLink\": \"//@containsLink.14\",\n          \"id\": \"109\",\n          \"linkService\": \"//@containsEntity.1/@containsComputingNode.0/@containsResource.1/@containsService.5\",\n          \"linksDataTable\": \"//@containsEntity.0/@containsResource.0/@containsDataTable.0\",\n          \"type\": \"Insert\"\n        }\n      },\n      {\n        \"$\": {\n          \"xsi:type\": \"MonitorIoT:LinkAPIToIoTDevice\",\n          \"supports\": \"//@containsDataFlow.5\",\n          \"id\": \"110\",\n          \"linksIoTDevice\": \"//@containsEntity.1/@containsSubPhysicalEntity.0/@containsComputingNode.0\",\n          \"linksAPI\": \"//@containsEntity.1/@containsSubPhysicalEntity.3/@containsSubPhysicalEntity.0/@containsComputingNode.0/@containsResource.1\"\n        }\n      },\n      {\n        \"$\": {\n          \"xsi:type\": \"MonitorIoT:LinkAPIToIoTDevice\",\n          \"supports\": \"//@containsDataFlow.5\",\n          \"id\": \"111\",\n          \"linksIoTDevice\": \"//@containsEntity.1/@containsSubPhysicalEntity.1/@containsComputingNode.0\",\n          \"linksAPI\": \"//@containsEntity.1/@containsSubPhysicalEntity.3/@containsSubPhysicalEntity.0/@containsComputingNode.0/@containsResource.1\"\n        }\n      },\n      {\n        \"$\": {\n          \"xsi:type\": \"MonitorIoT:LinkAPIToIoTDevice\",\n          \"supports\": \"//@containsDataFlow.5\",\n          \"id\": \"112\",\n          \"linksIoTDevice\": \"//@containsEntity.1/@containsSubPhysicalEntity.2/@containsComputingNode.0\",\n          \"linksAPI\": \"//@containsEntity.1/@containsSubPhysicalEntity.3/@containsSubPhysicalEntity.0/@containsComputingNode.0/@containsResource.1\"\n        }\n      },\n      {\n        \"$\": {\n          \"xsi:type\": \"MonitorIoT:LinkAppToAPI\",\n          \"supports\": \"//@containsDataFlow.5\",\n          \"previousLink\": \"//@containsLink.16 //@containsLink.17 //@containsLink.18\",\n          \"id\": \"113\",\n          \"linksAPI\": \"//@containsEntity.1/@containsSubPhysicalEntity.3/@containsSubPhysicalEntity.0/@containsComputingNode.0/@containsResource.1\",\n          \"linksApp\": \"//@containsEntity.1/@containsSubPhysicalEntity.3/@containsSubPhysicalEntity.0/@containsComputingNode.0/@containsResource.0\"\n        }\n      },\n      {\n        \"$\": {\n          \"xsi:type\": \"MonitorIoT:LinkAppToService\",\n          \"supports\": \"//@containsDataFlow.5\",\n          \"previousLink\": \"//@containsLink.19\",\n          \"id\": \"114\",\n          \"linksApp\": \"//@containsEntity.1/@containsSubPhysicalEntity.3/@containsSubPhysicalEntity.0/@containsComputingNode.0/@containsResource.0\",\n          \"linksService\": \"//@containsEntity.1/@containsComputingNode.0/@containsResource.1/@containsService.1\"\n        }\n      },\n      {\n        \"$\": {\n          \"xsi:type\": \"MonitorIoT:LinkServiceToDataTable\",\n          \"supports\": \"//@containsDataFlow.5\",\n          \"previousLink\": \"//@containsLink.20\",\n          \"id\": \"115\",\n          \"linkService\": \"//@containsEntity.1/@containsComputingNode.0/@containsResource.1/@containsService.1\",\n          \"linksDataTable\": \"//@containsEntity.1/@containsComputingNode.0/@containsResource.0/@containsDataTable.2\",\n          \"type\": \"Insert\"\n        }\n      }\n    ],\n    \"containsEntityCategory\": [\n      {\n        \"$\": {\n          \"id\": \"116\",\n          \"name\": \"Room\",\n          \"description\": \"Habitación de una casa\",\n          \"groups\": \"//@containsEntity.1/@containsSubPhysicalEntity.0 //@containsEntity.1/@containsSubPhysicalEntity.1 //@containsEntity.1/@containsSubPhysicalEntity.2\"\n        },\n        \"hasPropertyTemplate\": [\n          {\n            \"$\": {\n              \"id\": \"117\",\n              \"name\": \"Temperature\",\n              \"definition\": \"Temperatura de una habitación\",\n              \"isParticularized\": \"//@containsEntity.1/@containsSubPhysicalEntity.0/@hasProperty.0 //@containsEntity.1/@containsSubPhysicalEntity.1/@hasProperty.0\",\n              \"isReturned\": \"//@containsEntity.1/@containsComputingNode.1/@containsResource.1/@containsReturnVariable.0\",\n              \"isReceived\": \"//@containsEntity.1/@containsComputingNode.0/@containsResource.1/@containsService.0/@containsParameter.0\",\n              \"propertyType\": \"Telemetry\",\n              \"dataType\": \"Float\"\n            }\n          },\n          {\n            \"$\": {\n              \"id\": \"118\",\n              \"name\": \"Humidity\",\n              \"definition\": \"Humedad de una habitación\",\n              \"isParticularized\": \"//@containsEntity.1/@containsSubPhysicalEntity.0/@hasProperty.1 //@containsEntity.1/@containsSubPhysicalEntity.1/@hasProperty.1\",\n              \"isReturned\": \"//@containsEntity.1/@containsComputingNode.1/@containsResource.1/@containsReturnVariable.1\",\n              \"isReceived\": \"//@containsEntity.1/@containsComputingNode.0/@containsResource.1/@containsService.0/@containsParameter.1\",\n              \"propertyType\": \"Telemetry\",\n              \"dataType\": \"Float\"\n            }\n          },\n          {\n            \"$\": {\n              \"id\": \"119\",\n              \"name\": \"Co\",\n              \"definition\": \"Detecta el Co de una habitación\",\n              \"isParticularized\": \"//@containsEntity.1/@containsSubPhysicalEntity.2/@hasProperty.0 //@containsEntity.1/@containsSubPhysicalEntity.2/@hasProperty.1\",\n              \"isReturned\": \"//@containsEntity.1/@containsComputingNode.1/@containsResource.2/@containsReturnVariable.0\",\n              \"dataType\": \"Float\"\n            }\n          },\n          {\n            \"$\": {\n              \"id\": \"120\",\n              \"name\": \"Smoke\",\n              \"definition\": \"Detecta el humo de una habitación\",\n              \"isReturned\": \"//@containsEntity.1/@containsComputingNode.1/@containsResource.2/@containsReturnVariable.1\"\n            }\n          }\n        ]\n      },\n      {\n        \"$\": {\n          \"id\": \"121\",\n          \"name\": \"DHT11Sensor\",\n          \"description\": \"Tipo de sensor DHT11 para recuperar la humedad y temperatura de una habitación\",\n          \"groups\": \"//@containsEntity.1/@containsSubPhysicalEntity.1/@containsComputingNode.1 //@containsEntity.1/@containsSubPhysicalEntity.0/@containsComputingNode.1\"\n        },\n        \"hasPropertyTemplate\": [\n          {\n            \"$\": {\n              \"id\": \"122\",\n              \"name\": \"SensorId\",\n              \"definition\": \"Identificación del sensor DHT11\",\n              \"isParticularized\": \"//@containsEntity.1/@containsSubPhysicalEntity.0/@containsComputingNode.1/@hasProperty.0 //@containsEntity.1/@containsSubPhysicalEntity.1/@containsComputingNode.1/@hasProperty.0\",\n              \"isReceived\": \"//@containsEntity.1/@containsComputingNode.1/@containsResource.1/@containsParameter.0\",\n              \"identifier\": \"true\",\n              \"dataType\": \"String\",\n              \"assignedAtDesignTime\": \"true\"\n            }\n          }\n        ]\n      },\n      {\n        \"$\": {\n          \"id\": \"123\",\n          \"name\": \"Patient\",\n          \"description\": \"Paciente que vive en la casa\",\n          \"groups\": \"//@containsEntity.1/@containsSubPhysicalEntity.3 //@containsEntity.1/@containsSubPhysicalEntity.3/@containsSubPhysicalEntity.1/@containsComputingNode.1\"\n        },\n        \"hasPropertyTemplate\": [\n          {\n            \"$\": {\n              \"id\": \"124\",\n              \"name\": \"LocationId\",\n              \"definition\": \"Localización del paciente\",\n              \"isParticularized\": \"//@containsEntity.1/@containsSubPhysicalEntity.3/@hasProperty.0\",\n              \"isReturned\": \"//@containsEntity.1/@containsSubPhysicalEntity.3/@containsSubPhysicalEntity.0/@containsComputingNode.0/@containsResource.1/@containsReturnVariable.0\",\n              \"propertyType\": \"Telemetry\"\n            }\n          },\n          {\n            \"$\": {\n              \"id\": \"125\",\n              \"name\": \"HeartRate\",\n              \"definition\": \"Ritmo cardiaco del paciente\",\n              \"isParticularized\": \"//@containsEntity.1/@containsSubPhysicalEntity.3/@hasProperty.1\",\n              \"isReturned\": \"//@containsEntity.1/@containsSubPhysicalEntity.3/@containsSubPhysicalEntity.1/@containsComputingNode.0/@containsResource.1/@containsReturnVariable.0\",\n              \"propertyType\": \"Telemetry\"\n            }\n          },\n          {\n            \"$\": {\n              \"id\": \"126\",\n              \"name\": \"UserId\",\n              \"definition\": \"Identificacion del usuario\",\n              \"isParticularized\": \"//@containsEntity.1/@containsSubPhysicalEntity.3/@hasProperty.2\",\n              \"isReceived\": \"//@containsEntity.1/@containsSubPhysicalEntity.3/@containsSubPhysicalEntity.1/@containsComputingNode.0/@containsResource.1/@containsParameter.0\",\n              \"identifier\": \"true\",\n              \"dataType\": \"String\"\n            }\n          }\n        ]\n      },\n      {\n        \"$\": {\n          \"id\": \"127\",\n          \"name\": \"Co&SmokeSensor\",\n          \"description\": \"Tipo de sensor para detectar Co y humo\",\n          \"groups\": \"//@containsEntity.1/@containsSubPhysicalEntity.2/@containsComputingNode.1\"\n        },\n        \"hasPropertyTemplate\": [\n          {\n            \"$\": {\n              \"id\": \"128\",\n              \"name\": \"SensorId\",\n              \"definition\": \"Identificador del sensor\",\n              \"isParticularized\": \"//@containsEntity.1/@containsSubPhysicalEntity.2/@containsComputingNode.1/@hasProperty.0\",\n              \"isReceived\": \"//@containsEntity.1/@containsComputingNode.1/@containsResource.2/@containsParameter.0\",\n              \"identifier\": \"true\"\n            }\n          }\n        ]\n      }\n    ],\n    \"containsProtocol\": [\n      {\n        \"$\": {\n          \"isUsedByMiddleware\": \"//@containsEntity.1/@containsComputingNode.0/@containsResource.1 //@containsEntity.0/@containsResource.1\",\n          \"isUsedByNetwork\": \"//@containsEntity.2 //@containsEntity.4\",\n          \"name\": \"HTTP\",\n          \"port\": \"80\"\n        }\n      },\n      {\n        \"$\": {\n          \"isUsedByMiddleware\": \"//@containsEntity.1/@containsComputingNode.0/@containsResource.2\",\n          \"isUsedByNetwork\": \"//@containsEntity.4\",\n          \"name\": \"MQTT\",\n          \"port\": \"8083\"\n        }\n      },\n      {\n        \"$\": {\n          \"isUsedByDataStore\": \"//@containsEntity.0/@containsResource.0 //@containsEntity.1/@containsComputingNode.0/@containsResource.0\",\n          \"isUsedByNetwork\": \"//@containsEntity.4 //@containsEntity.2\",\n          \"name\": \"Postgresql\",\n          \"port\": \"5432\"\n        }\n      }\n    ]\n  }\n}',30);
/*!40000 ALTER TABLE `modeloautoconsciencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `objetivo`
--

DROP TABLE IF EXISTS `objetivo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `objetivo` (
  `obj_id` int(11) NOT NULL AUTO_INCREMENT,
  `obj_nombre` varchar(100) NOT NULL,
  `obj_descripcion` varchar(1000) DEFAULT NULL,
  `obj_peso` float NOT NULL,
  `obj_operacion_agregacion` varchar(45) NOT NULL,
  `obj_padre` int(11) DEFAULT NULL,
  `obj_activo` int(11) NOT NULL,
  `cd_id` int(11) NOT NULL,
  `suj_id` int(11) NOT NULL,
  `ma_id` int(11) NOT NULL,
  PRIMARY KEY (`obj_id`),
  KEY `objetivo_criterio_idx` (`cd_id`),
  KEY `objetivo_sujeto_idx` (`suj_id`),
  KEY `objetivo_modelo_idx` (`ma_id`),
  KEY `objetivo_padre_idx` (`obj_padre`),
  CONSTRAINT `objetivo_criterio` FOREIGN KEY (`cd_id`) REFERENCES `criteriodecision` (`cd_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `objetivo_modelo` FOREIGN KEY (`ma_id`) REFERENCES `sujeto` (`ma_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `objetivo_padre` FOREIGN KEY (`obj_padre`) REFERENCES `objetivo` (`obj_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `objetivo_sujeto` FOREIGN KEY (`suj_id`) REFERENCES `sujeto` (`suj_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `objetivo`
--

LOCK TABLES `objetivo` WRITE;
/*!40000 ALTER TABLE `objetivo` DISABLE KEYS */;
INSERT INTO `objetivo` VALUES (4,'OBJETIVO1','ES UN OBJ',12,'31',NULL,1,11,74,37);
/*!40000 ALTER TABLE `objetivo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `objeto`
--

DROP TABLE IF EXISTS `objeto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `objeto` (
  `obj_id` int(11) NOT NULL AUTO_INCREMENT,
  `ma_id` int(11) NOT NULL,
  `obj_tipo` varchar(100) NOT NULL,
  `obj_nombre` varchar(100) NOT NULL,
  `obj_padre` int(11) DEFAULT NULL,
  `obj_activo` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`obj_id`,`ma_id`),
  KEY `modelo_objeto_idx` (`ma_id`),
  CONSTRAINT `modelo_objeto` FOREIGN KEY (`ma_id`) REFERENCES `modeloautoconsciencia` (`ma_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=656 DEFAULT CHARSET=utf8mb4 COMMENT='	';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `objeto`
--

LOCK TABLES `objeto` WRITE;
/*!40000 ALTER TABLE `objeto` DISABLE KEYS */;
INSERT INTO `objeto` VALUES (1,37,'CloudNode','GoogleCloudPlatform',NULL,0),(2,37,'DataBase','GlobalPostgreSQLServer',1,0),(3,37,'Middleware','GlobalExpressServer',1,0),(5,37,'NetworkInterface','OpticalFiberConnection',1,0),(6,37,'PhysicalEntity','House',NULL,1),(7,37,'FogNode','LocalAdministrationServer',6,0),(8,37,'DataBase','LocalPostgreSQLServer',7,0),(9,37,'Middleware','LocalExpressServer',7,0),(16,37,'Broker','Mosquitto',7,0),(18,37,'NetworkInterface','WifiConnection',7,0),(19,37,'IoTGateway','RaspberryPi3',6,0),(20,37,'Application','EnvironmentController',19,0),(21,37,'API','Co&SmokeSensor',19,0),(22,37,'API','AirConditioningActuator',19,0),(23,37,'NetworkInterface','BluetoothConnection',19,0),(24,37,'NetworkInterface','WifiConnection',19,0),(25,37,'PhysicalEntity','Livingroom',6,1),(28,37,'Tag','Beacon1',25,0),(29,37,'NetworkInterface','BluetoothConnection',28,0),(30,37,'Sensor','DHT11_1',25,0),(32,37,'NetworkInterface','BluetoothConnection',30,0),(33,37,'Actuator','AirConditioning1',25,0),(35,37,'NetworkInterface','BluetoothConnection',33,0),(36,37,'PhysicalEntity','Bedroom',6,1),(39,37,'Tag','Beacon2',36,0),(40,37,'NetworkInterface','BluetoothConnection',39,0),(41,37,'Sensor','DHT11_2',36,0),(43,37,'NetworkInterface','BluetoothConnection',41,0),(44,37,'Actuator','AirConditioning2',36,0),(46,37,'NetworkInterface','BluetoothConnection',44,0),(47,37,'PhysicalEntity','Kitchen',6,1),(50,37,'Tag','Beacon3',47,0),(51,37,'NetworkInterface','BluetoothConnection',50,0),(52,37,'Sensor','Co&Smoke',47,0),(54,37,'NetworkInterface','BluetoothConnection',52,0),(55,37,'PhysicalEntity','Patient',6,1),(59,37,'PhysicalEntity','SmartPhone',55,1),(60,37,'IoTGateway','SmartPhoneGateway',59,0),(61,37,'Application','LocationController',60,0),(62,37,'API','Beacon',60,0),(63,37,'NetworkInterface','BluetoothConnection',60,0),(64,37,'NetworkInterface','WifiConnection',60,0),(65,37,'PhysicalEntity','SmartWatch',55,0),(66,37,'Application','HealthController',655,0),(67,37,'API','HeartRateSensor',655,0),(68,37,'NetworkInterface','WifiConnection',655,0),(69,37,'Sensor','HeartRate1',65,0),(70,37,'Network','Internet',NULL,0),(71,37,'Network','Proximity',NULL,0),(72,37,'Network','LAN',NULL,0),(211,37,'API','DHT11Sensor',19,0),(655,37,'IoTGateway','SmartWatchGateway',65,0);
/*!40000 ALTER TABLE `objeto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parametro`
--

DROP TABLE IF EXISTS `parametro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `parametro` (
  `par_ordinal` int(11) NOT NULL,
  `ri_id` int(11) NOT NULL,
  `par_nombre` varchar(100) NOT NULL,
  `par_tipo_dato` varchar(45) NOT NULL,
  `par_opcional` tinyint(4) NOT NULL,
  `par_activo` varchar(45) NOT NULL,
  PRIMARY KEY (`par_ordinal`,`ri_id`),
  KEY `parametros_recurso_idx` (`ri_id`),
  CONSTRAINT `parametros_recurso` FOREIGN KEY (`ri_id`) REFERENCES `recursoimplementacion` (`ri_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parametro`
--

LOCK TABLES `parametro` WRITE;
/*!40000 ALTER TABLE `parametro` DISABLE KEYS */;
INSERT INTO `parametro` VALUES (1123,3,'aaa','1',1,'1');
/*!40000 ALTER TABLE `parametro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `procesoautoconsciencia`
--

DROP TABLE IF EXISTS `procesoautoconsciencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `procesoautoconsciencia` (
  `pa_id` int(11) NOT NULL AUTO_INCREMENT,
  `pa_nombre` varchar(100) NOT NULL,
  `pa_descripcion` varchar(1000) DEFAULT NULL,
  `pa_tipo` int(11) NOT NULL,
  `pa_inicio_periodo_ejecucion` date DEFAULT NULL,
  `pa_fin_periodo_ejecucion` date DEFAULT NULL,
  `pa_activo` int(11) NOT NULL,
  `aa_id` int(11) NOT NULL,
  `suj_id` int(11) NOT NULL,
  `ma_id` int(11) NOT NULL,
  PRIMARY KEY (`pa_id`),
  KEY `proceso_aspecto_idx` (`aa_id`),
  KEY `proceso_sujeto_idx` (`suj_id`),
  KEY `proceso_modelo_idx` (`ma_id`),
  CONSTRAINT `proceso_aspecto` FOREIGN KEY (`aa_id`) REFERENCES `aspectoautoconsciencia` (`aa_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `proceso_modelo` FOREIGN KEY (`ma_id`) REFERENCES `sujeto` (`ma_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `proceso_sujeto` FOREIGN KEY (`suj_id`) REFERENCES `sujeto` (`suj_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `procesoautoconsciencia`
--

LOCK TABLES `procesoautoconsciencia` WRITE;
/*!40000 ALTER TABLE `procesoautoconsciencia` DISABLE KEYS */;
INSERT INTO `procesoautoconsciencia` VALUES (4,'PID4','ASA',17,NULL,NULL,1,69,74,37);
/*!40000 ALTER TABLE `procesoautoconsciencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `propiedad`
--

DROP TABLE IF EXISTS `propiedad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `propiedad` (
  `pro_id` int(11) NOT NULL AUTO_INCREMENT,
  `ma_id` int(11) NOT NULL,
  `obj_id` int(11) NOT NULL,
  `pro_nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`pro_id`,`ma_id`,`obj_id`),
  KEY `propiedad_modelo_idx` (`ma_id`),
  KEY `propiedad_objeto_idx` (`obj_id`),
  CONSTRAINT `propiedad_modelo` FOREIGN KEY (`ma_id`) REFERENCES `modeloautoconsciencia` (`ma_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `propiedad_objeto` FOREIGN KEY (`obj_id`) REFERENCES `objeto` (`obj_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `propiedad`
--

LOCK TABLES `propiedad` WRITE;
/*!40000 ALTER TABLE `propiedad` DISABLE KEYS */;
INSERT INTO `propiedad` VALUES (26,37,25,'LivingroomTemperature'),(27,37,25,'LivingroomHumidity'),(31,37,30,'DHT11_1SensorId'),(34,37,33,'TemperatureAirConditioning1'),(37,37,36,'BedroomTemperature'),(38,37,36,'BedroomHumidity'),(42,37,41,'DHT11_2SensorId'),(45,37,44,'TemperatureAirConditioning2'),(48,37,47,'KitchenCo'),(49,37,47,'KitchenSmoke'),(53,37,52,'Co&SmokeSensorId'),(56,37,55,'LocationId'),(57,37,55,'HeartRate'),(58,37,55,'UserId');
/*!40000 ALTER TABLE `propiedad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `propiedad_flujodatos`
--

DROP TABLE IF EXISTS `propiedad_flujodatos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `propiedad_flujodatos` (
  `pro_id` int(11) NOT NULL,
  `flu_id` int(11) NOT NULL,
  `ma_id` int(11) NOT NULL,
  `obj_id` int(11) NOT NULL,
  PRIMARY KEY (`pro_id`,`flu_id`,`ma_id`,`obj_id`),
  KEY `propiedad_propiedad_idx` (`pro_id`,`ma_id`,`obj_id`),
  KEY `propiedad_flujo_idx` (`flu_id`,`ma_id`),
  CONSTRAINT `propiedad_flujo` FOREIGN KEY (`flu_id`, `ma_id`) REFERENCES `flujodatos` (`flu_id`, `ma_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `propiedad_propiedad` FOREIGN KEY (`pro_id`, `ma_id`, `obj_id`) REFERENCES `propiedad` (`pro_id`, `ma_id`, `obj_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `propiedad_flujodatos`
--

LOCK TABLES `propiedad_flujodatos` WRITE;
/*!40000 ALTER TABLE `propiedad_flujodatos` DISABLE KEYS */;
INSERT INTO `propiedad_flujodatos` VALUES (26,74,37,25),(27,74,37,25),(31,74,37,30),(37,78,37,36),(38,78,37,36),(42,78,37,41),(48,82,37,47),(49,82,37,47),(53,82,37,52),(57,86,37,55),(58,86,37,55),(56,92,37,55),(58,92,37,55);
/*!40000 ALTER TABLE `propiedad_flujodatos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recursoimplementacion`
--

DROP TABLE IF EXISTS `recursoimplementacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `recursoimplementacion` (
  `ri_id` int(11) NOT NULL AUTO_INCREMENT,
  `ri_nombre` varchar(100) NOT NULL,
  `ri_descripcion` varchar(1000) DEFAULT NULL,
  `ri_tipo_recurso` int(11) NOT NULL,
  `ri_tipo_dato_salida` int(11) NOT NULL,
  `ri_activo` int(11) NOT NULL,
  PRIMARY KEY (`ri_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recursoimplementacion`
--

LOCK TABLES `recursoimplementacion` WRITE;
/*!40000 ALTER TABLE `recursoimplementacion` DISABLE KEYS */;
INSERT INTO `recursoimplementacion` VALUES (3,'formualds12','ASSA',0,1,1);
/*!40000 ALTER TABLE `recursoimplementacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicio`
--

DROP TABLE IF EXISTS `servicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `servicio` (
  `ri_id` int(11) NOT NULL,
  `ser_punto_final` varchar(100) NOT NULL,
  `ser_instrucciones` varchar(1000) NOT NULL,
  `ser_pre_existente` int(11) NOT NULL,
  `ser_tipo_formato_dato_salida` int(11) DEFAULT NULL,
  PRIMARY KEY (`ri_id`),
  CONSTRAINT `servicio_recurso` FOREIGN KEY (`ri_id`) REFERENCES `recursoimplementacion` (`ri_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicio`
--

LOCK TABLES `servicio` WRITE;
/*!40000 ALTER TABLE `servicio` DISABLE KEYS */;
/*!40000 ALTER TABLE `servicio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sujeto`
--

DROP TABLE IF EXISTS `sujeto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sujeto` (
  `suj_id` int(11) NOT NULL AUTO_INCREMENT,
  `ma_id` int(11) NOT NULL,
  `suj_nombre` varchar(100) NOT NULL,
  `suj_activo` int(11) NOT NULL DEFAULT '0',
  `suj_padre` int(11) DEFAULT NULL,
  PRIMARY KEY (`suj_id`,`ma_id`),
  KEY `sujeto_modelo_idx` (`ma_id`),
  CONSTRAINT `sujeto_modelo` FOREIGN KEY (`ma_id`) REFERENCES `modeloautoconsciencia` (`ma_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sujeto`
--

LOCK TABLES `sujeto` WRITE;
/*!40000 ALTER TABLE `sujeto` DISABLE KEYS */;
INSERT INTO `sujeto` VALUES (73,37,'EmergencySystem',1,NULL),(74,37,'EnvironmentalControlSubsystem',1,73),(75,37,'HealthSubsystem',1,73);
/*!40000 ALTER TABLE `sujeto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sujeto_objeto`
--

DROP TABLE IF EXISTS `sujeto_objeto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sujeto_objeto` (
  `suj_id` int(11) NOT NULL,
  `obj_id` int(11) NOT NULL,
  `ma_id` int(11) NOT NULL,
  PRIMARY KEY (`suj_id`,`obj_id`,`ma_id`),
  KEY `sujeto_objeto_idx` (`obj_id`,`ma_id`),
  KEY `sujeto_sujeto_idx` (`suj_id`,`ma_id`),
  CONSTRAINT `sujeto_objeto` FOREIGN KEY (`obj_id`, `ma_id`) REFERENCES `objeto` (`obj_id`, `ma_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sujeto_sujeto` FOREIGN KEY (`suj_id`, `ma_id`) REFERENCES `sujeto` (`suj_id`, `ma_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sujeto_objeto`
--

LOCK TABLES `sujeto_objeto` WRITE;
/*!40000 ALTER TABLE `sujeto_objeto` DISABLE KEYS */;
INSERT INTO `sujeto_objeto` VALUES (74,1,37),(75,1,37),(74,2,37),(75,2,37),(74,3,37),(75,3,37),(74,5,37),(75,5,37),(74,6,37),(75,6,37),(74,7,37),(75,7,37),(74,8,37),(75,8,37),(74,9,37),(75,9,37),(75,16,37),(74,18,37),(75,18,37),(74,19,37),(74,20,37),(74,21,37),(74,22,37),(74,23,37),(74,24,37),(74,25,37),(74,28,37),(74,29,37),(74,30,37),(74,32,37),(74,33,37),(74,35,37),(74,36,37),(74,39,37),(74,40,37),(74,41,37),(74,43,37),(74,44,37),(74,46,37),(74,47,37),(74,50,37),(74,51,37),(74,52,37),(74,54,37),(74,55,37),(75,55,37),(74,59,37),(74,60,37),(74,61,37),(74,62,37),(74,63,37),(74,64,37),(75,65,37),(75,66,37),(75,67,37),(75,68,37),(75,69,37),(74,70,37),(75,70,37),(74,71,37),(74,72,37),(75,72,37),(74,211,37),(75,655,37);
/*!40000 ALTER TABLE `sujeto_objeto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `umbral`
--

DROP TABLE IF EXISTS `umbral`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `umbral` (
  `umb_id` int(11) NOT NULL AUTO_INCREMENT,
  `umb_nombre` varchar(100) NOT NULL,
  `umb_interpretacion` varchar(120) NOT NULL,
  `umb_inferior` float NOT NULL,
  `umb_superior` float NOT NULL,
  `umb_activo` int(11) NOT NULL,
  `cd_id` int(11) NOT NULL,
  PRIMARY KEY (`umb_id`),
  KEY `umbral_criterio_idx` (`cd_id`),
  CONSTRAINT `umbral_criterio` FOREIGN KEY (`cd_id`) REFERENCES `criteriodecision` (`cd_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `umbral`
--

LOCK TABLES `umbral` WRITE;
/*!40000 ALTER TABLE `umbral` DISABLE KEYS */;
INSERT INTO `umbral` VALUES (1,'NIVEL DE BATERIA','BAJA',15,100,1,12);
/*!40000 ALTER TABLE `umbral` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unidadmedicion`
--

DROP TABLE IF EXISTS `unidadmedicion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `unidadmedicion` (
  `um_id` int(11) NOT NULL AUTO_INCREMENT,
  `um_nombre` varchar(100) DEFAULT NULL,
  `um_descripcion` varchar(1000) DEFAULT NULL,
  `um_acronimo` varchar(45) NOT NULL,
  `um_activo` int(11) DEFAULT '1',
  PRIMARY KEY (`um_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unidadmedicion`
--

LOCK TABLES `unidadmedicion` WRITE;
/*!40000 ALTER TABLE `unidadmedicion` DISABLE KEYS */;
INSERT INTO `unidadmedicion` VALUES (1,'VATIOS','PARA DESCRIBIR EL ESTADO DE LA BATERIA','WH',1);
/*!40000 ALTER TABLE `unidadmedicion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `usr_id` int(11) NOT NULL AUTO_INCREMENT,
  `usr_nombre` varchar(100) NOT NULL,
  `usr_descripcion` varchar(1000) DEFAULT NULL,
  `usr_correo` varchar(100) NOT NULL,
  `usr_password` varchar(45) NOT NULL,
  PRIMARY KEY (`usr_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (30,'Jaime Panata',NULL,'jaime@ejemplo.com','1234');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `valorsimulacion`
--

DROP TABLE IF EXISTS `valorsimulacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `valorsimulacion` (
  `es_id` int(11) NOT NULL,
  `vs_id` int(11) NOT NULL,
  `vas_valor` float NOT NULL,
  PRIMARY KEY (`es_id`,`vs_id`),
  KEY `variable_valor_idx` (`vs_id`),
  CONSTRAINT `escenario_valor` FOREIGN KEY (`es_id`) REFERENCES `escenariosimulacion` (`es_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `variable_valor` FOREIGN KEY (`vs_id`) REFERENCES `variablesimulacion` (`vs_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `valorsimulacion`
--

LOCK TABLES `valorsimulacion` WRITE;
/*!40000 ALTER TABLE `valorsimulacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `valorsimulacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `variablesimulacion`
--

DROP TABLE IF EXISTS `variablesimulacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `variablesimulacion` (
  `vs_id` int(11) NOT NULL AUTO_INCREMENT,
  `vs_nombre` varchar(100) NOT NULL,
  `vs_activo` int(11) NOT NULL,
  `mea_id` int(11) NOT NULL,
  PRIMARY KEY (`vs_id`),
  KEY `variable_metodo_idx` (`mea_id`),
  CONSTRAINT `variable_metodo` FOREIGN KEY (`mea_id`) REFERENCES `metodocalculo` (`mea_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `variablesimulacion`
--

LOCK TABLES `variablesimulacion` WRITE;
/*!40000 ALTER TABLE `variablesimulacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `variablesimulacion` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-26 20:08:29
