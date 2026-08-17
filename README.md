# COFFE MAKER

Aplicación web progresiva (PWA) desarrollada para facilitar la consulta de platillos y el registro de pedidos de una cafetería.

**Tipo de aplicación:** Progressive Web App (PWA)

**Materia:** PROGRAMACION AVANSADA

**Carrera:** Ingeniería en Sistemas Computacionales

**Alumno:** Jonathan Alejandro Castro De Zamacona

**Institución:** Universidad Multicultural CUDEC

**Grupo:** 09ISC182


---

# 1. Título del proyecto

## COFFE MAKER

Coffe Maker es una aplicación web progresiva (PWA) diseñada para facilitar la consulta de platillos, sus precios y el registro de pedidos de manera rápida, sencilla y accesible desde diferentes dispositivos.

La aplicación permite a los usuarios consultar el menú, registrar platillos, realizar pedidos y obtener un código QR asociado al pedido realizado.


---

# 2. Descripción del proyecto

Coffe Maker surge como una solución para facilitar el proceso de consulta y registro de pedidos dentro de una cafetería.

La aplicación permite administrar y consultar los platillos disponibles, registrar nuevos platillos y realizar pedidos proporcionando información del cliente y su dirección.

Además, el sistema utiliza geolocalización para obtener la ubicación del usuario y mostrarla mediante un mapa interactivo. Después de registrar un pedido, la aplicación genera un código QR único que contiene información relacionada con el pedido.

### Usuarios

La aplicación está dirigida principalmente a:

- Clientes de la cafetería.
- Personal encargado de registrar platillos.
- Personal encargado de gestionar pedidos.

### Propósito

El propósito principal de Coffe Maker es proporcionar una plataforma sencilla y accesible para digitalizar parte del proceso de consulta y registro de pedidos de una cafetería.


---

# 3. Objetivos

## Objetivo general

Desarrollar una aplicación web progresiva que permita consultar platillos, registrar productos y realizar pedidos de manera rápida, sencilla y accesible, utilizando tecnologías web y servicios en la nube.


## Objetivos específicos

- Diseñar una interfaz web sencilla e intuitiva.
- Implementar una aplicación con características de PWA.
- Permitir la consulta de platillos disponibles.
- Permitir el registro de nuevos platillos.
- Permitir a los usuarios realizar pedidos.
- Almacenar la información de los pedidos en Firebase Firestore.
- Implementar geolocalización para obtener la ubicación del usuario.
- Mostrar la ubicación mediante un mapa interactivo.
- Generar un código QR único después de registrar un pedido.
- Facilitar la consulta de la información relacionada con el pedido mediante el código QR.
- Implementar un menú de navegación lateral para facilitar el acceso a las diferentes secciones de la aplicación.


---

# 4. Características principales

La aplicación cuenta con las siguientes funcionalidades:

- Página de inicio.
- Visualización de platillos disponibles.
- Registro de nuevos platillos.
- Consulta del nombre y costo de los platillos.
- Registro de pedidos.
- Selección de platillos mediante un menú desplegable.
- Registro del nombre del cliente.
- Registro de dirección.
- Obtención de ubicación mediante geolocalización.
- Visualización de la ubicación mediante un mapa.
- Uso de OpenStreetMap mediante Leaflet.
- Almacenamiento de información mediante Firebase Firestore.
- Generación de un código único para cada pedido.
- Generación automática de código QR después de registrar un pedido.
- Código QR escaneable desde dispositivos móviles.
- Menú lateral de navegación.
- Página "Acerca de".
- Página de contacto.
- Diseño adaptable a diferentes tamaños de pantalla.
- Características de aplicación web progresiva (PWA).


---

# 5. Tecnologías utilizadas

## Lenguajes

- HTML
- CSS
- JavaScript


## Frameworks y librerías

### Materialize CSS

Utilizado para el diseño de la interfaz, componentes visuales, formularios, menú lateral y elementos responsivos.

### Firebase

Utilizado como plataforma para almacenar y administrar la información de la aplicación.

### Firebase Firestore

Base de datos NoSQL utilizada para almacenar los platillos y pedidos.

### Leaflet

Utilizado para mostrar mapas interactivos y la ubicación del usuario.

**Versión:** 1.9.4

### OpenStreetMap

Fuente de los mapas utilizados mediante Leaflet.

### QRCode.js

Utilizado para generar códigos QR automáticamente después de registrar un pedido.

**Versión:** 1.0.0


## PWA

La aplicación incorpora características de Progressive Web App mediante:

- `manifest.json`
- Service Worker
- Iconos para diferentes tamaños de dispositivos
- Configuración para instalación como aplicación
- Adaptación para dispositivos móviles


---

# 6. Estructura del proyecto

La estructura principal del proyecto es la siguiente:

```text
COFFEMAKER/
│
├── index.html
│
├── manifest.json
├── sw.js
│
├── css/
│   ├── materialize.min.css
│   └── styles.css
│
├── js/
│   ├── materialize.min.js
│   ├── firebase.js
│   ├── index.js
│   ├── db.js
│   └── pedidos.js
│
├── pages/
│   ├── about.html
│   ├── pedidos.html
│   └── contact.html
│
├── img/
│   ├── icon-16x16.png
│   ├── icon-32x32.png
│   ├── icon-48x48.png
│   ├── icon-96x96.png
│   ├── icon-144x144.png
│   ├── icon-192x192.png
│   ├── icon-384x384.png
│   └── icon-512x512.png
│
└── README.md