import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import usuarioRoutes from './routes/usuarioRoutes.js';
import perroRoutes from './routes/perroRoutes.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb+srv://carlospechmedina9:Carlos123@cluster0.89dvt.mongodb.net/Dogzline?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Conexión a MongoDB exitosa");
})
.catch(err => {
    console.error("Error al conectar a MongoDB", err);
    process.exit(1); // Terminar el proceso si la conexión falla
});

// Rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/perros', perroRoutes);

// Nueva ruta para reportes
app.get('/api/reportes', async (req, res) => {
  try {
    const totalUsuarios = await Usuario.countDocuments();
    const totalPerros = await Perro.countDocuments();

    // Obtener número de razas distintas
    const razasUnicas = await Perro.distinct('raza');
    const totalRazas = razasUnicas.length;

    // Contar cuántos Chihuahuas hay
    const totalChihuahuas = await Perro.countDocuments({ raza: 'Chihuahua' });

    res.json({
      totalUsuarios,
      totalPerros,
      totalRazas,
      totalChihuahuas
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los reportes', error });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
