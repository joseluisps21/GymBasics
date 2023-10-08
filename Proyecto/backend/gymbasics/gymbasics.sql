-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-09-2023 a las 01:18:54
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gymbasics`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `activities`
--

CREATE TABLE `activities` (
  `id` int(11) NOT NULL,
  `note` varchar(255) COLLATE utf8_bin NOT NULL,
  `id_exercise` int(11) NOT NULL,
  `id_workout` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `activities`
--

INSERT INTO `activities` (`id`, `note`, `id_exercise`, `id_workout`) VALUES
(1, 'Subimos 5 kg en la ultima serie', 1, 2),
(2, 'Actividad de prueba desde Postman', 4, 2),
(3, 'Actividad de prueba desde Postman', 4, 2),
(4, 'Actividad de prueba desde Postman', 4, 2),
(5, 'Activity 1', 2, 24),
(6, 'Activity 2', 3, 24),
(7, '', 2, 25),
(8, '', 1, 25),
(9, '', 3, 25),
(10, '', 4, 25),
(11, '', 2, 26),
(12, '', 1, 26),
(13, '', 3, 26),
(14, '', 4, 26),
(15, 'nota divertida', 1, 27),
(16, '', 1, 28),
(17, '', 1, 29),
(18, 'pruebesita de notaa', 1, 30),
(19, '', 1, 31),
(20, '', 1, 32),
(21, '', 1, 33),
(22, '', 1, 34),
(23, '', 1, 35),
(24, '', 1, 36),
(25, '', 1, 37),
(26, '', 1, 38),
(27, '', 1, 39),
(28, '', 1, 40),
(29, 'Nota del press de banca', 2, 41),
(30, 'nota del ejercicio de prueba', 1, 41),
(31, '', 3, 41),
(32, '', 4, 41),
(33, 'yuuu', 2, 43),
(34, '', 1, 43),
(35, '', 3, 43),
(36, '', 4, 43),
(37, 'dfsdsfds', 1, 45),
(38, 'dsadfasfasfasdfcas', 2, 45),
(39, '', 1, 46),
(40, '', 1, 47),
(41, '', 2, 47),
(42, '', 6, 47),
(43, '', 7, 47),
(44, '', 10, 47),
(45, '', 1, 48),
(46, '', 2, 48),
(47, '', 7, 49),
(48, '', 8, 49),
(49, '', 2, 49),
(50, '', 1, 49),
(51, 'Mantenemos lo mismo que la semana pasada.', 2, 50),
(52, '', 4, 51),
(53, '', 5, 51),
(54, '', 9, 52),
(55, '', 10, 52),
(56, 'aaaa', 9, 53),
(57, '', 10, 53),
(58, '', 2, 54),
(59, 'Subimos 2 kg en cada serie', 4, 54),
(60, '', 2, 55),
(61, 'Subimos 2 kg en cada serie', 4, 55),
(62, '', 2, 56),
(63, 'Subimos 2 kg en cada serie', 4, 56),
(64, 'Buen dia de pecho', 2, 57),
(65, 'Sin peso añadido', 5, 57),
(66, 'holahola', 2, 58),
(67, 'adiosadios', 4, 58),
(68, '', 2, 59),
(69, '', 4, 59),
(70, '', 2, 60),
(71, '', 4, 60),
(72, '', 4, 61),
(73, '', 2, 61),
(74, '', 2, 62),
(75, 'holaholaPrimer (es el segundo pero debe ir primero)', 4, 62),
(76, '', 4, 63),
(77, '', 5, 63),
(78, '', 2, 64),
(79, '', 4, 64),
(80, 'notita', 2, 65),
(81, '', 4, 65),
(82, '', 2, 66),
(83, '', 4, 66),
(84, 'solo con press banca', 2, 67),
(85, '', 2, 68),
(86, '', 2, 69),
(87, '', 2, 70),
(88, '', 2, 71),
(89, '', 2, 72),
(90, '', 2, 73),
(91, '', 2, 74),
(92, '', 2, 75),
(93, '', 2, 76),
(94, '', 2, 77),
(95, '', 4, 78),
(96, '', 5, 78),
(97, '', 4, 79),
(98, '', 5, 79),
(99, '', 4, 80),
(100, '', 5, 80),
(101, '', 4, 81),
(102, '', 5, 81),
(103, '', 4, 82),
(104, '', 5, 82),
(105, '', 4, 83),
(106, '', 5, 83),
(107, 'czxcxzczxc', 9, 84),
(108, 'zxczcczc', 10, 84),
(109, 'czxcxzczxc', 9, 85),
(110, 'zxczcczc', 10, 85),
(111, 'Hoy he mejorado', 2, 86),
(112, '', 2, 87),
(113, '', 3, 87),
(114, '', 2, 88),
(115, '', 3, 88),
(116, '', 2, 89),
(117, '', 3, 89),
(118, '', 2, 90),
(119, '', 4, 90),
(120, 'dffsdfcs', 12, 91),
(121, 'fasfcsdf', 11, 91),
(122, '', 2, 92),
(123, '', 5, 92),
(124, '', 8, 92),
(125, '', 2, 93),
(126, '', 5, 93),
(127, '', 8, 93),
(128, '', 2, 94),
(129, '', 5, 94),
(130, '', 8, 94),
(131, '', 2, 95),
(132, '', 5, 95),
(133, '', 8, 95),
(134, '', 2, 96),
(135, '', 5, 96),
(136, '', 8, 96),
(137, '', 2, 97),
(138, '', 5, 97),
(139, '', 8, 97),
(140, '', 2, 98),
(141, '', 5, 98),
(142, '', 8, 98),
(143, '', 2, 99),
(144, '', 5, 99),
(145, '', 8, 99),
(146, '', 2, 100),
(147, '', 5, 100),
(148, '', 8, 100),
(149, 'cxczcc zx', 2, 101),
(150, '', 5, 101),
(151, '', 8, 101),
(152, 'Comenzamos con las dominadas después de un largo tiempo sin entrenarlas. Le metemos lastre en todas las series.', 8, 102),
(153, 'Mejoramos marcas con respecto a nuestra última sesión. Utilizamos el agarre supino.', 11, 102),
(154, 'Mejoramos un poco con respecto al ultimo entrenamiento.', 8, 103),
(155, 'Mejoramos marcas', 11, 103),
(156, 'Subimos lastre hasta 10 kilos', 8, 104),
(157, 'mejoramos peso', 11, 104),
(158, 'Conseguimos coger 15 kilos de lastre', 8, 105),
(159, 'Nos mantenemos.', 11, 105),
(160, '', 2, 106),
(161, '', 5, 106),
(162, 'Empezamos por 75 y de ahi vamos subiendo. Última serie al fallo.', 17, 106),
(163, 'Hoy empezamos también con 80 kgs. Mantenemos peso en la segunda serie.', 2, 107),
(164, 'Le metemos lastre hoy', 5, 107),
(165, 'Empezamos por 80 Kgs. Llegamos hasta 90 costando bastante.', 17, 107),
(166, 'Hacemos bici después de mucho tiempo sin realizar este ejercicio. Recuperamos sensaciones', 9, 108),
(167, 'A un ritmo bajo', 10, 108),
(168, 'Hoy subimos el lastre', 5, 109),
(169, 'Primera vez haciendo este ejercicio.', 12, 109),
(170, 'Técnica regular.', 16, 109),
(171, '', 17, 109),
(172, '', 2, 110),
(173, 'asfsaf', 5, 110),
(174, '', 17, 110),
(175, '', 2, 111),
(176, '', 5, 111),
(177, '', 17, 111),
(178, '', 2, 112),
(179, '', 5, 112),
(180, '', 17, 112),
(181, '', 2, 113),
(182, '', 5, 113),
(183, '', 17, 113),
(184, '', 5, 114),
(185, '', 12, 114),
(186, '', 16, 114),
(187, '', 17, 114),
(188, '', 9, 115),
(189, '', 10, 115),
(190, '', 2, 116),
(191, '', 5, 116),
(192, '', 17, 116),
(193, 'Empezamos sin añadirle nada de peso. En las siguientes si que le añadimos', 8, 117),
(194, 'Buenas sensaciones', 11, 117),
(195, 'Hoy empezamos cogiendo lastre.', 8, 118),
(196, 'Subimos de peso.', 11, 118),
(197, 'Conseguimos hacer mas repeticiones. Con lastre de 5 kg', 8, 119),
(198, 'Mantenemos peso', 11, 119),
(199, 'Metemos 10 Kg de lastre.', 8, 120),
(200, 'Subimos peso.', 11, 120),
(201, 'subimos repeticiones con los 10 kg de lastre', 8, 121),
(202, 'Mantenemos peso.', 11, 121),
(203, '', 8, 122),
(204, '', 11, 122),
(205, '', 8, 123),
(206, '', 11, 123),
(207, '', 2, 124),
(208, '', 5, 124),
(209, '', 17, 124),
(210, '', 8, 125),
(211, '', 11, 125);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `firstname` varchar(50) COLLATE utf8_bin NOT NULL,
  `lastname` varchar(50) COLLATE utf8_bin NOT NULL,
  `email` varchar(255) COLLATE utf8_bin NOT NULL,
  `phone` varchar(44) COLLATE utf8_bin NOT NULL,
  `address` varchar(120) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `customers`
--

INSERT INTO `customers` (`id`, `firstname`, `lastname`, `email`, `phone`, `address`) VALUES
(1, 'Jose Luis', 'Perez Santacruz', 'joseluissfc4@gmail.com', '657736252', 'Calle Flor de Porcelana 2 3ºB'),
(12, 'alba maria ', 'herrera olmedo', 'albaherreraolmedo@gmail.com', '665801358', 'calle flor de tomillo nº3 3c '),
(24, 'aaa', 'aaa', 'aaa', 'aaa', 'aaa'),
(26, 'dvfdbgn', 'dvfbg', 'fds', 'fdgsd', 'fdfdfd'),
(27, 'aa', 'aa', 'aa', 'aa', 'a'),
(41, 'prueba', 'de agregacion', 'sss', 'sss', 'sss'),
(42, 'zcxvvcz', 'xvxzcvc', 'xvcbx', 'cvxcb', 'zxcv'),
(43, ',jnkhugj', 'nmbhjv', 'klnjbh', 'knljbh', 'kljhu'),
(44, 'z', 'z', 'zz', 'z', 'z'),
(45, 'Josdfghe Luis', 'Perefsdfsdfz Santacruz', 'josdgvdfxvgeluissfc4@gmail.com', '657736252', 'Calle Flor de Porcelana 2 3ºB');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `exercises`
--

CREATE TABLE `exercises` (
  `id` int(11) NOT NULL,
  `name` varchar(64) COLLATE utf8_bin NOT NULL,
  `level` varchar(64) COLLATE utf8_bin NOT NULL,
  `focus` varchar(64) COLLATE utf8_bin NOT NULL,
  `picture` varchar(255) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `exercises`
--

INSERT INTO `exercises` (`id`, `name`, `level`, `focus`, `picture`) VALUES
(2, 'Press Banca', 'intermediate', 'musclemass', 'benchpress'),
(5, 'Flexiones', 'beginner', 'musclemass', 'flexiones'),
(6, 'Sentadillas', 'intermediate', 'musclemass', 'sentadillas'),
(7, 'Abdominales', 'beginner', 'loseweight', 'abdominales'),
(8, 'Dominadas', 'advanced', 'musclemass', 'dominadas'),
(9, 'Bicicleta', 'beginner', 'loseweight', 'bicicleta'),
(10, 'Correr', 'beginner', 'loseweight', 'correr'),
(11, 'Jalon al pecho', 'intermediate', 'musclemass', 'jalonalpecho'),
(12, 'Press Militar', 'intermediate', 'musclemass', 'pressmilitar'),
(16, 'Biceps con mancuernas', 'beginner', 'musclemass', 'bicepsconmancuernas'),
(17, 'Triceps con polea', 'intermediate', 'musclemass', 'tricepsconpolea'),
(20, 'cinta', 'beginner', 'loseweight', 'default.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `exercise_muscle`
--

CREATE TABLE `exercise_muscle` (
  `id_exercise` int(11) NOT NULL,
  `id_muscle` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `exercise_muscle`
--

INSERT INTO `exercise_muscle` (`id_exercise`, `id_muscle`) VALUES
(1, 1),
(1, 5),
(5, 3),
(5, 16),
(9, 5),
(5, 4),
(6, 2),
(6, 11),
(7, 1),
(8, 4),
(8, 8),
(10, 5),
(11, 8),
(11, 4),
(12, 12),
(12, 15),
(13, 3),
(13, 4),
(14, 14),
(14, 15),
(15, 3),
(15, 4),
(18, 1),
(18, 2),
(18, 3),
(18, 4),
(18, 5),
(18, 6),
(19, 3),
(2, 14),
(2, 16),
(20, 5),
(17, 16);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `muscles`
--

CREATE TABLE `muscles` (
  `id` int(11) NOT NULL,
  `name` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `muscles`
--

INSERT INTO `muscles` (`id`, `name`) VALUES
(1, 'Abdominales'),
(2, 'Abductores y aductores de cadera'),
(3, 'Antebrazos'),
(4, 'Bíceps'),
(5, 'Cardio'),
(6, 'Cuádriceps'),
(7, 'Dorsales'),
(8, 'Espalda Alta'),
(9, 'Espalda Baja'),
(10, 'Gemelos'),
(11, 'Glúteos'),
(12, 'Hombros'),
(13, 'Isquiotibiales'),
(14, 'Pectorales'),
(15, 'Trapecio'),
(16, 'Tríceps');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `results`
--

CREATE TABLE `results` (
  `id` int(11) NOT NULL,
  `serie` int(11) NOT NULL,
  `attr1` varchar(64) COLLATE utf8_bin NOT NULL,
  `attr2` varchar(64) COLLATE utf8_bin NOT NULL,
  `id_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `results`
