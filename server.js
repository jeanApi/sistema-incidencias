// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connection = require('./db/connection');
const incidenciaRoutes = require('./routes/incidencias');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/incidencias', incidenciaRoutes);

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
