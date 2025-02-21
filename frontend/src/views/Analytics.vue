<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
      <h2 class="text-2xl font-bold mb-6 text-center">Estadísticas de la App</h2>
      
      <!-- Mostrar estadísticas -->
      <div class="mb-6 text-center">
        <p class="text-xl font-semibold">Usuarios Totales: {{ totalUsers }}</p>
        <p class="text-xl font-semibold">Mascotas Totales: {{ totalPets }}</p>
      </div>

      <div v-if="loading" class="text-center">Cargando...</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const totalUsers = ref(0);
const totalPets = ref(0);
const loading = ref(true);

const fetchAnalyticsData = async () => {
  try {
    const response = await axios.get('/api/Mascotas');
    
    totalUsers.value = response.data.totalUsers;  // Total de usuarios
    totalPets.value = response.data.totalPets;    // Total de mascotas

  } catch (error) {
    console.error('Error al obtener las estadísticas:', error);
    alert('Error al obtener las estadísticas');
  } finally {
    loading.value = false;
  }
};

onMounted(fetchAnalyticsData);
</script>

<style scoped>
/* Estilos adicionales si es necesario */
</style>
