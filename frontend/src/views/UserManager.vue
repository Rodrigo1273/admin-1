<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
      <h2 class="text-2xl font-bold mb-6 text-center">Gestión de Usuarios</h2>
      
      <!-- Filtro de búsqueda -->
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Buscar por nombre o correo" 
        class="mb-4 p-2 border border-gray-300 rounded w-full"
      />
      
      <table class="w-full border-collapse border border-gray-300">
        <thead>
          <tr class="bg-[#d2b48c] text-white">
            <th class="border border-gray-300 p-2">ID</th>
            <th class="border border-gray-300 p-2">Nombre Completo</th>
            <th class="border border-gray-300 p-2">Correo</th>
            <th class="border border-gray-300 p-2">Rol</th>
            <th class="border border-gray-300 p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user._id" class="text-center">
            <td class="border border-gray-300 p-2">{{ user._id }}</td>
            <td class="border border-gray-300 p-2">{{ user.NombreCompleto }}</td>
            <td class="border border-gray-300 p-2">{{ user.email }}</td>
            <td class="border border-gray-300 p-2">{{ user.role }}</td>
            <td class="border border-gray-300 p-2">
              <button 
                class="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition-colors"
                @click="deleteUser(user._id)">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      
      <!-- Paginación -->
      
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const users = ref([]);
const searchQuery = ref('');


const fetchUsers = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No hay token disponible. Inicia sesión primero.');
      return;
    }
    
    const response = await axios.get(`api/usuarios?page=${currentPage.value}&limit=${limit}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    users.value = response.data.users || response.data || [];
    hasMoreUsers.value = users.value.length === limit;
  } catch (error) {
    console.error('Error al obtener usuarios:', error.response?.data || error);
    alert(`Error al obtener usuarios: ${error.response?.data?.message || 'Verifica la API'}`);
  }
};

const deleteUser = async (userId) => {
  if (!confirm('¿Estás seguro de que deseas eliminar este usuario?')) return;
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No hay token disponible. Inicia sesión primero.');
      return;
    }
    
    await axios.delete(`api/usuarios/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    users.value = users.value.filter(user => user._id !== userId);
  } catch (error) {
    console.error('Error al eliminar usuario:', error.response?.data || error);
    alert(`Error al eliminar usuario: ${error.response?.data?.message || 'No se pudo completar la acción'}`);
  }
};




const filteredUsers = computed(() => {
  return users.value.filter(user =>
    user.NombreCompleto.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

onMounted(fetchUsers);
</script>