--

INSERT INTO `results` (`id`, `serie`, `attr1`, `attr2`, `id_activity`) VALUES
(1, 1, '10', '80', 1),
(2, 1, 'Result 1 for Activity 1', 'Result 2 for Activity 1', 5),
(3, 2, 'Result 3 for Activity 1', 'Result 4 for Activity 1', 5),
(4, 1, 'Result 1 for Activity 2', 'Result 2 for Activity 2', 6),
(5, 2, 'Result 3 for Activity 2', 'Result 4 for Activity 2', 6),
(6, 1, '', '', 7),
(7, 1, '', '', 8),
(8, 1, '', '', 9),
(9, 1, '', '', 10),
(10, 1, '', '', 11),
(11, 1, '', '', 12),
(12, 1, '', '', 13),
(13, 1, '', '', 14),
(14, 1, 'aaa', 'aaa', 15),
(15, 1, '', '', 16),
(16, 1, '', '', 17),
(17, 1, 'aaa', 'aaa', 18),
(18, 1, '', '', 19),
(19, 1, '', '', 20),
(20, 1, '', '', 21),
(21, 2, '<scasc', 'acsscas', 21),
(22, 3, 'cacasc', '', 21),
(23, 1, '', '', 22),
(24, 2, '', '', 22),
(25, 1, 'aasa', '', 23),
(26, 1, '', '', 24),
(27, 1, 'assas', 'sasas', 25),
(28, 2, 'asasa', 'sasasass', 25),
(29, 3, 'asasas', '', 25),
(30, 1, 'assaasasdads', 'sasasasas', 26),
(31, 1, 'asdasd', 'dsadadas', 27),
(32, 1, 'asdasdddasd', 'dssadsadadadas', 28),
(33, 2, 'sadasdsd', 'asdasd', 28),
(34, 3, 'dasdsad', 'dsaadasdasd', 28),
(35, 1, 'asddasdasdddasd', 'dssadsadadadasasd', 29),
(36, 1, 'dasdasd', 'ad', 30),
(37, 1, '', '', 31),
(38, 1, '', '', 32),
(39, 1, '', '', 33),
(40, 2, '', '', 33),
(41, 3, 'dfff', 'dfjfjf', 33),
(42, 4, '', '', 33),
(43, 1, '', '', 34),
(44, 2, '', '', 34),
(45, 3, '', '', 34),
(46, 4, '', '', 34),
(47, 1, '', '', 35),
(48, 1, '', '', 36),
(49, 1, '10', '10', 37),
(50, 2, '10', '10', 37),
(51, 1, '1w22qdes', 'ssacdsa', 38),
(52, 1, '', '', 39),
(53, 1, '', '', 40),
(54, 1, '', '', 41),
(55, 1, '', '', 42),
(56, 1, '', '', 43),
(57, 1, '', '', 44),
(58, 1, '', '', 45),
(59, 1, '12', '30', 46),
(60, 1, '', '', 47),
(61, 1, '', '', 48),
(62, 1, '10', '20', 49),
(63, 1, '', '', 50),
(64, 1, '34', '10', 51),
(65, 2, '34', '8', 51),
(66, 3, '34', '6', 51),
(67, 1, '24', '10', 52),
(68, 2, '24', '20', 52),
(69, 1, '0', '10', 53),
(70, 1, '10', '25', 54),
(71, 1, '2', '10', 55),
(72, 1, '10', '12', 56),
(73, 1, '23', '12', 57),
(74, 2, '23', '', 57),
(75, 1, '10', '34', 58),
(76, 2, '8', '34', 58),
(77, 1, '8', '26', 59),
(78, 2, '6', '26', 59),
(79, 1, '10', '34', 60),
(80, 2, '8', '34', 60),
(81, 1, '8', '26', 61),
(82, 2, '6', '26', 61),
(83, 1, '10', '34', 62),
(84, 2, '8', '34', 62),
(85, 1, '8', '26', 63),
(86, 2, '6', '26', 63),
(87, 1, '10', '34', 64),
(88, 2, '8', '34', 64),
(89, 3, '6', '34', 64),
(90, 1, '15', '0', 65),
(91, 2, '20', '0', 65),
(92, 1, '10', '34', 66),
(93, 1, '10', '24', 67),
(94, 1, '', '', 68),
(95, 1, '', '', 69),
(96, 1, '', '', 70),
(97, 1, '', '', 71),
(98, 1, '', '', 72),
(99, 1, '', '', 73),
(100, 1, '', '', 74),
(101, 1, '', '', 75),
(102, 1, '', '', 76),
(103, 1, '', '', 77),
(104, 1, '', '', 78),
(105, 1, '', '', 79),
(106, 1, '10', '50', 80),
(107, 1, '10', '34', 81),
(108, 2, '12', '32', 81),
(109, 1, '', '', 82),
(110, 1, '', '', 83),
(111, 1, '10', '30', 84),
(112, 2, '20', '20', 84),
(113, 1, '', '', 85),
(114, 1, '', '', 86),
(115, 1, '', '', 87),
(116, 1, '', '', 88),
(117, 1, '', '', 89),
(118, 1, '', '', 90),
(119, 1, '', '', 91),
(120, 1, '', '', 92),
(121, 1, '', '', 93),
(122, 1, '', '', 94),
(123, 1, '', '', 95),
(124, 1, '', '', 96),
(125, 1, 'caca', '', 97),
(126, 1, '', '', 98),
(127, 1, 'caca', '', 99),
(128, 1, '', '', 100),
(129, 1, 'caca', '', 101),
(130, 1, '', '', 102),
(131, 1, 'caca', '', 103),
(132, 1, '', '', 104),
(133, 1, 'caca', '', 105),
(134, 1, '', '', 106),
(135, 1, 'xzczx', 'czczc', 107),
(136, 1, 'czczcz', 'czcxczc', 108),
(137, 1, 'xzczx', 'czczc', 109),
(138, 1, 'czczcz', 'czcxczc', 110),
(139, 1, '10', '30', 111),
(140, 2, '', '', 111),
(141, 1, '', '', 112),
(142, 1, '', '', 113),
(143, 1, '', '', 114),
(144, 2, '', '', 114),
(145, 1, '', '', 115),
(146, 2, '', '', 115),
(147, 1, '', '', 116),
(148, 1, '', '', 117),
(149, 1, '10', '10', 118),
(150, 2, '', '', 118),
(151, 1, '', '', 119),
(152, 1, '23', '23', 120),
(153, 1, '23', '23', 121),
(154, 1, '', '', 122),
(155, 1, '', '', 123),
(156, 1, '', '', 124),
(157, 1, '', '', 125),
(158, 1, '', '', 126),
(159, 1, '', '', 127),
(160, 1, '', '', 128),
(161, 1, '', '', 129),
(162, 1, '', '', 130),
(163, 1, '', '', 131),
(164, 2, '', '', 131),
(165, 3, '', '', 131),
(166, 1, '', '', 132),
(167, 1, '', '', 133),
(168, 1, '', '', 134),
(169, 1, '', '', 135),
(170, 1, '', '', 136),
(171, 1, '', '', 137),
(172, 1, '', '', 138),
(173, 1, '', '', 139),
(174, 1, '', '', 140),
(175, 1, '', '', 141),
(176, 1, '', '', 142),
(177, 1, '', '', 143),
(178, 1, '', '', 144),
(179, 1, '', '', 145),
(180, 1, '', '', 146),
(181, 1, '', '', 147),
(182, 1, '', '', 148),
(183, 1, '10', '20', 149),
(184, 1, '20', '0', 150),
(185, 2, '2', '2', 150),
(186, 1, '23', '33', 151),
(187, 1, '10', '5', 152),
(188, 2, '8', '5', 152),
(189, 3, '6', '5', 152),
(190, 1, '10', '60', 153),
(191, 2, '10', '65', 153),
(192, 3, '8', '65', 153),
(193, 1, '11', '7', 154),
(194, 2, '9', '7', 154),
(195, 3, '7', '7', 154),
(196, 1, '10', '60', 155),
(197, 2, '10', '65', 155),
(198, 3, '10', '70', 155),
(199, 4, '6', '75', 155),
(200, 1, '10', '10', 156),
(201, 2, '8', '10', 156),
(202, 3, '6', '10', 156),
(203, 1, '10', '75', 157),
(204, 2, '5', '80', 157),
(205, 1, '10', '15', 158),
(206, 2, '8', '15', 158),
(207, 3, '6', '15', 158),
(208, 1, '10', '75', 159),
(209, 2, '10', '80', 159),
(210, 1, '', '', 160),
(211, 2, '', '', 160),
(212, 3, '', '', 160),
(213, 1, '', '', 161),
(214, 2, '', '', 161),
(215, 3, '', '', 161),
(216, 1, '10', '75', 162),
(217, 2, '10', '80', 162),
(218, 3, '10', '85', 162),
(219, 1, '10', '80', 163),
(220, 2, '8', '80', 163),
(221, 3, '8', '75', 163),
(222, 1, '10', '5', 164),
(223, 2, '15', '5', 164),
(224, 1, '10', '80', 165),
(225, 2, '10', '85', 165),
(226, 3, '10', '90', 165),
(227, 1, '1', '10', 166),
(228, 2, '2', '15', 166),
(229, 1, '1', '20', 167),
(230, 1, '10', '10', 168),
(231, 2, '10', '20', 168),
(232, 1, '10', '26', 169),
(233, 2, '10', '24', 169),
(234, 1, '10', '20', 170),
(235, 2, '10', '18', 170),
(236, 1, '10', '80', 171),
(237, 2, '6', '95', 171),
(238, 1, '', '', 172),
(239, 2, '', '', 172),
(240, 1, '', '', 173),
(241, 1, '', '', 174),
(242, 1, '', '', 175),
(243, 2, '', '', 175),
(244, 1, '', '', 176),
(245, 1, '', '', 177),
(246, 1, '', '', 178),
(247, 2, '', '', 178),
(248, 1, '', '', 179),
(249, 1, '', '', 180),
(250, 1, '', '', 181),
(251, 1, '', '', 182),
(252, 1, '', '', 183),
(253, 1, '', '', 184),
(254, 1, '', '', 185),
(255, 1, '', '', 186),
(256, 1, '', '', 187),
(257, 1, '', '', 188),
(258, 1, '', '', 189),
(259, 1, '', '', 190),
(260, 1, '', '', 191),
(261, 1, '', '', 192),
(262, 1, '12', '0', 193),
(263, 2, '8', '5', 193),
(264, 3, '5', '5', 193),
(265, 1, '10', '60', 194),
(266, 2, '8', '65', 194),
(267, 3, '8', '70', 194),
(268, 1, '10', '5', 195),
(269, 2, '8', '5', 195),
(270, 3, '8', '5', 195),
(271, 1, '10', '65', 196),
(272, 2, '10', '75', 196),
(273, 1, '12', '5', 197),
(274, 2, '10', '5', 197),
(275, 3, '8', '5', 197),
(276, 1, '12', '65', 198),
(277, 2, '10', '70', 198),
(278, 3, '8', '75', 198),
(279, 1, '10', '10', 199),
(280, 2, '8', '10', 199),
(281, 3, '6', '10', 199),
(282, 1, '10', '80', 200),
(283, 2, '8', '80', 200),
(284, 3, '6', '80', 200),
(285, 1, '12', '10', 201),
(286, 2, '10', '10', 201),
(287, 3, '8', '10', 201),
(288, 1, '10', '80', 202),
(289, 2, '8', '80', 202),
(290, 3, '6', '80', 202),
(291, 1, '10', '10', 203),
(292, 2, '10', '10', 203),
(293, 3, '8', '5', 203),
(294, 1, '10', '85', 204),
(295, 2, '10', '80', 204),
(296, 3, '8', '75', 204),
(297, 1, '10', '15', 205),
(298, 2, '8', '15', 205),
(299, 3, '6', '15', 205),
(300, 1, '10', '80', 206),
(301, 2, '8', '75', 206),
(302, 3, '6', '75', 206),
(303, 1, '', '', 207),
(304, 1, '', '', 208),
(305, 1, '', '', 209),
(306, 1, '', '', 210),
(307, 2, '', '', 210),
(308, 1, '', '', 211);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `routines`
--

