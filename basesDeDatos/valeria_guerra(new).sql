-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-03-2025 a las 02:26:35
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `valeria_guerra`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--

CREATE TABLE `administrador` (
  `id_admin` int(11) NOT NULL,
  `correo_electronico` varchar(64) NOT NULL,
  `contreseña` varchar(65) NOT NULL,
  `permiso2` enum('Usuario','Admin','Cliente','Asistente') NOT NULL,
  `nombre` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `administrador`
--

INSERT INTO `administrador` (`id_admin`, `correo_electronico`, `contreseña`, `permiso2`, `nombre`) VALUES
(1, 'valeriaguerra2341@gmail.com', '$2a$10$FKBRZB65QTlU1n3d7.izWe7wsGdUcuUzdVViIMSG/92W4p9I2JwJe', 'Admin', 'Valeria');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `categoria` varchar(30) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `Createt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`categoria`, `descripcion`, `Createt`) VALUES
('Busos', '3', '2025-02-24 12:55:08');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `color`
--

CREATE TABLE `color` (
  `color` varchar(8) NOT NULL,
  `descripcion` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `color`
--

INSERT INTO `color` (`color`, `descripcion`) VALUES
('Red', 'Rojo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisos`
--

CREATE TABLE `permisos` (
  `permiso` enum('Admin','Asistente','Usuario','Cliente','') NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `permisos`
--

INSERT INTO `permisos` (`permiso`, `descripcion`) VALUES
('', 'Persona que ya compro'),
('Admin', 'Administrador del sistema'),
('Asistente', 'Asistente de ventas'),
('Usuario', 'Usuario Normal\r\n'),
('Cliente', 'Persona que ya compro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id_producto` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `id_categoria2` varchar(30) DEFAULT NULL,
  `url_imagen` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto_color_talla`
--

CREATE TABLE `producto_color_talla` (
  `id_producto2` int(11) NOT NULL,
  `talla2` varchar(4) NOT NULL,
  `color2` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) NOT NULL,
  `expires` int(11) NOT NULL,
  `data` text DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tallas`
--

CREATE TABLE `tallas` (
  `talla` varchar(4) NOT NULL,
  `descripcion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tallas`
--

INSERT INTO `tallas` (`talla`, `descripcion`) VALUES
('L', 'Large'),
('M', 'Medium'),
('S', 'Small'),
('XL', 'Extra Large'),
('XS', 'Extra Small');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(10) NOT NULL,
  `correo_electronico` text NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `correo_electronico`, `password`) VALUES
(1, 'juna1', '$2b$10$qdeOXITNaSErmmDo721rVebMLbx7Jn/nNe20kbpy.UA.phU56GLBa'),
(2, 'juna2', '$2b$10$Yg1W2wbMAQImTbfSHgEqieq4J4GRGc6aRAsqwlY10xr7MBPNouu4O'),
(3, 'hola', '$2b$10$fmKTl6qqueuhzNOD9B9YzOggdDI23n2NZxq6vGOUUDiMqX93FK5AW'),
(7, 'orlandorojas2312@gmail.com', '$2b$10$yWzMB7HdEtPHsKSv2xVGbO3j5mwdmG2jKSD2TKy2nLbxXMq88q6we'),
(8, 'juanmiguel200516@gmail.com', '$2b$10$qJiBoZbRKyrcSLyHXwHoleBMFijIb.53cWkIuuRqT4hnbhgCJMe9q'),
(9, 'usugavaleria95@gmail.com', '$2b$10$HvbcTUB4ohj5fOaNfOdsuuYqVdxc04X9KQ4xQ0z9gTn4nPS9lTNr6');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre` tinytext NOT NULL,
  `apellido` text NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `ciudad` tinytext NOT NULL,
  `direccion` varchar(50) NOT NULL,
  `correo_electronico` varchar(64) NOT NULL,
  `contraseña` varchar(65) NOT NULL,
  `permiso1` enum('Admin','Asistente','Usuario','Cliente') NOT NULL,
  `user_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre`, `apellido`, `telefono`, `ciudad`, `direccion`, `correo_electronico`, `contraseña`, `permiso1`, `user_id`) VALUES
(1, 'Orlando', 'Primera', '', '', '', '', '', 'Usuario', 1),
(2, 'Orlando', 'Primera', '', '', '', '', '', 'Usuario', 2),
(3, 'Orlando', 'Primera', '', '', '', '', '', 'Usuario', 3),
(7, 'Orlando', 'Primera', '', '', '', '', '', 'Usuario', 7),
(8, 'Miguel', 'muñetones', '', '', '', '', '', 'Usuario', 8),
(9, 'valeria', 'usuga', '', '', '', '', '', 'Usuario', 9);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`id_admin`),
  ADD KEY `permiso2` (`permiso2`) USING BTREE;

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`categoria`);

--
-- Indices de la tabla `color`
--
ALTER TABLE `color`
  ADD PRIMARY KEY (`color`);

--
-- Indices de la tabla `permisos`
--
ALTER TABLE `permisos`
  ADD PRIMARY KEY (`permiso`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `id_categoria2` (`id_categoria2`) USING BTREE;

--
-- Indices de la tabla `producto_color_talla`
--
ALTER TABLE `producto_color_talla`
  ADD KEY `talla2` (`talla2`),
  ADD KEY `id_producto2` (`id_producto2`),
  ADD KEY `color2` (`color2`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `tallas`
--
ALTER TABLE `tallas`
  ADD PRIMARY KEY (`talla`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`correo_electronico`) USING HASH;

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `permiso1` (`permiso1`) USING BTREE,
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administrador`
--
ALTER TABLE `administrador`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD CONSTRAINT `administrador_ibfk_1` FOREIGN KEY (`permiso2`) REFERENCES `permisos` (`permiso`) ON DELETE CASCADE;

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`id_categoria2`) REFERENCES `categoria` (`categoria`) ON DELETE CASCADE;

--
-- Filtros para la tabla `producto_color_talla`
--
ALTER TABLE `producto_color_talla`
  ADD CONSTRAINT `producto_color_talla_ibfk_1` FOREIGN KEY (`id_producto2`) REFERENCES `producto` (`id_producto`),
  ADD CONSTRAINT `producto_color_talla_ibfk_2` FOREIGN KEY (`talla2`) REFERENCES `tallas` (`talla`),
  ADD CONSTRAINT `producto_color_talla_ibfk_3` FOREIGN KEY (`color2`) REFERENCES `color` (`color`);

--
-- Filtros para la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`permiso1`) REFERENCES `permisos` (`permiso`) ON DELETE CASCADE,
  ADD CONSTRAINT `usuario_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
