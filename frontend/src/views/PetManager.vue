<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
      <h2 class="text-2xl font-bold mb-6 text-center">Gestión de Mascotas</h2>
      
      <!-- Filtro de búsqueda -->
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Buscar por nombre o raza" 
        class="mb-4 p-2 border border-gray-300 rounded w-full"
      />
      
      <div v-if="loading" class="text-center">Cargando...</div>

      <div v-else>
        <table class="w-full border-collapse border border-gray-300">
          <thead>
            <tr class="bg-[#d2b48c] text-white">
              <th class="border border-gray-300 p-2">ID</th>
              <th class="border border-gray-300 p-2">Nombre</th>
              <th class="border border-gray-300 p-2">Edad</th>
              <th class="border border-gray-300 p-2">Raza</th>
              <th class="border border-gray-300 p-2">Sexo</th>
              <th class="border border-gray-300 p-2">Color</th>
              <th class="border border-gray-300 p-2">Vacunas</th>
              <th class="border border-gray-300 p-2">Certificado</th>
              <th class="border border-gray-300 p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="mascota in filteredMascotas" :key="mascota._id" class="text-center">
              <td class="border border-gray-300 p-2">{{ mascota._id }}</td>
              <td class="border border-gray-300 p-2">{{ mascota.nombre }}</td>
              <td class="border border-gray-300 p-2">{{ mascota.edad }}</td>
              <td class="border border-gray-300 p-2">{{ mascota.raza }}</td>
              <td class="border border-gray-300 p-2">{{ mascota.sexo === 'M' ? 'Macho' : 'Hembra' }}</td>
              <td class="border border-gray-300 p-2">{{ mascota.color }}</td>
              <td class="border border-gray-300 p-2">{{ mascota.vacunas }}</td>
              <td class="border border-gray-300 p-2">{{ mascota.certificado }}</td>
              <td class="border border-gray-300 p-2">
                <button 
                  @click="eliminarMascota(mascota._id)" 
                  class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Paginación -->
        <div class="flex justify-between mt-4">
          <button 
            @click="prevPage" 
            :disabled="currentPage === 1"
            class="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50">
            Anterior
          </button>
          <span>Página {{ currentPage }}</span>
          <button 
            @click="nextPage" 
            :disabled="!hasMoreMascotas"
            class="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50">
            Siguiente
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const mascotas = ref([]);
const searchQuery = ref('');
const currentPage = ref(1);
const limit = 10;
let hasMoreMascotas = ref(true);
const loading = ref(false);

const fetchMascotas = async () => {
  loading.value = true;
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No hay token disponible. Inicia sesión primero.');
      return;
    }

    const response = await axios.get(`api/mascotas?page=${currentPage.value}&limit=${limit}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    mascotas.value = response.data.mascotas || [];
    hasMoreMascotas.value = mascotas.value.length === limit;
  } catch (error) {
    console.error('Error al obtener mascotas:', error.response?.data || error);
    alert(`Error al obtener mascotas: ${error.response?.data?.message || 'Verifica la API'}`);
  } finally {
    loading.value = false;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchMascotas();
  }
};

const nextPage = () => {
  if (hasMoreMascotas.value) {
    currentPage.value++;
    fetchMascotas();
  }
};

const eliminarMascota = async (id) => {
  const confirmDelete = confirm('¿Estás seguro de que deseas eliminar esta mascota?');
  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No hay token disponible. Inicia sesión primero.');
      return;
    }

    await axios.delete(`api/mascotas/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    alert('Mascota eliminada con éxito.');
    fetchMascotas();  // Actualiza la lista después de eliminar
  } catch (error) {
    console.error('Error al eliminar mascota:', error.response?.data || error);
    alert(`Error al eliminar mascota: ${error.response?.data?.message || 'Verifica la API'}`);
  }
};

const filteredMascotas = computed(() => {
  return mascotas.value.filter(mascota =>
    mascota.nombre.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    mascota.raza.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

onMounted(fetchMascotas);
</script>
