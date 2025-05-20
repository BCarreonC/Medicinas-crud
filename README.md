# Medicinas-crud

CRUD Medicinas **Proyecto que simula un sistema web para la gestión de una farmacia**.  

Construido con **ReactJS y Flask** para proporcionar una interfaz de web / escritorio eficiente y moderna.

## Características principales del sistema
- Gestión de inventario(CRUD).
- Sistema de inicio de sesión.
- Desarrollo de un API que funciona como la base de datos del sistema.
- Validación de usuarios.
- Acceso a funciones dependiendo del nivel de privilegios del usuario.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available**:

- [@vitejs/plugin-react](https**://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https**://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https**://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https**://swc.rs/) for Fast Refresh

## Instalación

Clona el repositorio y ejecuta**:

```bash
$ git clone https://github.com/BCarreonC/Medicinas-crud
$ cd Medicinas-crud
$ npm install
```
## Dependencias principales

Estas son las dependencias principales que usa el proyecto**:

- **vite**: Empaquetador moderno y rápido para proyectos frontend, usado aquí con React.
- **axios**: Cliente HTTP para realizar solicitudes a la API Flask.
- **flask**: Framework backend en Python para crear la API REST del sistema de medicinas.
- **flask_sqlalchemy**: Extensión de Flask para interactuar con bases de datos mediante SQLAlchemy.
- **flask_bcrypt**: Proporciona utilidades de hash para almacenar contraseñas de manera segura.
- **flask_cors**: Permite que el frontend (React) se comunique con el backend (Flask) en desarrollo sin errores de CORS.
- **sqlite3 (implícitamente)**: Sistema de base de datos utilizado para almacenar medicinas y usuarios.

## 🛠 Desarrollo

Comando para ejecutar el sistema de manera local (Web).

```bash
$ npm run dev
```
Comando para ejecutar el API de manera local.

```bash
$ python App.py
```
## Licencia

Este proyecto está bajo una **licencia propietaria** (*All Rights Reserved*).  
No se permite la copia, modificación, distribución o cualquier otro uso del código sin autorización expresa del propietario o la empresa.