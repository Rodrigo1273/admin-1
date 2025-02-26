<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-4">Panel Administrativo</h1>

    <div class="grid grid-cols-2 gap-6">
      <div class="bg-white p-4 rounded shadow-lg">
        <h2 class="font-semibold">Estadísticas de Usuarios</h2>
        <p>Total de Usuarios: {{ totalUsuarios }}</p>
      </div>
      <div class="bg-white p-4 rounded shadow-lg">
        <h2 class="font-semibold">Estadísticas de Perros</h2>
        <p>Total de Perros: {{ totalPerros }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      totalUsuarios: 0,
      totalPerros: 0,
    };
  },
  created() {
    this.fetchUsuariosData();
    this.fetchPerrosData();
  },
  methods: {
    // Obtener total de usuarios
    async fetchUsuariosData() {
      try {
        const response = await axios.get('http://localhost:3000/api/usuarios');
        this.totalUsuarios = response.data.length; // Suponiendo que la respuesta es un array de usuarios
      } catch (error) {
        console.error('Error al obtener los datos de usuarios:', error);
      }
    },
    
    // Obtener total de perros, razas y chihuahuas
    async fetchPerrosData() {
  try {
    const response = await axios.get('http://localhost:3000/api/perros/total');
    this.totalPerros = response.data.totalPerros; // Asignar el total de perros
  } catch (error) {
    console.error('Error al obtener el total de perros:', error);
  }
}


  }
};
</script>

<style scoped>
/* Aquí puedes agregar los estilos adicionales si lo necesitas */
</style>
