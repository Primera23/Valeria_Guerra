-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-07-2024 a las 22:36:26
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
-- Base de datos: `valeriaguerra`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteCategoria` (IN `cat` VARCHAR(25))   BEGIN
    DELETE FROM categoria WHERE categoria = cat;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertCategoria` (IN `categoria` VARCHAR(25), IN `descripcion` VARCHAR(200))   BEGIN
    INSERT INTO categoria (categoria, Descripcion) VALUES (categoria, descripcion);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SelectCategoria` ()   BEGIN
    SELECT * FROM categoria;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateCategoria` (IN `p_categoria` VARCHAR(25), IN `p_descripcion` VARCHAR(200))   BEGIN
    UPDATE categoria SET Descripcion = p_descripcion WHERE categoria = p_categoria;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `categoria` varchar(25) NOT NULL,
  `Descripcion` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`categoria`, `Descripcion`) VALUES
('Hombres', 'Ropa para hombres'),
('Mujeres', 'Ropa para mujeres'),
('Niños', 'Ropa para niños');

--
-- Disparadores `categoria`
--
DELIMITER $$
CREATE TRIGGER `before_delete_categoria` BEFORE DELETE ON `categoria` FOR EACH ROW BEGIN
  SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No se puede eliminar una categoría que está en uso';
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_insert_categoria` BEFORE INSERT ON `categoria` FOR EACH ROW BEGIN
  IF NEW.Descripcion = '' THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La descripción no puede estar vacía';
  END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_update_categoria` BEFORE UPDATE ON `categoria` FOR EACH ROW BEGIN
  IF NEW.Descripcion = '' THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La descripción no puede estar vacía';
  END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

