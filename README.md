
# 🛠️ Sistema de Incidencias Web

Aplicación web fullstack para gestionar incidencias técnicas. Permite registrar, visualizar, actualizar y eliminar reportes de incidencias, con control de prioridad y estado.

## 🚀 Tecnologías utilizadas

### Backend
- Node.js
- Express
- MySQL
- dotenv
- cors

### Frontend
- HTML5
- CSS3
- JavaScript
- TailwindCSS (vía CDN)

## 📦 Características principales

- CRUD completo de incidencias (crear, leer, actualizar, eliminar)
- Prioridades visuales (baja, media, alta)
- Estados de incidencia (abierta, en proceso, resuelta)
- Interfaz responsiva y moderna con TailwindCSS
- Backend con API REST y conexión a base de datos relacional

## 🧠 Estructura del proyecto

```
sistema-incidencias/
├── db/
│   └── connection.js
├── routes/
│   └── incidencias.js
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── .env
├── server.js
└── package.json
```

## ⚙️ Instalación y uso

1. Clonar el repositorio:
```bash
git clone https://github.com/tuusuario/sistema-incidencias.git
cd sistema-incidencias
```

2. Instalar dependencias del backend:
```bash
npm install
```

3. Configurar variables de entorno en `.env`:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=sistema_incidencias
PORT=3000
```

4. Crear la base de datos y tabla en MySQL:
```sql
CREATE DATABASE sistema_incidencias;

USE sistema_incidencias;

CREATE TABLE incidencias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(100) NOT NULL,
  descripcion TEXT,
  prioridad ENUM('baja', 'media', 'alta') DEFAULT 'media',
  estado ENUM('abierta', 'en_proceso', 'resuelta') DEFAULT 'abierta',
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

5. Iniciar el servidor:
```bash
node server.js
```

6. Abrir el archivo `frontend/index.html` en tu navegador.

## 📌 Autor

Desarrollado por **Jean Carlos Betancourt Nazareno** 
