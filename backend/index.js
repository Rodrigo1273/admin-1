const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const reportesRoutes = require('./routes/reportesRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb+srv://carlospechmedina9:Carlos123@cluster0.89dvt.mongodb.net/Dogzline?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Rutas
app.use('/api/reportes', reportesRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});