CREATE TABLE `factura` (
  `cod_fac` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `id_cliente1` int(11) NOT NULL,
  `tarjeta_credito1` bigint(20) NOT NULL,
  `id_pedido` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `factura`
--

INSERT INTO `factura` (`cod_fac`, `fecha`, `id_cliente1`, `tarjeta_credito1`, `id_pedido`) VALUES
(1, '2024-06-22', 1, 1234567890123456, 1),
(2, '2024-06-23', 2, 9876543210987654, 2);

--
-- Disparadores `factura`
--
DELIMITER $$
CREATE TRIGGER `before_insert_factura` BEFORE INSERT ON `factura` FOR EACH ROW BEGIN
    DECLARE client_count INT;
    DECLARE card_count INT;

    -- Verificar si el cliente existe
    SELECT COUNT(*) INTO client_count 
    FROM usuario 
    WHERE id_usuario = NEW.id_cliente1;
    
    IF client_count = 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'El cliente no existe';
    END IF;

    -- Verificar si la tarjeta de crédito existe
    SELECT COUNT(*) INTO card_count 
    FROM metodo_pago 
    WHERE tarjeta_credito = NEW.tarjeta_credito1;
    
    IF card_count = 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'La tarjeta de crédito no existe';
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `facturas_recientes`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `facturas_recientes` (
`cod_fac` int(11)
,`fecha` date
,`id_cliente1` int(11)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `login`
--

CREATE TABLE `login` (
  `id_login` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fecha_hora` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `login`
--

INSERT INTO `login` (`id_login`, `id_usuario`, `fecha_hora`) VALUES
(1, 1, '2024-06-22 10:00:00'),
(2, 2, '2024-06-22 11:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metodo_pago`
--

CREATE TABLE `metodo_pago` (
  `tarjeta_credito` bigint(20) NOT NULL,
  `tipo_tarjeta` enum('nequi','bancolombia','daviplata','visa') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `metodo_pago`
--

INSERT INTO `metodo_pago` (`tarjeta_credito`, `tipo_tarjeta`) VALUES
(1234567890123456, 'visa'),
(9876543210987654, 'bancolombia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `id_pedido` int(11) NOT NULL,
  `Ciudad_Envío` tinytext DEFAULT NULL,
  `Dirección_envío` varchar(200) NOT NULL,
  `Fecha_Entrega` date NOT NULL,
  `Estado` enum('pendiente','confirmado','enviado','entregado') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`id_pedido`, `Ciudad_Envío`, `Dirección_envío`, `Fecha_Entrega`, `Estado`) VALUES
(1, 'Madrid', 'Calle Mayor 1', '2024-07-01', 'pendiente'),
(2, 'Barcelona', 'Avenida Diagonal 20', '2024-07-05', 'confirmado');

--
-- Disparadores `pedido`
--
DELIMITER $$
CREATE TRIGGER `before_insert_pedido` BEFORE INSERT ON `pedido` FOR EACH ROW BEGIN
    IF NEW.Estado NOT IN ('pendiente', 'confirmado', 'enviado', 'entregado') THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El estado del pedido no es válido';
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_update_pedido` BEFORE UPDATE ON `pedido` FOR EACH ROW BEGIN
    IF NEW.Estado NOT IN ('pendiente', 'confirmado', 'enviado', 'entregado') THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El estado del pedido no es válido';
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido_factura`
--

CREATE TABLE `pedido_factura` (
  `id_pedido` int(11) NOT NULL,
  `cod_fac` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedido_factura`
--

INSERT INTO `pedido_factura` (`id_pedido`, `cod_fac`) VALUES
(1, 1),
(2, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisos`
--

CREATE TABLE `permisos` (
  `id_permiso` int(11) NOT NULL,
  `nombre_permiso` enum('Admin','Asistente','Usuario','') NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `permisos`
--

INSERT INTO `permisos` (`id_permiso`, `nombre_permiso`, `descripcion`) VALUES
(1, 'Admin', 'Administrador del sistema'),
(2, 'Asistente', 'Asistente de ventas'),
(3, 'Usuario', 'Usuario registrado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id_producto` int(11) NOT NULL,
  `Valor` double NOT NULL,
  `Cantidad` int(11) NOT NULL,
  `categoria` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id_producto`, `Valor`, `Cantidad`, `categoria`) VALUES
(1, 49.99, 100, 'Mujeres'),
(2, 59.99, 50, 'Hombres');

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `productos_menor_valor`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `productos_menor_valor` (
`id_producto` int(11)
,`Valor` double
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto_factura`
--

CREATE TABLE `producto_factura` (
  `id_producto` int(11) NOT NULL,
  `cod_fac` int(11) NOT NULL,
  `Precio_total` decimal(18,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto_factura`
--

INSERT INTO `producto_factura` (`id_producto`, `cod_fac`, `Precio_total`) VALUES
(1, 1, 50),
(2, 2, 120);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `total_ventas_por_categoria`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `total_ventas_por_categoria` (
`categoria` varchar(25)
,`total_ventas` double
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `ultima_compra_cliente`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `ultima_compra_cliente` (
`Nombre` tinytext
,`apellido` tinytext
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `Nombre` tinytext NOT NULL,
  `apellido` tinytext NOT NULL,
  `Telefono` int(20) NOT NULL,
  `Ciudad` tinytext NOT NULL,
  `Direccion` varchar(50) NOT NULL,
  `correo_electronico` varchar(64) NOT NULL,
  `id_permiso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `Nombre`, `apellido`, `Telefono`, `Ciudad`, `Direccion`, `correo_electronico`, `id_permiso`) VALUES
(1, 'Juan', 'Pérez', 600123456, 'Madrid', 'Calle Gran Vía 45', 'juan.perez@example.com', 1),
(2, 'María', 'López', 600654321, 'Barcelona', 'Calle Aragón 150', 'maria.lopez@example.com', 2);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vista_clientes_pedidos`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vista_clientes_pedidos` (
`id_usuario` int(11)
,`Nombre` tinytext
,`apellido` tinytext
,`Ciudad` tinytext
,`Direccion` varchar(50)
,`correo_electronico` varchar(64)
,`id_pedido` int(11)
,`Ciudad_Envío` tinytext
,`Dirección_envío` varchar(200)
,`Fecha_Entrega` date
,`Estado` enum('pendiente','confirmado','enviado','entregado')
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vista_factura_detallada`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vista_factura_detallada` (
`cod_fac` int(11)
,`fecha` date
,`cliente_nombre` tinytext
,`cliente_apellido` tinytext
,`metodo_pago` enum('nequi','bancolombia','daviplata','visa')
,`id_pedido` int(11)
,`Ciudad_Envío` tinytext
,`Dirección_envío` varchar(200)
,`Fecha_Entrega` date
,`Estado` enum('pendiente','confirmado','enviado','entregado')
,`id_producto` int(11)
,`precio_producto` double
,`Precio_total` decimal(18,0)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vista_metodos_pago`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vista_metodos_pago` (
`tarjeta_credito` bigint(20)
,`tipo_tarjeta` enum('nequi','bancolombia','daviplata','visa')
,`cod_fac` int(11)
,`fecha` date
,`cliente_nombre` tinytext
,`cliente_apellido` tinytext
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vista_pedidos_estado`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vista_pedidos_estado` (
`id_pedido` int(11)
,`Ciudad_Envío` tinytext
,`Dirección_envío` varchar(200)
,`Fecha_Entrega` date
,`Estado` enum('pendiente','confirmado','enviado','entregado')
,`cliente_nombre` tinytext
,`cliente_apellido` tinytext
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `vista_productos_categoria`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `vista_productos_categoria` (
`categoria` varchar(25)
,`Descripcion` varchar(200)
,`id_producto` int(11)
,`Valor` double
,`Cantidad` int(11)
);

-- --------------------------------------------------------

--
-- Estructura para la vista `facturas_recientes`
--
DROP TABLE IF EXISTS `facturas_recientes`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `facturas_recientes`  AS SELECT `f`.`cod_fac` AS `cod_fac`, `f`.`fecha` AS `fecha`, `f`.`id_cliente1` AS `id_cliente1` FROM `factura` AS `f` WHERE `f`.`fecha` >= curdate() - interval 30 day ;

-- --------------------------------------------------------

--
-- Estructura para la vista `productos_menor_valor`
--
DROP TABLE IF EXISTS `productos_menor_valor`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `productos_menor_valor`  AS SELECT `producto`.`id_producto` AS `id_producto`, `producto`.`Valor` AS `Valor` FROM `producto` WHERE `producto`.`Valor` = (select min(`producto`.`Valor`) from `producto`) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `total_ventas_por_categoria`
--
DROP TABLE IF EXISTS `total_ventas_por_categoria`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `total_ventas_por_categoria`  AS SELECT `producto`.`categoria` AS `categoria`, sum(`producto`.`Valor` * `producto`.`Cantidad`) AS `total_ventas` FROM `producto` GROUP BY `producto`.`categoria` ;

-- --------------------------------------------------------

--
-- Estructura para la vista `ultima_compra_cliente`
--
DROP TABLE IF EXISTS `ultima_compra_cliente`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `ultima_compra_cliente`  AS SELECT `usuario`.`Nombre` AS `Nombre`, `usuario`.`apellido` AS `apellido` FROM `usuario` WHERE `usuario`.`id_usuario` = (select `factura`.`id_cliente1` from `factura` order by `factura`.`fecha` desc limit 1) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vista_clientes_pedidos`
--
DROP TABLE IF EXISTS `vista_clientes_pedidos`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_clientes_pedidos`  AS SELECT `u`.`id_usuario` AS `id_usuario`, `u`.`Nombre` AS `Nombre`, `u`.`apellido` AS `apellido`, `u`.`Ciudad` AS `Ciudad`, `u`.`Direccion` AS `Direccion`, `u`.`correo_electronico` AS `correo_electronico`, `p`.`id_pedido` AS `id_pedido`, `p`.`Ciudad_Envío` AS `Ciudad_Envío`, `p`.`Dirección_envío` AS `Dirección_envío`, `p`.`Fecha_Entrega` AS `Fecha_Entrega`, `p`.`Estado` AS `Estado` FROM ((`usuario` `u` join `factura` `f` on(`u`.`id_usuario` = `f`.`id_cliente1`)) join `pedido` `p` on(`f`.`id_pedido` = `p`.`id_pedido`)) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vista_factura_detallada`
--
DROP TABLE IF EXISTS `vista_factura_detallada`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_factura_detallada`  AS SELECT `f`.`cod_fac` AS `cod_fac`, `f`.`fecha` AS `fecha`, `u`.`Nombre` AS `cliente_nombre`, `u`.`apellido` AS `cliente_apellido`, `mp`.`tipo_tarjeta` AS `metodo_pago`, `p`.`id_pedido` AS `id_pedido`, `p`.`Ciudad_Envío` AS `Ciudad_Envío`, `p`.`Dirección_envío` AS `Dirección_envío`, `p`.`Fecha_Entrega` AS `Fecha_Entrega`, `p`.`Estado` AS `Estado`, `pf`.`id_producto` AS `id_producto`, `pr`.`Valor` AS `precio_producto`, `pf`.`Precio_total` AS `Precio_total` FROM (((((`factura` `f` join `usuario` `u` on(`f`.`id_cliente1` = `u`.`id_usuario`)) join `metodo_pago` `mp` on(`f`.`tarjeta_credito1` = `mp`.`tarjeta_credito`)) join `pedido` `p` on(`f`.`id_pedido` = `p`.`id_pedido`)) join `producto_factura` `pf` on(`f`.`cod_fac` = `pf`.`cod_fac`)) join `producto` `pr` on(`pf`.`id_producto` = `pr`.`id_producto`)) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vista_metodos_pago`
--
DROP TABLE IF EXISTS `vista_metodos_pago`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_metodos_pago`  AS SELECT `mp`.`tarjeta_credito` AS `tarjeta_credito`, `mp`.`tipo_tarjeta` AS `tipo_tarjeta`, `f`.`cod_fac` AS `cod_fac`, `f`.`fecha` AS `fecha`, `u`.`Nombre` AS `cliente_nombre`, `u`.`apellido` AS `cliente_apellido` FROM ((`metodo_pago` `mp` join `factura` `f` on(`mp`.`tarjeta_credito` = `f`.`tarjeta_credito1`)) join `usuario` `u` on(`f`.`id_cliente1` = `u`.`id_usuario`)) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vista_pedidos_estado`
--
DROP TABLE IF EXISTS `vista_pedidos_estado`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_pedidos_estado`  AS SELECT `p`.`id_pedido` AS `id_pedido`, `p`.`Ciudad_Envío` AS `Ciudad_Envío`, `p`.`Dirección_envío` AS `Dirección_envío`, `p`.`Fecha_Entrega` AS `Fecha_Entrega`, `p`.`Estado` AS `Estado`, `u`.`Nombre` AS `cliente_nombre`, `u`.`apellido` AS `cliente_apellido` FROM ((`pedido` `p` join `factura` `f` on(`p`.`id_pedido` = `f`.`id_pedido`)) join `usuario` `u` on(`f`.`id_cliente1` = `u`.`id_usuario`)) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vista_productos_categoria`
--
DROP TABLE IF EXISTS `vista_productos_categoria`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista_productos_categoria`  AS SELECT `c`.`categoria` AS `categoria`, `c`.`Descripcion` AS `Descripcion`, `p`.`id_producto` AS `id_producto`, `p`.`Valor` AS `Valor`, `p`.`Cantidad` AS `Cantidad` FROM (`categoria` `c` join `producto` `p` on(`c`.`categoria` = `p`.`categoria`)) ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`categoria`);

--
-- Indices de la tabla `factura`
--
ALTER TABLE `factura`
  ADD PRIMARY KEY (`cod_fac`),
  ADD KEY `id_cliente1` (`id_cliente1`),
  ADD KEY `tarjeta_credito1` (`tarjeta_credito1`),
  ADD KEY `id_pedido` (`id_pedido`);

--
-- Indices de la tabla `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id_login`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `metodo_pago`
--
ALTER TABLE `metodo_pago`
  ADD PRIMARY KEY (`tarjeta_credito`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`id_pedido`);

--
-- Indices de la tabla `pedido_factura`
--
ALTER TABLE `pedido_factura`
  ADD PRIMARY KEY (`id_pedido`,`cod_fac`),
  ADD KEY `cod_fac` (`cod_fac`);

--
-- Indices de la tabla `permisos`
--
ALTER TABLE `permisos`
  ADD PRIMARY KEY (`id_permiso`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `categoria` (`categoria`);

--
-- Indices de la tabla `producto_factura`
--
ALTER TABLE `producto_factura`
  ADD PRIMARY KEY (`id_producto`,`cod_fac`),
  ADD KEY `cod_fac` (`cod_fac`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `id_permiso` (`id_permiso`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `factura`
--
ALTER TABLE `factura`
  MODIFY `cod_fac` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `login`
--
ALTER TABLE `login`
  MODIFY `id_login` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `permisos`
--
ALTER TABLE `permisos`
  MODIFY `id_permiso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `factura`
--
ALTER TABLE `factura`
  ADD CONSTRAINT `factura_ibfk_1` FOREIGN KEY (`id_cliente1`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `factura_ibfk_2` FOREIGN KEY (`tarjeta_credito1`) REFERENCES `metodo_pago` (`tarjeta_credito`),
  ADD CONSTRAINT `factura_ibfk_3` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`);

--
-- Filtros para la tabla `login`
--
ALTER TABLE `login`
  ADD CONSTRAINT `login_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `pedido_factura`
--
ALTER TABLE `pedido_factura`
  ADD CONSTRAINT `pedido_factura_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`),
  ADD CONSTRAINT `pedido_factura_ibfk_2` FOREIGN KEY (`cod_fac`) REFERENCES `factura` (`cod_fac`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`categoria`) REFERENCES `categoria` (`categoria`);

--
-- Filtros para la tabla `producto_factura`
--
ALTER TABLE `producto_factura`
  ADD CONSTRAINT `producto_factura_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`),
  ADD CONSTRAINT `producto_factura_ibfk_2` FOREIGN KEY (`cod_fac`) REFERENCES `factura` (`cod_fac`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_permiso`) REFERENCES `permisos` (`id_permiso`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
