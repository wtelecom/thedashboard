-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 18-08-2015 a las 14:14:24
-- Versión del servidor: 5.5.44-0ubuntu0.14.04.1-log
-- Versión de PHP: 5.5.9-1ubuntu4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `thedashboard`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_1`
--

CREATE TABLE IF NOT EXISTS `t_1` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quantity` int(11) NOT NULL,
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `type` varchar(250) NOT NULL,
  `metric` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=731 ;

--
-- Volcado de datos para la tabla `t_1`
INSERT INTO t_1 (quantity,ts,type,metric)
VALUES(50,"2015-08-18 13:49:34","type_1",322.4),
(51,"2015-08-18 13:59:34","type_3",32.4),
(830,"2015-08-18 13:69:34","type_3",132.4),
(150,"2015-08-18 13:19:34","type_2",1.4),
(30,"2015-08-18 13:29:34","type_1",21.4),
(15,"2015-08-18 13:39:34","type_4",392.4),
(50,"2015-08-18 13:49:34","type_1",322.4),
(51,"2015-08-18 13:59:34","type_1",123.4),
(150,"2015-08-18 13:09:34","type_4",839.4),
(450,"2015-08-18 13:19:34","type_3",839.4),
(520,"2015-08-18 13:29:34","type_3",89.4),
(530,"2015-08-18 13:39:34","type_2",9.4),
(10,"2015-08-18 13:49:34","type_1",1839.4),
(3,"2015-08-18 13:59:34","type_1",91.4),
(50,"2015-08-18 13:09:34","type_1",322.4),
(51,"2015-08-18 13:19:34","type_3",32.4),
(830,"2015-08-18 13:29:34","type_3",132.4),
(1250,"2015-08-18 13:39:34","type_2",1.4),
(130,"2015-08-18 13:49:34","type_1",21.4),
(15,"2015-08-18 13:59:34","type_4",392.4),
(501,"2015-08-18 13:09:34","type_1",322.4),
(51,"2015-08-18 13:19:34","type_1",123.4),
(520,"2015-08-18 13:29:34","type_4",839.4),
(450,"2015-08-18 13:39:34","type_3",839.4),
(520,"2015-08-18 13:49:34","type_3",89.4),
(530,"2015-08-18 13:59:34","type_2",9.4),
(10,"2015-08-18 13:09:34","type_1",1839.4),
(311,"2015-08-18 13:19:34","type_1",91.4);
INSERT INTO t_1 (quantity,ts,type,metric)
VALUES(50,"2015-08-18 13:49:34","type_1",322.4),
(51,"2015-08-18 13:59:34","type_3",32.4),
(830,"2015-08-18 13:69:34","type_3",132.4),
(150,"2015-08-18 13:19:34","type_2",1.4),
(30,"2015-08-18 13:29:34","type_1",21.4),
(15,"2015-08-18 13:39:34","type_4",392.4),
(50,"2015-08-18 13:49:34","type_1",322.4),
(51,"2015-08-18 13:59:34","type_1",123.4),
(150,"2015-08-18 13:09:34","type_4",839.4),
(450,"2015-08-18 13:19:34","type_3",839.4),
(520,"2015-08-18 13:29:34","type_3",89.4),
(530,"2015-08-18 13:39:34","type_2",9.4),
(10,"2015-08-18 13:49:34","type_1",1839.4),
(3,"2015-08-18 13:59:34","type_1",91.4),
(50,"2015-08-18 13:09:34","type_1",322.4),
(51,"2015-08-18 13:19:34","type_3",32.4),
(830,"2015-08-18 13:29:34","type_3",132.4),
(1250,"2015-08-18 13:39:34","type_2",1.4),
(130,"2015-08-18 13:49:34","type_1",21.4),
(15,"2015-08-18 13:59:34","type_4",392.4),
(501,"2015-08-18 13:09:34","type_1",322.4),
(51,"2015-08-18 13:19:34","type_1",123.4),
(520,"2015-08-18 13:29:34","type_4",839.4),
(450,"2015-08-18 13:39:34","type_3",839.4),
(520,"2015-08-18 13:49:34","type_3",89.4),
(530,"2015-08-18 13:59:34","type_2",9.4),
(10,"2015-08-18 13:09:34","type_1",1839.4),
(311,"2015-08-18 13:19:34","type_1",91.4);
INSERT INTO t_1 (quantity,ts,type,metric)
VALUES(50,"2015-08-18 13:49:34","type_1",322.4),
(51,"2015-08-18 13:59:34","type_3",32.4),
(830,"2015-08-18 13:69:34","type_3",132.4),
(150,"2015-08-18 13:19:34","type_2",1.4),
(30,"2015-08-18 13:29:34","type_1",21.4),
(15,"2015-08-18 13:39:34","type_4",392.4),
(50,"2015-08-18 13:49:34","type_1",322.4),
(51,"2015-08-18 13:59:34","type_1",123.4),
(150,"2015-08-18 13:09:34","type_4",839.4),
(450,"2015-08-18 13:19:34","type_3",839.4),
(520,"2015-08-18 13:29:34","type_3",89.4),
(530,"2015-08-18 13:39:34","type_2",9.4),
(10,"2015-08-18 13:49:34","type_1",1839.4),
(3,"2015-08-18 13:59:34","type_1",91.4),
(50,"2015-08-18 13:09:34","type_1",322.4),
(51,"2015-08-18 13:19:34","type_3",32.4),
(830,"2015-08-18 13:29:34","type_3",132.4),
(1250,"2015-08-18 13:39:34","type_2",1.4),
(130,"2015-08-18 13:49:34","type_1",21.4),
(15,"2015-08-18 13:59:34","type_4",392.4),
(501,"2015-08-18 13:09:34","type_1",322.4),
(51,"2015-08-18 13:19:34","type_1",123.4),
(520,"2015-08-18 13:29:34","type_4",839.4),
(450,"2015-08-18 13:39:34","type_3",839.4),
(520,"2015-08-18 13:49:34","type_3",89.4),
(530,"2015-08-18 13:59:34","type_2",9.4),
(10,"2015-08-18 13:09:34","type_1",1839.4),
(311,"2015-08-18 13:19:34","type_1",91.4);
INSERT INTO t_1 (quantity,ts,type,metric)
VALUES(50,"2015-08-18 13:49:34","type_1",322.4),
(51,"2015-08-18 13:59:34","type_3",32.4),
(830,"2015-08-18 13:69:34","type_3",132.4),
(150,"2015-08-18 13:19:34","type_2",1.4),
(30,"2015-08-18 13:29:34","type_1",21.4),
(15,"2015-08-18 13:39:34","type_4",392.4),
(50,"2015-08-18 13:49:34","type_1",322.4),
(51,"2015-08-18 13:59:34","type_1",123.4),
(150,"2015-08-18 13:09:34","type_4",839.4),
(450,"2015-08-18 13:19:34","type_3",839.4),
(520,"2015-08-18 13:29:34","type_3",89.4),
(530,"2015-08-18 13:39:34","type_2",9.4),
(10,"2015-08-18 13:49:34","type_1",1839.4),
(3,"2015-08-18 13:59:34","type_1",91.4),
(50,"2015-08-18 13:09:34","type_1",322.4),
(51,"2015-08-18 13:19:34","type_3",32.4),
(830,"2015-08-18 13:29:34","type_3",132.4),
(1250,"2015-08-18 13:39:34","type_2",1.4),
(130,"2015-08-18 13:49:34","type_1",21.4),
(15,"2015-08-18 13:59:34","type_4",392.4),
(501,"2015-08-18 13:09:34","type_1",322.4),
(51,"2015-08-18 13:19:34","type_1",123.4),
(520,"2015-08-18 13:29:34","type_4",839.4),
(450,"2015-08-18 13:39:34","type_3",839.4),
(520,"2015-08-18 13:49:34","type_3",89.4),
(530,"2015-08-18 13:59:34","type_2",9.4),
(10,"2015-08-18 13:09:34","type_1",1839.4),
(311,"2015-08-18 13:19:34","type_1",91.4);
INSERT INTO t_1 (quantity,ts,type,metric)
VALUES(50,"2015-08-18 13:49:34","type_1",322.4),
(51,"2015-08-18 13:59:34","type_3",32.4),
(830,"2015-08-18 13:69:34","type_3",132.4),
(150,"2015-08-18 13:19:34","type_2",1.4),
(30,"2015-08-18 13:29:34","type_1",21.4),
(15,"2015-08-18 13:39:34","type_4",392.4),
(50,"2015-08-18 13:49:34","type_1",322.4),
(51,"2015-08-18 13:59:34","type_1",123.4),
(150,"2015-08-18 13:09:34","type_4",839.4),
(450,"2015-08-18 13:19:34","type_3",839.4),
(520,"2015-08-18 13:29:34","type_3",89.4),
(530,"2015-08-18 13:39:34","type_2",9.4),
(10,"2015-08-18 13:49:34","type_1",1839.4),
(3,"2015-08-18 13:59:34","type_1",91.4),
(50,"2015-08-18 13:09:34","type_1",322.4),
(51,"2015-08-18 13:19:34","type_3",32.4),
(830,"2015-08-18 13:29:34","type_3",132.4),
(1250,"2015-08-18 13:39:34","type_2",1.4),
(130,"2015-08-18 13:49:34","type_1",21.4),
(15,"2015-08-18 13:59:34","type_4",392.4),
(501,"2015-08-18 13:09:34","type_1",322.4),
(51,"2015-08-18 13:19:34","type_1",123.4),
(520,"2015-08-18 13:29:34","type_4",839.4),
(450,"2015-08-18 13:39:34","type_3",839.4),
(520,"2015-08-18 13:49:34","type_3",89.4),
(530,"2015-08-18 13:59:34","type_2",9.4),
(10,"2015-08-18 13:09:34","type_1",1839.4),
(311,"2015-08-18 13:19:34","type_1",91.4);
INSERT INTO t_1 (quantity,ts,type,metric)
VALUES(50,"2015-08-18 13:49:34","type_1",322.4),
(51,"2015-08-18 13:59:34","type_3",32.4),
(830,"2015-08-18 13:69:34","type_3",132.4),
(150,"2015-08-18 13:19:34","type_2",1.4),
(30,"2015-08-18 13:29:34","type_1",21.4),
(15,"2015-08-18 13:39:34","type_4",392.4),
(50,"2015-08-18 13:49:34","type_1",322.4),
(51,"2015-08-18 13:59:34","type_1",123.4),
(150,"2015-08-18 13:09:34","type_4",839.4),
(450,"2015-08-18 13:19:34","type_3",839.4),
(520,"2015-08-18 13:29:34","type_3",89.4),
(530,"2015-08-18 13:39:34","type_2",9.4),
(10,"2015-08-18 13:49:34","type_1",1839.4),
(3,"2015-08-18 13:59:34","type_1",91.4),
(50,"2015-08-18 13:09:34","type_1",322.4),
(51,"2015-08-18 13:19:34","type_3",32.4),
(830,"2015-08-18 13:29:34","type_3",132.4),
(1250,"2015-08-18 13:39:34","type_2",1.4),
(130,"2015-08-18 13:49:34","type_1",21.4),
(15,"2015-08-18 13:59:34","type_4",392.4),
(501,"2015-08-18 13:09:34","type_1",322.4),
(51,"2015-08-18 13:19:34","type_1",123.4),
(520,"2015-08-18 13:29:34","type_4",839.4),
(450,"2015-08-18 13:39:34","type_3",839.4),
(520,"2015-08-18 13:49:34","type_3",89.4),
(530,"2015-08-18 13:59:34","type_2",9.4),
(10,"2015-08-18 13:09:34","type_1",1839.4),
(311,"2015-08-18 13:19:34","type_1",91.4);
INSERT INTO t_1 (quantity,ts,type,metric)
VALUES(50,"2015-08-18 13:49:34","type_1",322.4),
(51,"2015-08-18 13:59:34","type_3",32.4),
(830,"2015-08-18 13:69:34","type_3",132.4),
(150,"2015-08-18 13:19:34","type_2",1.4),
(30,"2015-08-18 13:29:34","type_1",21.4),
(15,"2015-08-18 13:39:34","type_4",392.4),
(50,"2015-08-18 13:49:34","type_1",322.4),
(51,"2015-08-18 13:59:34","type_1",123.4),
(150,"2015-08-18 13:09:34","type_4",839.4),
(450,"2015-08-18 13:19:34","type_3",839.4),
(520,"2015-08-18 13:29:34","type_3",89.4),
(530,"2015-08-18 13:39:34","type_2",9.4),
(10,"2015-08-18 13:49:34","type_1",1839.4),
(3,"2015-08-18 13:59:34","type_1",91.4),
(50,"2015-08-18 13:09:34","type_1",322.4),
(51,"2015-08-18 13:19:34","type_3",32.4),
(830,"2015-08-18 13:29:34","type_3",132.4),
(1250,"2015-08-18 13:39:34","type_2",1.4),
(130,"2015-08-18 13:49:34","type_1",21.4),
(15,"2015-08-18 13:59:34","type_4",392.4),
(501,"2015-08-18 13:09:34","type_1",322.4),
(51,"2015-08-18 13:19:34","type_1",123.4),
(520,"2015-08-18 13:29:34","type_4",839.4),
(450,"2015-08-18 13:39:34","type_3",839.4),
(520,"2015-08-18 13:49:34","type_3",89.4),
(530,"2015-08-18 13:59:34","type_2",9.4),
(10,"2015-08-18 13:09:34","type_1",1839.4),
(311,"2015-08-18 13:19:34","type_1",91.4);
INSERT INTO t_1 (quantity,ts,type,metric)
VALUES(50,"2015-08-18 13:49:34","type_1",322.4),
(51,"2015-08-18 13:59:34","type_3",32.4),
(830,"2015-08-18 13:69:34","type_3",132.4),
(150,"2015-08-18 13:19:34","type_2",1.4),
(30,"2015-08-18 13:29:34","type_1",21.4),
(15,"2015-08-18 13:39:34","type_4",392.4),
(50,"2015-08-18 13:49:34","type_1",322.4),
(51,"2015-08-18 13:59:34","type_1",123.4),
(150,"2015-08-18 13:09:34","type_4",839.4),
(450,"2015-08-18 13:19:34","type_3",839.4),
(520,"2015-08-18 13:29:34","type_3",89.4),
(530,"2015-08-18 13:39:34","type_2",9.4),
(10,"2015-08-18 13:49:34","type_1",1839.4),
(3,"2015-08-18 13:59:34","type_1",91.4),
(50,"2015-08-18 13:09:34","type_1",322.4),
(51,"2015-08-18 13:19:34","type_3",32.4),
(830,"2015-08-18 13:29:34","type_3",132.4),
(1250,"2015-08-18 13:39:34","type_2",1.4),
(130,"2015-08-18 13:49:34","type_1",21.4),
(15,"2015-08-18 13:59:34","type_4",392.4),
(501,"2015-08-18 13:09:34","type_1",322.4),
(51,"2015-08-18 13:19:34","type_1",123.4),
(520,"2015-08-18 13:29:34","type_4",839.4),
(450,"2015-08-18 13:39:34","type_3",839.4),
(520,"2015-08-18 13:49:34","type_3",89.4),
(530,"2015-08-18 13:59:34","type_2",9.4),
(10,"2015-08-18 13:09:34","type_1",1839.4),
(311,"2015-08-18 13:19:34","type_1",91.4);
INSERT INTO t_1 (quantity,ts,type,metric)
VALUES(50,"2015-08-18 13:49:34","type_1",322.4),
(51,"2015-08-18 13:59:34","type_3",32.4),
(830,"2015-08-18 13:69:34","type_3",132.4),
(150,"2015-08-18 13:19:34","type_2",1.4),
(30,"2015-08-18 13:29:34","type_1",21.4),
(15,"2015-08-18 13:39:34","type_4",392.4),
(50,"2015-08-18 13:49:34","type_1",322.4),
(51,"2015-08-18 13:59:34","type_1",123.4),
(150,"2015-08-18 13:09:34","type_4",839.4),
(450,"2015-08-18 13:19:34","type_3",839.4),
(520,"2015-08-18 13:29:34","type_3",89.4),
(530,"2015-08-18 13:39:34","type_2",9.4),
(10,"2015-08-18 13:49:34","type_1",1839.4),
(3,"2015-08-18 13:59:34","type_1",91.4),
(50,"2015-08-18 13:09:34","type_1",322.4),
(51,"2015-08-18 13:19:34","type_3",32.4),
(830,"2015-08-18 13:29:34","type_3",132.4),
(1250,"2015-08-18 13:39:34","type_2",1.4),
(130,"2015-08-18 13:49:34","type_1",21.4),
(15,"2015-08-18 13:59:34","type_4",392.4),
(501,"2015-08-18 13:09:34","type_1",322.4),
(51,"2015-08-18 13:19:34","type_1",123.4),
(520,"2015-08-18 13:29:34","type_4",839.4),
(450,"2015-08-18 13:39:34","type_3",839.4),
(520,"2015-08-18 13:49:34","type_3",89.4),
(530,"2015-08-18 13:59:34","type_2",9.4),
(10,"2015-08-18 13:09:34","type_1",1839.4),
(311,"2015-08-18 13:19:34","type_1",91.4);
INSERT INTO t_1 (quantity,ts,type,metric)
VALUES(50,"2015-08-18 13:49:34","type_1",322.4),
(51,"2015-08-18 13:59:34","type_3",32.4),
(830,"2015-08-18 13:69:34","type_3",132.4),
(150,"2015-08-18 13:19:34","type_2",1.4),
(30,"2015-08-18 13:29:34","type_1",21.4),
(15,"2015-08-18 13:39:34","type_4",392.4),
(50,"2015-08-18 13:49:34","type_1",322.4),
(51,"2015-08-18 13:59:34","type_1",123.4),
(150,"2015-08-18 13:09:34","type_4",839.4),
(450,"2015-08-18 13:19:34","type_3",839.4),
(520,"2015-08-18 13:29:34","type_3",89.4),
(530,"2015-08-18 13:39:34","type_2",9.4),
(10,"2015-08-18 13:49:34","type_1",1839.4),
(3,"2015-08-18 13:59:34","type_1",91.4),
(50,"2015-08-18 13:09:34","type_1",322.4),
(51,"2015-08-18 13:19:34","type_3",32.4),
(830,"2015-08-18 13:29:34","type_3",132.4),
(1250,"2015-08-18 13:39:34","type_2",1.4),
(130,"2015-08-18 13:49:34","type_1",21.4),
(15,"2015-08-18 13:59:34","type_4",392.4),
(501,"2015-08-18 13:09:34","type_1",322.4),
(51,"2015-08-18 13:19:34","type_1",123.4),
(520,"2015-08-18 13:29:34","type_4",839.4),
(450,"2015-08-18 13:39:34","type_3",839.4),
(520,"2015-08-18 13:49:34","type_3",89.4),
(530,"2015-08-18 13:59:34","type_2",9.4),
(10,"2015-08-18 13:09:34","type_1",1839.4),
(311,"2015-08-18 13:19:34","type_1",91.4);



/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