CREATE TABLE `routines` (
  `id` int(255) NOT NULL,
  `name` text COLLATE utf8_bin NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `routines`
--

INSERT INTO `routines` (`id`, `name`, `user_id`) VALUES
(1, 'prueba de rutina', 56),
(2, 'rutina de prueba', 54),
(8, 'Lunes', 58),
(10, 'Rutina de pecho', 58),
(14, 'lunes ', 60),
(16, 'Viernes', 58),
(17, 'Rutina de cardio', 58),
(24, 'Rutina de Espalda', 53),
(25, 'Rutina de Pecho y Tríceps', 53),
(26, 'Rutina de Brazo', 53),
(27, 'Entrenamiento de Cardio', 53);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `routine_exercise`
--

CREATE TABLE `routine_exercise` (
  `id_routine` int(11) NOT NULL,
  `id_exercise` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `routine_exercise`
--

INSERT INTO `routine_exercise` (`id_routine`, `id_exercise`) VALUES
(14, 1),
(14, 2),
(14, 6),
(14, 7),
(14, 10),
(16, 4),
(16, 5),
(10, 2),
(10, 4),
(17, 9),
(17, 10),
(8, 2),
(8, 3),
(27, 9),
(27, 10),
(24, 8),
(24, 11),
(25, 2),
(25, 5),
(25, 17),
(26, 5),
(26, 12),
(26, 16),
(26, 17);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_bin NOT NULL,
  `username` varchar(128) COLLATE utf8_bin NOT NULL,
  `password` varchar(256) COLLATE utf8_bin NOT NULL,
  `email` varchar(255) COLLATE utf8_bin NOT NULL,
  `level` varchar(50) COLLATE utf8_bin NOT NULL,
  `focus` varchar(50) COLLATE utf8_bin NOT NULL,
  `weight` varchar(50) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `password`, `email`, `level`, `focus`, `weight`) VALUES
(14, 'aaa', 'aaaa', 'aaaa', 'aaa', 'beginner', 'loseweight', 'basic'),
(16, 'dsffs', 'aaaaa', 'joseludscfscfszisps21', 'joselsascdsuissfc4@gmail.com', 'advdscdscanced', 'mudscdscdssclemass', 'basic'),
(18, 'dsffs', 'aaaaaaaaa', 'joseludscfscfszisps21', 'joselsascdsuissfc4@gmail.com', 'advdscdscanced', 'mudscdscdssclemass', 'basic'),
(21, 'dsffs', 'aaaaaaaaaa', 'joseludscfscfszisps21', 'joselsascdsuissfc4@gmail.com', 'advdscdscanced', 'mudscdscdssclemass', 'basic'),
(23, 'dsffs', 'aaaaaaaaaaaaaaa', 'joseludscfscfszisps21', 'joselsascdsuissfc4@gmail.com', 'advdscdscanced', 'mudscdscdssclemass', 'basic'),
(24, 'dsffs', 'aaaaaaaaaaaaaaaaa', 'joseludscfscfszisps21', 'joselsascdsuissfc4@gmail.com', 'advdscdscanced', 'mudscdscdssclemass', 'basic'),
(25, 'aaaaa', 'swsq', 'aaaa', 'asasad', 'beginner', 'musclemass', 'basic'),
(26, 'zxcc', 'ssss', 'ssss', 'xczcd', 'beginner', 'musclemass', 'basic'),
(27, 'dsfsadfdsf', 'wwww', 'wwww', 'safasfafds', 'beginner', 'musclemass', 'basic'),
(28, 'dssfsf', 'ffff', 'ffff', 'dfsfsfsd', 'beginner', 'mixed', 'basic'),
(29, 'aaaa', 'aaaay', 'aaaa', 'aaaa', 'beginner', 'mixed', 'basic'),
(30, 'sasasa', 'sasasas', 'aaaa', 'ssasas', 'beginner', 'musclemass', 'basic'),
(31, 'afasfd', 'sdwd', 'aaaa', 'afsdfs', 'beginner', 'loseweight', 'basic'),
(32, 'prueba', 'prueba', 'prueba', 'prueba', 'beginner', 'musclemass', 'basic'),
(33, 'sdafgd', 'afsdgfdsa', 'swsw', 'safgh', 'beginner', 'musclemass', 'basic'),
(34, 'aaa', 'aaajgcdyxrjchgkxiykchgtytdghgja', 'aaaa', 'aaa', 'beginner', 'loseweight', 'basic'),
(35, 'sdsvfdb', 'advfd', 'aaaa', 'scdsvfd', 'beginner', 'loseweight', 'basic'),
(36, 'Prueba', 'pruebesita', 'pruebesita', 'aaaefdes', 'beginner', 'loseweight', 'basic'),
(37, 'Prueba', 'pruebesita2', 'pruebesita', 'aaaefdes', 'beginner', 'loseweight', 'basic'),
(38, 'asfafasdf', 'aaaaaadsadsas', 'aaaa', 'asfdsad', 'intermediate', 'musclemass', 'basic'),
(39, 'Prueba', 'pruebesita22', 'pruebesita', 'aaaefdes', 'beginner', 'loseweight', 'basic'),
(40, 'Prueba', 'pruebesita222', 'aaaa', 'aaaefdes', 'beginner', 'loseweight', 'basic'),
(41, 'Prueba', 'pruebesitabuena', '$2a$12$AHFWgdhswSec.aUekyI5/eclFQPSgUDABH/ZWiJpiOwa6ZNNvdNPC', 'aaaefdes', 'beginner', 'loseweight', 'basic'),
(42, 'xasdxcvf', 'sdvsdxczx', 'ffff', 'sacds', 'beginner', 'mixed', 'basic'),
(43, 'zcdvbfxcbfsadv', 'svdcfsadvcxdvx', 'aaaa', 'csvdcfsavcxfdsdc', 'beginner', 'musclemass', 'basic'),
(44, 'sdvfbvgcfdfsvcs', 'sdacvxdsacvxdsa', 'aaaa', 'vdvdsdadvvcs', 'beginner', 'loseweight', 'basic'),
(45, 'Prueba', 'pruebesitabuena2', '$2a$12$AHFWgdhswSec.aUekyI5/eclFQPSgUDABH/ZWiJpiOwa6ZNNvdNPC', 'aaaefdes', 'beginner', 'loseweight', 'basic'),
(46, 'dsafdsfsd', 'dsafsdafsdadsadvdsav', 'aaaa', 'safdsdfs', 'beginner', 'musclemass', 'basic'),
(47, 'Prueba', 'porfavor', '$2a$12$AHFWgdhswSec.aUekyI5/eclFQPSgUDABH/ZWiJpiOwa6ZNNvdNPC', 'aaaefdes', 'beginner', 'loseweight', 'basic'),
(48, 'Prueba', 'porfavorr', '$2a$12$AHFWgdhswSec.aUekyI5/eclFQPSgUDABH/ZWiJpiOwa6ZNNvdNPC', 'aaaefdes', 'beginner', 'loseweight', 'basic'),
(49, 'Prueba', 'porfavorrr', '$2a$12$AHFWgdhswSec.aUekyI5/eclFQPSgUDABH/ZWiJpiOwa6ZNNvdNPC', 'aaaefdes', 'beginner', 'loseweight', 'basic'),
(50, 'aleluya', 'aleluya', 'aleluya', 'aaaa', 'beginner', 'loseweight', 'basic'),
(51, 'prueba', 'dasdasdasd', 'aaaa', 'adads', 'beginner', 'loseweight', 'basic'),
(52, 'adsff', 'asdfgb', '$2a$10$Lx.bY/d46..fBOXcIPoqA.wrrtuwTBTdzFTsH7H9imJZ6jmbGhqoi', 'sadf', 'beginner', 'musclemass', 'basic'),
(53, 'Jose Luis', 'joseluisps21', '$2a$10$dw2eDV5Xq7OmQQfgot9KwOmemnWpumu9lOxMwOfeuvLFV8hluDzNO', 'joseluissfc4@gmail.com', 'beginner', 'musclemass', '80'),
(54, 'joseluis', 'joseluis', '$2a$10$znsMw.ElkKO2JthY8mq0fuphlJorUcFRABvdKWywAs3wY4xbyW5u2', 'joseluis', 'beginner', 'musclemass', 'basic'),
(55, 'jsjsj', 'iaisjsjahaja', '$2a$10$g3SY7fu.xO.OpMwnorHKw.bjUbw2TJvhkFOAXEtWBItB5tpj.htOa', 'jsjsjabsbahqjsjssb', 'beginner', 'musclemass', 'basic'),
(56, 'joseluisps22', 'joseluisps22', '$2a$10$jIy/8kCX7IRn4IXhNq05Oee8nQC/FyZtu5mb9IBKJH2ZrNS136ERu', 'joseluisps22@gmail.com', 'intermediate', 'loseweight', 'basic'),
(57, 'joseluisps23', 'joseluisps23', '$2a$10$nxqjAyXcNL.Waymgr3hzcer.ukpnJRBJtdjL2X4YtFUT/pgj.fR4C', 'joseluisps23', 'advanced', 'mixed', 'basic'),
(58, 'Jose luis', 'joseluisps24', '$2a$10$WQB6j566.kbqnT.Nbsi5k.68XtDKp9YCexTmJbzEniB4fRmhnA7UK', 'joseluis', 'beginner', 'musclemass', '80'),
(59, 'joseluisps25', 'joseluisps25', '$2a$10$CPtuzjao3ATg1IKrgkzuauJh4llT2ReuN953jUZ1z09TnzlR3PDSW', 'joseluisps25', 'intermediate', 'loseweight', 'basic'),
(60, 'elena', 'elenaherrera__', '$2a$10$tH2d.WI7b154O.sTBe8RO.iOOx8VF3kX/80PSkTrv4jsDFKAbuOVG', 'elena', 'beginner', 'musclemass', 'basic'),
(61, 'joseluisps20', 'joseluisps20', '$2a$10$letQeV6ZcPjKtDbebX9zou77GZ.YJPKYliYLa0Y2ipMT4SLnGycsK', 'joseluisps20', 'beginner', 'musclemass', '80'),
(62, 'pruebesitaa', 'pruebesitaa', '$2a$10$mG21e1SN1r5l6ROpOUbI7ey8cNXTn0/1qhAvou.9VrtLthOjb3Ag6', 'pruebesitaa', 'intermediate', 'loseweight', '23'),
(63, 'joseluissfc4', 'joseluissfc4', '$2a$10$WorexzF4FUAff36Mok9JQ.SSnorlc3IDFCngGrjc3RSFP74cHZGNe', 'joseluissfc4', 'advanced', 'musclemass', '80');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `workouts`
--

CREATE TABLE `workouts` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `id_routine` int(11) NOT NULL,
  `time` varchar(12) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `workouts`
--

INSERT INTO `workouts` (`id`, `date`, `id_routine`, `time`) VALUES
(2, '2023-08-10', 3, '01:00'),
(3, '2023-08-16', 4, 'aaaa'),
(4, '2023-08-12', 4, '01:00'),
(5, '2023-08-12', 4, '01:00'),
(6, '2023-08-12', 4, '01:00'),
(7, '2023-08-12', 4, '01:00'),
(8, '2023-08-12', 4, '01:00'),
(9, '2023-08-12', 4, '01:00'),
(10, '2023-08-12', 4, '01:00'),
(11, '2023-08-12', 4, '01:00'),
(12, '2023-08-12', 4, '01:00'),
(13, '2023-08-12', 4, '01:00'),
(14, '2023-08-12', 4, '01:00'),
(15, '2023-08-12', 4, '01:00'),
(16, '2023-08-12', 4, '01:00'),
(17, '2023-08-13', 4, ''),
(18, '2023-08-13', 4, '01:00'),
(19, '2023-08-13', 4, ''),
(20, '2023-08-13', 3, 'jfjfj'),
(21, '2023-08-13', 3, 'jfjfj'),
(24, '2023-08-13', 4, '10:00'),
(25, '2023-08-13', 4, '12:12'),
(26, '2023-08-13', 4, '12:12'),
(27, '2023-08-13', 3, ''),
(28, '2023-08-13', 3, ''),
(29, '2023-08-13', 3, ''),
(30, '2023-08-13', 3, '5555'),
(31, '2023-08-13', 3, '5555w'),
(32, '2023-08-13', 3, '5555w'),
(33, '2023-08-13', 3, '5555w'),
(34, '2023-08-13', 3, '5555w'),
(35, '2023-08-13', 3, '5555w'),
(36, '2023-08-13', 3, '5555w'),
(37, '2023-08-13', 3, ''),
(38, '2023-08-13', 3, 'sacfascascs'),
(39, '2023-08-13', 3, ''),
(40, '2023-08-13', 3, 'asas'),
(41, '2023-08-13', 4, 'asassaa'),
(42, '2023-08-13', 2, ''),
(43, '2023-08-13', 4, ''),
(44, '2023-08-14', 4, ''),
(45, '2023-08-14', 5, ''),
(46, '2023-08-14', 3, ''),
(47, '2023-08-16', 14, 'uftuf'),
(48, '2023-03-22', 10, ''),
(49, '2023-03-07', 8, ''),
(50, '2023-08-18', 10, ''),
(51, '2023-08-18', 16, ''),
(52, '2023-08-18', 17, ''),
(53, '2023-08-19', 17, '01:00'),
(54, '2023-06-15', 10, ''),
(55, '2023-08-20', 10, ''),
(56, '2023-08-20', 10, ''),
(58, '2023-08-22', 10, ''),
(59, '2023-08-22', 10, ''),
(60, '2023-08-22', 10, ''),
(61, '2023-08-22', 0, ''),
(62, '2023-08-22', 10, ''),
(63, '2023-08-22', 16, '05:07'),
(64, '2023-08-22', 10, '05:06'),
(65, '2023-08-22', 10, '01:04'),
(66, '2023-08-22', 10, '00:00'),
(67, '2023-08-22', 8, '01:31'),
(68, '2023-08-22', 8, '00:01'),
(69, '2023-08-22', 8, '00:01'),
(70, '2023-08-22', 8, '01:00'),
(71, '2023-08-22', 8, '01:00'),
(72, '2023-08-22', 8, '01:00'),
(73, '2023-08-22', 8, '01:00'),
(74, '2023-08-22', 8, '01:00'),
(75, '2023-08-22', 8, '01:00'),
(76, '2023-08-22', 8, '01:00'),
(77, '2023-07-22', 8, '01:00'),
(78, '2023-08-22', 16, '02:00'),
(79, '2023-08-22', 16, '02:00'),
(80, '2023-08-22', 16, '02:00'),
(81, '2023-08-22', 16, '02:00'),
(82, '2023-08-22', 16, '02:00'),
(83, '2023-08-22', 16, '02:00'),
(84, '2023-08-22', 17, '03:00'),
(85, '2023-08-22', 17, '03:00'),
(86, '2023-08-22', 8, '01:00'),
(87, '2023-08-23', 8, '01:00'),
(88, '2023-08-23', 8, '21:00'),
(89, '2023-08-23', 8, '02:00'),
(90, '2023-08-25', 22, '01:00'),
(104, '2023-03-31', 24, '01:19'),
(105, '2023-04-04', 24, '01:15'),
(117, '2023-01-16', 24, '00:37'),
(118, '2023-02-14', 24, '01:07'),
(119, '2023-05-26', 24, '01:29'),
(120, '2023-06-10', 24, '01:02'),
(121, '2023-09-18', 24, '01:56'),
(122, '2023-07-28', 24, '01:11'),
(123, '2023-08-26', 24, '01:49'),
(124, '2023-09-18', 25, '03:00'),
(125, '2023-09-19', 24, '01:00');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_id_exercise` (`id_exercise`),
  ADD KEY `FK_id_workout` (`id_workout`);

--
-- Indices de la tabla `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `exercises`
--
ALTER TABLE `exercises`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `exercise_muscle`
--
ALTER TABLE `exercise_muscle`
  ADD KEY `FK_id_exercise` (`id_exercise`),
  ADD KEY `FK_id_muscle` (`id_muscle`);

--
-- Indices de la tabla `muscles`
--
ALTER TABLE `muscles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `results`
--
ALTER TABLE `results`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_id_activity` (`id_activity`);

--
-- Indices de la tabla `routines`
--
ALTER TABLE `routines`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_user_id` (`user_id`);

--
-- Indices de la tabla `routine_exercise`
--
ALTER TABLE `routine_exercise`
  ADD KEY `FK_id_routine` (`id_routine`),
  ADD KEY `FK_id_exercise` (`id_exercise`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indices de la tabla `workouts`
--
ALTER TABLE `workouts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_id_routine` (`id_routine`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `activities`
--
ALTER TABLE `activities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=212;

--
-- AUTO_INCREMENT de la tabla `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT de la tabla `exercises`
--
ALTER TABLE `exercises`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `muscles`
--
ALTER TABLE `muscles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `results`
--
ALTER TABLE `results`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=309;

--
-- AUTO_INCREMENT de la tabla `routines`
--
ALTER TABLE `routines`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT de la tabla `workouts`
--
ALTER TABLE `workouts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=126;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
