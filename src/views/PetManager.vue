<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
      <h2 class="text-2xl font-bold mb-6 text-center">Gestión de Perros</h2>
      <table class="w-full border-collapse border border-gray-300">
        <thead>
          <tr class="bg-[#d2b48c] text-white">
            <th class="border border-gray-300 p-2">ID</th>
            <th class="border border-gray-300 p-2">Nombre</th>
            <th class="border border-gray-300 p-2">Raza</th>
            <th class="border border-gray-300 p-2">Edad</th>
            <th class="border border-gray-300 p-2">Sexo</th>
            <th class="border border-gray-300 p-2">Color</th>
            <th class="border border-gray-300 p-2">Vacunas</th>
            <th class="border border-gray-300 p-2">Características</th>
            <th class="border border-gray-300 p-2">Certificados</th>
            <th class="border border-gray-300 p-2">Foto</th>
            <th class="border border-gray-300 p-2">Comportamiento</th>
            <th class="border border-gray-300 p-2">ID Usuario</th>
            <th class="border border-gray-300 p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dog in dogs" :key="dog._id" class="text-center">
            <td class="border border-gray-300 p-2">{{ dog._id }}</td>
            <td class="border border-gray-300 p-2">{{ dog.nombre }}</td>
            <td class="border border-gray-300 p-2">{{ dog.raza }}</td>
            <td class="border border-gray-300 p-2">{{ dog.edad }}</td>
            <td class="border border-gray-300 p-2">{{ dog.sexo }}</td>
            <td class="border border-gray-300 p-2">{{ dog.color }}</td>
            <td class="border border-gray-300 p-2">{{ dog.vacunas }}</td>
            <td class="border border-gray-300 p-2">{{ dog.caracteristicas }}</td>
            <td class="border border-gray-300 p-2">{{ dog.certificados }}</td>
            <td class="border border-gray-300 p-2">
              <img :src="dog.foto" alt="Foto del perro" class="w-12 h-12 object-cover rounded-full">
            </td>
            <td class="border border-gray-300 p-2">{{ dog.comportamiento }}</td>
            <td class="border border-gray-300 p-2">{{ dog.id_usuario }}</td>
            <td class="border border-gray-300 p-2">
              <button 
                class="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition-colors"
                @click="deleteDog(dog._id)">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const dogs = ref([]);

const fetchDogs = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No hay token disponible. Inicia sesión primero.');
      return;
    }

    const response = await axios.get('api/mascotas?page=1&limit=10', {
      headers: { Authorization: `Bearer ${token}` },
    });

    dogs.value = response.data.perros || response.data || [];
  } catch (error) {
    console.error('Error al obtener perros:', error.response?.data || error);
    alert(`Error al obtener perros: ${error.response?.data?.message || 'Verifica la API'}`);
  }
};

const deleteDog = async (dogId) => {
  if (!confirm('¿Estás seguro de que deseas eliminar este perro?')) return;
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No hay token disponible. Inicia sesión primero.');
      return;
    }

    await axios.delete(`api/mascotas/${dogId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    dogs.value = dogs.value.filter(dog => dog._id !== dogId);
  } catch (error) {
    console.error('Error al eliminar perro:', error.response?.data || error);
    alert(`Error al eliminar perro: ${error.response?.data?.message || 'No se pudo completar la acción'}`);
  }
};

onMounted(fetchDogs);
</script>
