// routes/incidencias.js
// const express = require('express');
// const router = express.Router();

// // Ruta de prueba
// router.get('/', (req, res) => {
//     res.json({ mensaje: 'Hola desde la API de incidencias 👋' });
// });

// module.exports = router;

// routes/incidencias.js
const express = require('express');
const router = express.Router();
const connection = require('../db/connection');

// Obtener todas las incidencias
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM incidencias';
    connection.query(sql, (err, results) => {
        if (err) {
        console.error('Error al obtener incidencias:', err);
        return res.status(500).json({ error: 'Error en el servidor' });
        }
        res.json(results);
    });
});

// Crear una nueva incidencia
router.post('/', (req, res) => {
    const { titulo, descripcion, prioridad } = req.body;
    const sql = 'INSERT INTO incidencias (titulo, descripcion, prioridad) VALUES (?, ?, ?)';
    connection.query(sql, [titulo, descripcion, prioridad], (err, result) => {
        if (err) {
        console.error('Error al crear incidencia:', err);
        return res.status(500).json({ error: 'Error en el servidor' });
        }
        res.status(201).json({ mensaje: 'Incidencia creada con éxito', id: result.insertId });
    });
});

// Actualizar una incidencia por ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, prioridad, estado } = req.body;
    const sql = 'UPDATE incidencias SET titulo = ?, descripcion = ?, prioridad = ?, estado = ? WHERE id = ?';
    connection.query(sql, [titulo, descripcion, prioridad, estado, id], (err) => {
        if (err) {
        console.error('Error al actualizar incidencia:', err);
        return res.status(500).json({ error: 'Error en el servidor' });
        }
        res.json({ mensaje: 'Incidencia actualizada correctamente' });
    });
});

// Eliminar una incidencia por ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM incidencias WHERE id = ?';
    connection.query(sql, [id], (err) => {
        if (err) {
        console.error('Error al eliminar incidencia:', err);
        return res.status(500).json({ error: 'Error en el servidor' });
        }
        res.json({ mensaje: 'Incidencia eliminada correctamente' });
    });
});

module.exports = router;
