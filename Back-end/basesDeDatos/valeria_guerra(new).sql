-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-07-2025 a las 17:11:42
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

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `amount`, `status`, `payment_provider`, `payment_id`, `payment_receipt_url`, `created_at`) VALUES
(67, 15, 80000.00, 'approved', 'mercadopago', '1338519977', NULL, '2025-07-01 13:15:25'),
(68, 15, 80000.00, 'completed', 'mercadopago', '1338520055', NULL, '2025-07-01 13:31:02'),
(69, 15, 80000.00, 'approved', 'mercadopago', '1323911550', NULL, '2025-07-01 13:35:31'),
(70, 15, 56000.00, 'approved', 'mercadopago', '1323913138', NULL, '2025-07-01 13:37:53'),
(71, 15, 96000.00, 'approved', 'mercadopago', '1338535987', NULL, '2025-07-01 13:41:36'),
(72, 15, 80000.00, 'approved', 'mercadopago', '1323913088', NULL, '2025-07-01 13:46:33'),
(73, 15, 136000.00, 'approved', 'mercadopago', '1323911766', NULL, '2025-07-01 14:10:34'),
(74, 15, 168000.00, 'approved', 'mercadopago', '1338532471', NULL, '2025-07-01 14:17:09'),
(75, 15, 272000.00, 'approved', 'mercadopago', '1323911734', NULL, '2025-07-01 14:21:02');

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

