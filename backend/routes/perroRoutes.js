// routes/perroRoutes.js
import express from 'express';
import Perro from '../models/Perro.js';

const router = express.Router();

// Ruta para obtener el total de perros
router.get('/total', async (req, res) => {
  try {
    const totalPerros = await Perro.countDocuments(); // Contar el total de perros en la base de datos
    res.json({ totalPerros }); // Devolver el total en formato JSON
  } catch (error) {
    console.error('Error al contar los perros:', error);
    res.status(500).json({ message: 'Error al contar los perros' });
  }
});

export default router;
