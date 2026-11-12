
-- ============================================
-- CREACION DE LA BASE DE DATOS
-- ============================================

CREATE DATABASE IF NOT EXISTS autoservicio_technox_db;

USE autoservicio_technox_db;


-- ============================================
-- TABLA: PRODUCTOS
-- ============================================

CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    imagen VARCHAR(255),
    categoria VARCHAR(50) NOT NULL,
    activo BOOLEAN DEFAULT TRUE
);


-- ============================================
-- TABLA: ADMINISTRADORES
-- ============================================

CREATE TABLE administradores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(100) NOT NULL UNIQUE,
    contrasenia VARCHAR(255) NOT NULL
);


-- ============================================
-- TABLA: VENTAS
-- ============================================

CREATE TABLE ventas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_cliente VARCHAR(100) NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2) NOT NULL
);


-- ============================================
-- TABLA: DETALLE_VENTAS
-- ============================================

CREATE TABLE detalle_ventas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    venta_id INT NOT NULL,
    producto_id INT NOT NULL,
    nombre_producto VARCHAR(100) NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    cantidad INT NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,

    CONSTRAINT fk_detalle_venta
        FOREIGN KEY (venta_id) REFERENCES ventas(id),

    CONSTRAINT fk_detalle_producto
        FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- ============================================
-- VERIFICACION
-- ============================================

SHOW TABLES;


-- ============================================
-- INGRESO DE DATOS
-- ============================================

