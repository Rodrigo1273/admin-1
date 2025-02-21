<template>
  <div class="bg-[#F5F5DC] p-6 shadow-lg flex flex-col items-start h-screen w-64">
    <!-- Menú de navegación en columna -->
    <nav class="flex flex-col space-y-4 w-full">
      <button @click="navigateTo('/home')" class="menu-button">
        <i class="fas fa-home"></i> Home
      </button>
      <button @click="navigateTo('/user-manager')" class="menu-button">
        <i class="fas fa-users"></i> Usuarios
      </button>
      <button @click="navigateTo('/pet-manager')" class="menu-button">
        <i class="fas fa-paw"></i> Mascotas
      </button>
      <button @click="navigateTo('/reports')" class="menu-button">
        <i class="fas fa-chart-bar"></i> Reportes
      </button>
      <button @click="navigateTo('/matches')" class="menu-button">
        <i class="fas fa-heart"></i> Emparejamientos
      </button>
      <button @click="navigateTo('/analytics')" class="menu-button">
        <i class="fas fa-chart-line"></i> Estadísticas
      </button>
      <button @click="navigateTo('/settings')" class="menu-button">
        <i class="fas fa-cog"></i> Configuración
      </button>
    </nav>

    <!-- Botón de Cerrar Sesión al final -->
    <div class="mt-auto w-full">
      <button @click="logout" class="logout-button">
        <i class="fas fa-sign-out-alt"></i> Cerrar Sesión
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// Función para navegar a una página
const navigateTo = (route) => {
  router.push(route);
};

// Función para cerrar sesión
const logout = () => {
  router.push('/login'); // Redirigir a la pantalla de inicio de sesión
};
</script>

<style scoped>
/* Fondo del menú */
.bg-[#F5F5DC] {
  background-color: #F5F5DC;
}

/* Estilos generales del menú */
.menu-button {
  background-color: #FFF;
  color: #8B5E3B;
  font-size: 1rem;
  font-weight: 600;
  padding: 12px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease-in-out;
  border: 1px solid #8B5E3B;
  width: 100%;
  justify-content: center;
}

/* Efecto hover en botones */
.menu-button:hover {
  background-color: #E0E0E0;
  color: #6A4028;
  transform: scale(1.05);
}

/* Botón de Cerrar Sesión */
.logout-button {
  background-color: #B22222;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  padding: 12px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease-in-out;
  border: 1px solid #8B0000;
  width: 100%;
  justify-content: center;
}

/* Efecto hover en Cerrar Sesión */
.logout-button:hover {
  background-color: #8B0000;
  transform: scale(1.05);
}
</style>
