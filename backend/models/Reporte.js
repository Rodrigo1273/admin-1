const mongoose = require('mongoose');

const reporteSchema = new mongoose.Schema({
    id_reportante: String,
    id_reportado: String,
    motivo: String,
    descripcion: String,
    estado: String,
    fecha_reporte: Date,
});

module.exports = mongoose.model('Reporte', reporteSchema);