INSERT INTO productos (nombre, precio, imagen, categoria, activo)
VALUES
('Motorola Moto G77', 900000, 'https://tiendaonline.movistar.com.ar/media/catalog/product/cache/d24a34bded6d2df740ef66d66d2112c9/f/1/f1-g77-black-olive_1.png', 'celular', TRUE),
('Funda Moto G77', 13000, 'https://http2.mlstatic.com/D_NQ_NP_2X_770611-MLA115265859969_072026-F.webp', 'funda', TRUE),
('Samsung Galaxy A07', 230000, 'https://tiendaonline.movistar.com.ar/media/catalog/product/cache/d24a34bded6d2df740ef66d66d2112c9/s/a/samsung-a07-green-frente-dorso.png', 'celular', TRUE),
('Funda Galaxy A07', 8000, 'https://http2.mlstatic.com/D_NQ_NP_2X_821007-MLA92519355209_092025-F.webp', 'funda', TRUE),
('iPhone 17 Pro', 2000000, 'https://tiendaonline.movistar.com.ar/media/catalog/product/cache/d24a34bded6d2df740ef66d66d2112c9/i/p/iphone17pro-silver-hero.png', 'celular', TRUE),
('Funda iPhone 17 Pro', 20000, 'https://http2.mlstatic.com/D_NQ_NP_2X_833334-MLA99726643994_122025-F.webp', 'funda', TRUE),
('Motorola Edge 70 Fusion', 1000000, 'https://tiendaonline.movistar.com.ar/media/catalog/product/cache/d24a34bded6d2df740ef66d66d2112c9/f/1/f1-edge70fusion-country-air-_celeste_.png', 'celular', TRUE),
('Funda Edge 70 Fusion', 15000, 'https://tse4.mm.bing.net/th/id/OIP.ycB6vnqlCf-gqlIS5D3EmAHaL2?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', 'funda', TRUE),
('Samsung Galaxy S25 Ultra', 3000000, 'https://tiendaonline.movistar.com.ar/media/catalog/product/cache/d24a34bded6d2df740ef66d66d2112c9/s/2/s25-titaniumblue-device.png', 'celular', TRUE),
('Funda Galaxy S25 Ultra', 16000, 'https://http2.mlstatic.com/D_NQ_NP_2X_630666-CBT116473594339_082026-F.webp', 'funda', TRUE),
('Motorola Razr 70', 2000000, 'https://tiendaonline.movistar.com.ar/media/catalog/product/cache/d24a34bded6d2df740ef66d66d2112c9/f/1/f1-razr70-hematite_1.png', 'celular', TRUE),
('Funda Razr 70', 50000, 'https://http2.mlstatic.com/D_NQ_NP_2X_688967-CBT120837934721_112026-F.webp', 'funda', TRUE),
('Motorola Signature', 2500000, 'https://tiendaonline.movistar.com.ar/media/catalog/product/cache/d24a34bded6d2df740ef66d66d2112c9/f/1/f1-moto-signature-carbono.png', 'celular', TRUE),
('Funda Signature', 19000, 'https://http2.mlstatic.com/D_NQ_NP_2X_637039-MLA110955918077_042026-F.webp', 'funda', TRUE),
('TCL K70 Power', 200000, 'https://tiendaonline.movistar.com.ar/media/catalog/product/cache/d24a34bded6d2df740ef66d66d2112c9/t/c/tcl-k70-power-spacegray-front-a.png', 'celular', TRUE),
('Funda TCL K70 Power', 10000, 'https://http2.mlstatic.com/D_NQ_NP_2X_659821-MLA114974747095_072026-F.webp', 'funda', TRUE),
('TCL NXTPAPER 70 Pro', 600000, 'https://tiendaonline.movistar.com.ar/media/catalog/product/cache/d24a34bded6d2df740ef66d66d2112c9/t/c/tcl-nxpaper-70pro-stellarblue-front_wall-paper_name__1.png', 'celular', TRUE),
('Funda TCL NXTPAPER 70 Pro', 15000, 'https://http2.mlstatic.com/D_NQ_NP_2X_611694-MLA118513303021_092026-F.webp', 'funda', TRUE),
('Xiaomi Redmi 15C', 400000, 'https://tiendaonline.movistar.com.ar/media/catalog/product/cache/d24a34bded6d2df740ef66d66d2112c9/r/e/redmi15c-verde-back.png', 'celular', TRUE),
('Funda Xiaomi Redmi 15C', 6000, 'https://http2.mlstatic.com/D_NQ_NP_2X_814632-MLA114436445568_082026-F.webp', 'funda', TRUE),
('Motorola Moto G86', 600000, 'https://www.electromisiones.com.ar/47168-large_default/celular_motorola_g86_5g_8gb_ram_256gb_azul_con_cargador.jpg', 'celular', TRUE),
('Funda Moto G86', 12000, 'https://www.yourgadget.co.uk/cdn/shop/files/B6_d3389740-8595-45cd-bca8-cae90d924391.jpg?v=1752058317&width=1500', 'funda', TRUE),
('Samsung Galaxy A17', 420000, 'https://i5.walmartimages.cl/asr/75501dc7-690a-4177-989c-e6d0055b31f5.2074e0b8313f20ed6fb29493da696485.jpeg', 'celular', TRUE),
('Funda Galaxy A17', 8000, 'https://www.akashi.fr/15553-thickbox_default/coque-anti-chocs-transparente-avec-angles-ultra-renforces-samsung-galaxy-a17.jpg', 'funda', TRUE),
('Xiaomi Redmi Note 14 Pro', 980000, 'https://s13emagst.akamaized.net/products/84223/84222412/images/res_e31acb840a572e641a8c234ffdf864e2.jpg', 'celular', TRUE),
('Funda Redmi Note 14 Pro', 10000, 'https://pk-live-21.slatic.net/kf/S1fd418ae3e8342dca7840f3a58dd6500I.jpg', 'funda', TRUE),
('Honor X7d', 500000, 'https://lcdn.altex.ro/media/catalog/product/h/o/honor_x7d_gold_01_2e9d190b.jpg', 'celular', TRUE),
('Funda Honor X7d', 9000, 'https://down-th.img.susercontent.com/file/sg-11134202-825zl-mjsdvnks7m6d97', 'funda', TRUE),
('Samsung Galaxy A36 5G', 850000, 'https://i5.walmartimages.com/seo/Samsung-Galaxy-A36-5G-128GB-8GB-RAM-Android-Smartphone-Global-Version-Unlocked-Awesome-Black_6851bd15-6295-4e41-bd19-f8a81ce74edc.b01ab17bd0f5101a09a5ae5730ce44c7.jpeg', 'celular', TRUE),
('Funda Galaxy A36', 35000, 'https://images.samsung.com/is/image/samsung/p6pim/ar/ef-qa366ctegww/gallery/ar-galaxy-a36-5g-clear-case-ef-qa366-ef-qa366ctegww-548574810?$1164_776_PNG$', 'funda', TRUE),
('Motorola Edge 60 Fusion', 800000, 'https://i5.walmartimages.cl/asr/715b5005-7913-4bb2-b603-8151f8e359f7.4e4fa44a3a38eba44dbc2760dc3e3e76.jpeg?null', 'celular', TRUE),
('Funda Edge 60 Fusion', 15000, 'https://m.media-amazon.com/images/I/71q3Vsqy1zL._AC_SL1500_.jpg', 'funda', TRUE),
('Motorola Moto G75 5G', 650000, 'https://i5-mx.walmartimages.com/mg/gm/1p/images/product-images/img_large/00084002327414l.jpg', 'celular', TRUE),
('Funda Moto G75', 12000, 'https://m.media-amazon.com/images/I/61gMa1VcNeL._AC_SL1500_.jpg', 'funda', TRUE),
('Xiaomi Redmi Note 14', 550000, 'https://hifimediastore.com/cdn/shop/files/20731.jpg?v=1737154530&width=1200', 'celular', TRUE),
('Funda Redmi Note 14', 10000, 'https://http2.mlstatic.com/D_NQ_NP_834100-MLM85255613414_062025-O.webp', 'funda', TRUE),
('POCO X7', 700000, 'https://img.mobilebazar24.com/img/p/xiaomi-poco-x7.webp', 'celular', TRUE),
('Funda POCO X7', 12000, 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MP_149845371/fee_786_587_png', 'funda', TRUE),
('Samsung Galaxy A26 5G', 700000, 'https://tse1.mm.bing.net/th/id/OIP.u5VOjCKm5NOgEIpBCvdd_wHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', 'celular', TRUE),
('Funda Galaxy A26', 10000, 'https://media.ldlc.com/r1600/ld/products/00/06/22/48/LD0006224896.jpg', 'funda', TRUE);