// models/Usuario.js

import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
  // Agrega más campos según sea necesario
});

const Usuario = mongoose.model('Usuario', usuarioSchema);
export default Usuario;