--
-- Volcado de datos para la tabla `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_name`, `quantity`, `unit_price`, `product_id`) VALUES
(72, 67, 'joda', 2, 40000.00, 33),
(75, 69, 'Camisetas', 1, 40000.00, 31),
(76, 69, 'joda', 1, 40000.00, 33),
(77, 70, 'nuevo', 1, 16000.00, 34),
(78, 70, 'joda', 1, 40000.00, 33),
(79, 71, 'Camisetas', 1, 40000.00, 31),
(80, 71, 'joda', 1, 40000.00, 33),
(81, 71, 'nuevo', 1, 16000.00, 34),
(82, 72, 'Camisetas', 1, 40000.00, 31),
(83, 72, 'Camisetas', 1, 40000.00, 32),
(84, 73, 'Camisetas', 1, 40000.00, 31),
(85, 73, 'Camisetas', 1, 40000.00, 32),
(86, 73, 'joda', 1, 40000.00, 33),
(87, 73, 'nuevo', 1, 16000.00, 34),
(88, 74, 'joda', 2, 40000.00, 33),
(89, 74, 'nuevo', 3, 16000.00, 34),
(90, 74, 'Camisetas', 1, 40000.00, 32),
(91, 75, 'Camisetas', 2, 40000.00, 31),
(92, 75, 'nuevo', 2, 16000.00, 34),
(93, 75, 'joda', 4, 40000.00, 33);

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
(21, 13, '1287411847-9db4bf88-a126-4e6e-9531-aa6ee23c13f8', 40000.00, '[{\"id\":\"31\",\"nombre\":\"Camisetas\",\"precio\":40000,\"imagen\":\"1746597550647.jpeg\",\"cantidad\":1}]', '2025-06-27 05:21:34', '13'),
(22, 17, '1287411847-0e8bbb2a-babb-460c-816e-ea5407c13873', 40000.00, '[{\"id\":\"31\",\"nombre\":\"Camisetas\",\"precio\":40000,\"imagen\":\"1746597550647.jpeg\",\"cantidad\":1}]', '2025-07-01 00:03:11', '17'),
(29, 15, '1287411847-3755c5a4-8946-4c5d-8904-f82f1f3e7a03', 56000.00, '[{\"id\":\"31\",\"nombre\":\"Camisetas\",\"precio\":40000,\"imagen\":\"1746597550647.jpeg\",\"cantidad\":1},{\"id\":\"34\",\"nombre\":\"nuevo\",\"precio\":16000,\"imagen\":\"1750398938061.gif\",\"cantidad\":1}]', '2025-07-01 01:25:09', '15'),
(30, 15, '1287411847-d4d40598-da0c-4401-b13d-70db4f576797', 56000.00, '[{\"id\":\"31\",\"nombre\":\"Camisetas\",\"precio\":40000,\"imagen\":\"1746597550647.jpeg\",\"cantidad\":1},{\"id\":\"34\",\"nombre\":\"nuevo\",\"precio\":16000,\"imagen\":\"1750398938061.gif\",\"cantidad\":1}]', '2025-07-01 01:28:28', '15'),
(31, 15, '1287411847-02519f5e-d781-49df-998a-2accdf9f1146', 56000.00, '[{\"id\":\"31\",\"nombre\":\"Camisetas\",\"precio\":40000,\"imagen\":\"1746597550647.jpeg\",\"cantidad\":1},{\"id\":\"34\",\"nombre\":\"nuevo\",\"precio\":16000,\"imagen\":\"1750398938061.gif\",\"cantidad\":1}]', '2025-07-01 01:32:08', '15'),
(32, 15, '1287411847-fe6efe6d-cf27-4439-85b6-a3a3956fc1a3', 80000.00, '[{\"id\":\"32\",\"nombre\":\"Camisetas\",\"precio\":40000,\"imagen\":\"1747522502105.jpeg\",\"cantidad\":1},{\"id\":33,\"nombre\":\"joda\",\"precio\":\"40000.00\",\"imagen\":\"1748497376975.jpeg\",\"cantidad\":1}]', '2025-07-01 01:32:37', '15'),
(33, 15, '1287411847-dda37cfb-96d4-40da-b895-159c9880ab41', 80000.00, '[{\"id\":\"31\",\"nombre\":\"Camisetas\",\"precio\":40000,\"imagen\":\"1746597550647.jpeg\",\"cantidad\":1},{\"id\":\"32\",\"nombre\":\"Camisetas\",\"precio\":40000,\"imagen\":\"1747522502105.jpeg\",\"cantidad\":1}]', '2025-07-01 01:34:30', '15'),
(34, 15, '1287411847-5eb6a315-e158-48e3-96a7-78d1ff2acc3c', 136000.00, '[{\"id\":\"32\",\"nombre\":\"Camisetas\",\"precio\":40000,\"imagen\":\"1747522502105.jpeg\",\"cantidad\":2},{\"id\":\"33\",\"nombre\":\"joda\",\"precio\":40000,\"imagen\":\"1748497376975.jpeg\",\"cantidad\":1},{\"id\":\"34\",\"nombre\":\"nuevo\",\"precio\":16000,\"imagen\":\"1750398938061.gif\",\"cantidad\":1}]', '2025-07-01 01:42:25', '15'),
(35, 15, '1287411847-ad1b463e-fc08-467e-b3bd-c74d44521c45', 272000.00, '[{\"id\":\"31\",\"nombre\":\"Camisetas\",\"precio\":40000,\"imagen\":\"1746597550647.jpeg\",\"cantidad\":2},{\"id\":\"32\",\"nombre\":\"Camisetas\",\"precio\":40000,\"imagen\":\"1747522502105.jpeg\",\"cantidad\":2},{\"id\":\"33\",\"nombre\":\"joda\",\"precio\":40000,\"imagen\":\"1748497376975.jpeg\",\"cantidad\":2},{\"id\":\"34\",\"nombre\":\"nuevo\",\"precio\":16000,\"imagen\":\"1750398938061.gif\",\"cantidad\":2}]', '2025-07-01 07:49:46', '15'),
(36, 15, '1287411847-0b063da8-e1a6-4774-b3d3-5f51123a86da', 120000.00, '[{\"id\":\"31\",\"nombre\":\"Camisetas\",\"precio\":40000,\"imagen\":\"1746597550647.jpeg\",\"cantidad\":1},{\"id\":\"32\",\"nombre\":\"Camisetas\",\"precio\":40000,\"imagen\":\"1747522502105.jpeg\",\"cantidad\":1},{\"id\":\"33\",\"nombre\":\"joda\",\"precio\":40000,\"imagen\":\"1748497376975.jpeg\",\"cantidad\":1}]', '2025-07-01 08:20:40', '15'),
(37, 15, '1287411847-6e245dda-a78d-40cb-8c6a-e94a3c68f7e5', 136000.00, '[{\"id\":\"31\",\"nombre\":\"Camisetas\",\"precio\":40000,\"imagen\":\"1746597550647.jpeg\",\"cantidad\":1},{\"id\":\"32\",\"nombre\":\"Camisetas\",\"precio\":40000,\"imagen\":\"1747522502105.jpeg\",\"cantidad\":1},{\"id\":\"33\",\"nombre\":\"joda\",\"precio\":40000,\"imagen\":\"1748497376975.jpeg\",\"cantidad\":1},{\"id\":34,\"nombre\":\"nuevo\",\"precio\":\"16000.00\",\"imagen\":\"1750398938061.gif\",\"cantidad\":1}]', '2025-07-01 08:21:23', '15'),
(38, 15, '1287411847-4bcc8ed0-f713-444b-99c1-b5ed96bff9cd', 152000.00, '[{\"id\":\"31\",\"nombre\":\"Camisetas\",\"precio\":40000,\"imagen\":\"1746597550647.jpeg\",\"cantidad\":1,\"subtotal\":40000},{\"id\":\"32\",\"nombre\":\"Camisetas\",\"precio\":40000,\"imagen\":\"1747522502105.jpeg\",\"cantidad\":1,\"subtotal\":40000},{\"id\":\"33\",\"nombre\":\"joda\",\"precio\":40000,\"imagen\":\"1748497376975.jpeg\",\"cantidad\":1,\"subtotal\":40000},{\"id\":\"34\",\"nombre\":\"nuevo\",\"precio\":16000,\"imagen\":\"1750398938061.gif\",\"cantidad\":2,\"subtotal\":32000}]', '2025-07-01 08:27:56', '15'),
(39, 15, '1287411847-6f866a2c-82ef-4247-8632-ba31ad4ed371', 80000.00, '[{\"id\":\"31\",\"nombre\":\"Camisetas\",\"precio\":40000,\"imagen\":\"1746597550647.jpeg\",\"cantidad\":1},{\"id\":\"32\",\"nombre\":\"Camisetas\",\"precio\":40000,\"imagen\":\"1747522502105.jpeg\",\"cantidad\":1}]', '2025-07-01 08:34:57', '15'),
(40, 15, '1287411847-7e129761-10f2-456f-a3cb-f97252bdcf12', 136000.00, '[{\"id\":\"31\",\"nombre\":\"Camisetas\",\"precio\":40000,\"imagen\":\"1746597550647.jpeg\",\"cantidad\":1},{\"id\":\"32\",\"nombre\":\"Camisetas\",\"precio\":40000,\"imagen\":\"1747522502105.jpeg\",\"cantidad\":1},{\"id\":\"33\",\"nombre\":\"joda\",\"precio\":40000,\"imagen\":\"1748497376975.jpeg\",\"cantidad\":1},{\"id\":\"34\",\"nombre\":\"nuevo\",\"precio\":16000,\"imagen\":\"1750398938061.gif\",\"cantidad\":1}]', '2025-07-01 08:37:18', '15'),
(41, 15, '1287411847-b28ecd08-bd89-46ec-85ed-33e42584d21e', 136000.00, '[{\"id\":\"31\",\"nombre\":\"Camisetas\",\"precio\":40000,\"imagen\":\"1746597550647.jpeg\",\"cantidad\":1},{\"id\":\"32\",\"nombre\":\"Camisetas\",\"precio\":40000,\"imagen\":\"1747522502105.jpeg\",\"cantidad\":1},{\"id\":\"33\",\"nombre\":\"joda\",\"precio\":40000,\"imagen\":\"1748497376975.jpeg\",\"cantidad\":1},{\"id\":\"34\",\"nombre\":\"nuevo\",\"precio\":16000,\"imagen\":\"1750398938061.gif\",\"cantidad\":1}]', '2025-07-01 08:52:03', 'user-15-1751377923798');

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

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`, `user_id`) VALUES
('ebn5jpW60L-twixi8CbbVKPa5xu6ebid', 1751465835, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-07-02T12:49:17.997Z\",\"secure\":true,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"userId\":15}', NULL);

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
(15, 'orlandorojas2312@gmail.com', '$2b$10$gR6tTP2QNpMLTmTSIE2PreHnLyJn0Oo8wnuoU6NWEaIQJ4matBMHK'),
(17, 'orlanditorojas123@gmail.com', '$2b$10$eKtQrC5BqzyHkQO/7hEOZuVb7Gdf5JpDP8bF2dr1LYDy6CfSdBalW');

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
(15, 'Jose', 'Orlando', '', '', '', '', '', 'Usuario', 15),
(17, 'Orlando', 'Primera', '', '', '', '', '', 'Usuario', 17);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT de la tabla `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

--
-- AUTO_INCREMENT de la tabla `pending_orders`
--
ALTER TABLE `pending_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

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
