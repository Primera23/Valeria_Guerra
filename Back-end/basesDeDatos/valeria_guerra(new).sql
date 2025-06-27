-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-06-2025 a las 12:11:13
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
(20, 13, '1287411847-009c2ebf-fefd-497e-b2e0-ecc5dcb0e4c0', 40000.00, '[{\"id\":\"31\",\"nombre\":\"Camisetas\",\"precio\":40000,\"imagen\":\"1746597550647.jpeg\",\"cantidad\":1}]', '2025-06-27 04:58:43', '13');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `pending_orders`
--
ALTER TABLE `pending_orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `preference_id` (`preference_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `pending_orders`
--
ALTER TABLE `pending_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
