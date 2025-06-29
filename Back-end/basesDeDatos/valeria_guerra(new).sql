-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-06-2025 a las 23:42:03
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
  `contraseña` varchar(65) NOT NULL,
  `permiso2` enum('Usuario','Admin','Cliente','Asistente') NOT NULL,
  `nombre` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `administrador`
--

INSERT INTO `administrador` (`id_admin`, `correo_electronico`, `contraseña`, `permiso2`, `nombre`) VALUES
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
('4', 'hombre', '2025-05-05 08:14:38'),
('regueton', '3', '2025-05-05 08:16:54');

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
('rojo', 'rojo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `payment_provider` varchar(50) DEFAULT NULL,
  `payment_id` varchar(100) DEFAULT NULL,
  `payment_receipt_url` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `unit_price` decimal(10,2) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pending_orders`
--

CREATE TABLE `pending_orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `preference_id` varchar(100) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `items` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`items`)),
  `created_at` datetime DEFAULT current_timestamp(),
  `external_reference` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pending_orders`
--

INSERT INTO `pending_orders` (`id`, `user_id`, `preference_id`, `total`, `items`, `created_at`, `external_reference`) VALUES
(17, 13, '1287411847-2db9c231-14a5-40c1-9e34-503b07dca000', 40000.00, '[{\"id\":\"31\",\"nombre\":\"Camisetas\",\"precio\":40000,\"imagen\":\"1746597550647.jpeg\",\"cantidad\":1}]', '2025-06-27 04:38:22', '13'),
(18, 13, '1287411847-d9a659e0-02cb-4176-a322-9622a5cff840', 40000.00, '[{\"id\":\"31\",\"nombre\":\"Camisetas\",\"precio\":40000,\"imagen\":\"1746597550647.jpeg\",\"cantidad\":1}]', '2025-06-27 04:49:37', '13'),
(19, 13, '1287411847-c7782323-f4db-48ec-9571-d7f5c7e72285', 40000.00, '[{\"id\":\"31\",\"nombre\":\"Camisetas\",\"precio\":40000,\"imagen\":\"1746597550647.jpeg\",\"cantidad\":1}]', '2025-06-27 04:55:04', '13'),
(20, 13, '1287411847-009c2ebf-fefd-497e-b2e0-ecc5dcb0e4c0', 40000.00, '[{\"id\":\"31\",\"nombre\":\"Camisetas\",\"precio\":40000,\"imagen\":\"1746597550647.jpeg\",\"cantidad\":1}]', '2025-06-27 04:58:43', '13'),
(21, 13, '1287411847-9db4bf88-a126-4e6e-9531-aa6ee23c13f8', 40000.00, '[{\"id\":\"31\",\"nombre\":\"Camisetas\",\"precio\":40000,\"imagen\":\"1746597550647.jpeg\",\"cantidad\":1}]', '2025-06-27 05:21:34', '13');

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
  `url_imagen` varchar(255) NOT NULL,
  `estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id_producto`, `nombre`, `descripcion`, `precio`, `id_categoria2`, `url_imagen`, `estado`) VALUES
(31, 'Camisetas', '12346789', 40000.00, 'regueton', '1746597550647.jpeg', 1),
(32, 'Camisetas', 'e', 40000.00, 'regueton', '1747522502105.jpeg', 1),
(33, 'joda', 'negra', 40000.00, '4', '1748497376975.jpeg', 1),
(34, 'nuevo', 'camiseta', 16000.00, 'regueton', '1750398938061.gif', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto_color_talla`
--

CREATE TABLE `producto_color_talla` (
  `id_producto2` int(11) NOT NULL,
  `talla2` varchar(4) NOT NULL,
  `color2` varchar(8) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto_color_talla`
--

INSERT INTO `producto_color_talla` (`id_producto2`, `talla2`, `color2`, `cantidad`) VALUES
(31, 'L', 'rojo', 1),
(33, 'L', 'rojo', 12),
(34, 'L', 'rojo', 12);

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
(15, 'orlandorojas2312@gmail.com', '$2b$10$gR6tTP2QNpMLTmTSIE2PreHnLyJn0Oo8wnuoU6NWEaIQJ4matBMHK');

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
(15, 'Jose', 'Orlando', '', '', '', '', '', 'Usuario', 15);

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
  ADD PRIMARY KEY (`categoria`) USING BTREE;

--
-- Indices de la tabla `color`
--
ALTER TABLE `color`
  ADD PRIMARY KEY (`color`);

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indices de la tabla `pending_orders`
--
ALTER TABLE `pending_orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `preference_id` (`preference_id`);

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
  ADD KEY `id_producto2` (`id_producto2`),
  ADD KEY `color2` (`color2`),
  ADD KEY `producto_color_talla_ibfk_2` (`talla2`);

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
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT de la tabla `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT de la tabla `pending_orders`
--
ALTER TABLE `pending_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD CONSTRAINT `administrador_ibfk_1` FOREIGN KEY (`permiso2`) REFERENCES `permisos` (`permiso`) ON DELETE CASCADE;

--
-- Filtros para la tabla `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `producto` (`id_producto`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`id_categoria2`) REFERENCES `categoria` (`categoria`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `producto_color_talla`
--
ALTER TABLE `producto_color_talla`
  ADD CONSTRAINT `producto_color_talla_ibfk_1` FOREIGN KEY (`id_producto2`) REFERENCES `producto` (`id_producto`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `producto_color_talla_ibfk_2` FOREIGN KEY (`talla2`) REFERENCES `tallas` (`talla`) ON UPDATE CASCADE,
  ADD CONSTRAINT `producto_color_talla_ibfk_3` FOREIGN KEY (`color2`) REFERENCES `color` (`color`) ON UPDATE CASCADE;

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

DELIMITER $$
--
-- Eventos
--
CREATE DEFINER=`root`@`localhost` EVENT `limpiar_ordenes_pendientes` ON SCHEDULE EVERY 1 DAY STARTS '2025-06-27 01:14:42' ON COMPLETION NOT PRESERVE ENABLE DO DELETE FROM pending_orders WHERE created_at < NOW() - INTERVAL 1 DAY$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
