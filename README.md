# Cafetería Konecta - Sistema de Gestión de Inventario

Sistema de gestión de inventario desarrollado para las cafeterías de Konecta, implementado con React en el frontend y Node.js/Express en el backend. El sistema permite la administración completa de productos (CRUD) y gestión de ventas, actualizando el stock en tiempo real y manteniendo un registro de transacciones. La comunicación entre frontend y backend se realiza mediante API REST, garantizando una arquitectura escalable y mantenible.

## Backend

El backend esta desarrollado en Node.js como parte del `Cafetería Konecta - Sistema de Gestión de Inventario`. Proporciona una API REST para realizar operaciones sobre una base de datos.

### Tecnologías utilizadas

- `Node.js:` Entorno de ejecución para JavaScript.  

- `Express:` Framework para construir la API.  

- `MySQL:` Sistema de gestión de bases de datos relacional.  

- `Cors:` Manejo de políticas de CORS.  

- `Joi:` Validación de datos.  

- `Nodemon:` Herramienta de desarrollo para reiniciar el servidor automáticamente.  

### Requisitos previos  

1. Tener instalado `Node.js`  
2. Tener instalado `MySQL.`
3. Instalar un gestor de dependencias como `npm (incluido con Node.js).`


### Instalación

1. Clona el repositorio:
~~~
git clone https://github.com/sebas-777/TestKonecta.git
~~~

2. Navega al directorio del proyecto:
~~~
cd TestKonecta/backend
~~~

3. Instala las dependencias:
~~~
npm install
~~~

### Configuración de la base de datos

1. Crear la base de datos:

~~~ 
CREATE DATABASE testdb;
~~~

2. Crear la tabla productos:

~~~
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_producto VARCHAR(255) NOT NULL,
    referencia VARCHAR(255) NOT NULL,
    precio INT NOT NULL,
    peso INT NOT NULL,
    categoria VARCHAR(255) NOT NULL,
    stock INT NOT NULL,
    fecha_creacion DATE NOT NULL
);
~~~

3. Crear la tabla ventas:

~~~
CREATE TABLE ventas (
    id_venta INT NOT NULL AUTO_INCREMENT,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    fecha_venta DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_venta),
    KEY producto_id (producto_id),
    CONSTRAINT ventas_ibfk_1 FOREIGN KEY (producto_id) REFERENCES productos (id)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
~~~

4. Configura las credenciales de conexión en el archivo server.js:
~~~
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testdb',
});
~~~
### Ejecución

Para iniciar el servidor, utiliza el siguiente comando:
~~~
npm run start
~~~

## Notas

- Asegúrate de que el servidor de MySQL esté corriendo antes de ejecutar el proyecto.
- la base de datos se puede importar desde elarchivo `BDkonecta`.

## Frontend  

El Frontend esta desarrollado en React.js como parte del `Cafetería Konecta - Sistema de Gestión de Inventario`.

### Instalación

1. Clona el repositorio:
~~~
git clone https://github.com/sebas-777/TestKonecta.git
~~~

2. Navega al directorio del proyecto:
~~~
cd TestKonecta/Konecta-cafe
~~~

3. Instala las dependencias:
~~~
npm install
~~~

### Ejecución

Para iniciar la aplicacion, utiliza el siguiente comando:
~~~
npm run dev
~~~
