// models/Perro.js
import mongoose from 'mongoose';

const PerroSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  edad: { type: Number, required: true },
  raza: { type: String, required: true },
  sexo: { type: String, required: true },
  color: { type: String, required: true },
  vacunas: { type: String, required: true },
  caracteristicas: { type: String, required: true },
  certificado: { type: String, required: true },
  fotos: { type: String, required: true }, // Esto puede ser una URL o base64
  comportamiento: { type: String, required: true },
  id_usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
}, { collection: 'Mascotas' }); // Especifica la colección correcta

const Perro = mongoose.model('Perro', PerroSchema);

export default Perro;
