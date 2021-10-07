-- MySQL dump 10.13  Distrib 5.7.33, for Linux (aarch64)
--
-- Host: localhost    Database: db_autoconsciencia_2
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
  `aa_alcance` int(11) NOT NULL,
  `suj_id` int(11) NOT NULL,
  `ma_id` int(11) NOT NULL,
  `aa_operador` int(11) DEFAULT NULL,
  PRIMARY KEY (`aa_id`),
  KEY `aspecto_aspecto_idx` (`ma_id`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aspectoautoconsciencia`
--

LOCK TABLES `aspectoautoconsciencia` WRITE;
/*!40000 ALTER TABLE `aspectoautoconsciencia` DISABLE KEYS */;
/*!40000 ALTER TABLE `aspectoautoconsciencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aspectoautoconsciencia_derivado`
--

DROP TABLE IF EXISTS `aspectoautoconsciencia_derivado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aspectoautoconsciencia_derivado` (
  `aad_id` int(11) NOT NULL AUTO_INCREMENT,
  `aad_padre` int(11) NOT NULL,
  `aad_hijo` int(11) NOT NULL,
  PRIMARY KEY (`aad_id`)
) ENGINE=InnoDB AUTO_INCREMENT=139 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aspectoautoconsciencia_derivado`
--

LOCK TABLES `aspectoautoconsciencia_derivado` WRITE;
/*!40000 ALTER TABLE `aspectoautoconsciencia_derivado` DISABLE KEYS */;
/*!40000 ALTER TABLE `aspectoautoconsciencia_derivado` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `criteriodecision`
--

LOCK TABLES `criteriodecision` WRITE;
/*!40000 ALTER TABLE `criteriodecision` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enumeracion`
--

LOCK TABLES `enumeracion` WRITE;
/*!40000 ALTER TABLE `enumeracion` DISABLE KEYS */;
INSERT INTO `enumeracion` VALUES (1,'TIPO_DATO_SALIDA','BYTE',1),(2,'TIPO_DATO_SALIDA','INTEGER',2),(3,'TIPO_FORMATO','JSON',1),(4,'TIPO_FORMATO','XMI',2),(5,'TIPO_ASPECTO','ESTADO_ACTUAL',1),(6,'TIPO_ASPECTO','PREDICCION',2),(8,'TIPO_COMUNICACION','SÍNCRONA',1),(9,'TIPO_COMUNICACION','ASÍNCRONA',2),(10,'TIPO_METRICA','DIRECTA',1),(11,'TIPO_METRICA','INDIRECTA',2),(12,'TIPO_METRICA','INDICADOR',3),(15,'TIPO_OPERADOR_ASIGNACION','C',1),(16,'TIPO_OPERADOR_ASIGNACION','C++',2),(17,'TIPO_PROCESO','PRE-REFLEXIVO',1),(18,'TIPO_PROCESO','REFLEXIVO',2),(19,'TIPO_RECOLECCION','UNICAMENTE OBJETO SELECCIONADO',1),(20,'TIPO_RECOLECCION','TODOS LOS OBJETOS DE LA MISMA CATEGORIA',2),(21,'TIPO_METODO','METODO DE RECOLECCION DE DATOS',1),(22,'TIPO_METODO','MODELO ANALISIS',2),(23,'TIPO_METODO','METODO CALCULO',3),(24,'TIPO_METRICA_METODO','VARIABLE SIMULACION',4),(25,'TIPO_METRICA_METODO','METADATA',5),(26,'TIPO_ESCALA','ORDINAL',1),(27,'TIPO_ESCALA','NOMINAL',2),(28,'TIPO_ESCALA','INTERVALO',3),(29,'TIPO_PERSPECTIVA','POSITIVA',1),(30,'TIPO_PERSPECTIVA','NEGATIVA',2),(31,'TIPO_OPERADOR_ASIGNACION','C+',1),(32,'TIPO_OPERADOR_ASIGNACION','C+-',1),(33,'TIPO_OPERADOR_ASIGNACION','CA',2),(34,'TIPO_OPERADOR_ASIGNACION','C-+',3),(35,'TIPO_OPERADOR_ASIGNACION','C-',4),(36,'TIPO_OPERADOR_ASIGNACION','C--',5),(37,'TIPO_OPERADOR_ASIGNACION','A',6),(38,'TIPO_OPERADOR_ASIGNACION','D--',7),(39,'TIPO_OPERADOR_ASIGNACION','D-',8),(40,'TIPO_OPERADOR_ASIGNACION','D-+',9),(41,'TIPO_OPERADOR_ASIGNACION','DA',10),(42,'TIPO_OPERADOR_ASIGNACION','D+-',11),(43,'TIPO_OPERADOR_ASIGNACION','D+',12),(44,'TIPO_OPERADOR_ASIGNACION','D++',13),(45,'TIPO_OPERADOR_ASIGNACION','D',14),(46,'TIPO_ESCALA','RATIO',1),(47,'TIPO_DATO_SALIDA','FLOAT',1),(48,'TIPO_VACIO','NULL',NULL),(49,'TIPO_TIEMPO','HORA',1),(50,'TIPO_TIEMPO','MINUTOS',2),(51,'TIPO_EJECUCION','PREDEFINIDO',1),(52,'TIPO_EJECUCION','AUTOMATICO',2),(53,'ASPECTO_DIF','INDIVIDUAL',1),(54,'ASPECTO_DIF','COLECTIVO',2);
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `escala`
--

LOCK TABLES `escala` WRITE;
/*!40000 ALTER TABLE `escala` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COMMENT='	';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metrica`
--

LOCK TABLES `metrica` WRITE;
/*!40000 ALTER TABLE `metrica` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modeloautoconsciencia`
--

LOCK TABLES `modeloautoconsciencia` WRITE;
/*!40000 ALTER TABLE `modeloautoconsciencia` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `objetivo`
--

LOCK TABLES `objetivo` WRITE;
/*!40000 ALTER TABLE `objetivo` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=151001 DEFAULT CHARSET=utf8mb4 COMMENT='	';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `objeto`
--

LOCK TABLES `objeto` WRITE;
/*!40000 ALTER TABLE `objeto` DISABLE KEYS */;
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
  `pa_tipo_ejecucion` int(11) NOT NULL,
  `pa_unidad_tiempo` int(11) DEFAULT NULL,
  `pa_intervalo_ejecucion` int(11) DEFAULT NULL,
  `pa_hora_ejecucion` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`pa_id`),
  KEY `proceso_aspecto_idx` (`aa_id`),
  KEY `proceso_sujeto_idx` (`suj_id`),
  KEY `proceso_modelo_idx` (`ma_id`),
  CONSTRAINT `proceso_aspecto` FOREIGN KEY (`aa_id`) REFERENCES `aspectoautoconsciencia` (`aa_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `proceso_modelo` FOREIGN KEY (`ma_id`) REFERENCES `sujeto` (`ma_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `proceso_sujeto` FOREIGN KEY (`suj_id`) REFERENCES `sujeto` (`suj_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `procesoautoconsciencia`
--

LOCK TABLES `procesoautoconsciencia` WRITE;
/*!40000 ALTER TABLE `procesoautoconsciencia` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recursoimplementacion`
--

LOCK TABLES `recursoimplementacion` WRITE;
/*!40000 ALTER TABLE `recursoimplementacion` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `umbral`
--

LOCK TABLES `umbral` WRITE;
/*!40000 ALTER TABLE `umbral` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unidadmedicion`
--

LOCK TABLES `unidadmedicion` WRITE;
/*!40000 ALTER TABLE `unidadmedicion` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
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

-- Dump completed on 2021-10-07 16:41:48
