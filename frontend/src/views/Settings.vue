<template>
  <div :class="{'bg-gray-800': isDarkMode, 'bg-gray-100': !isDarkMode}" class="min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-300">
    <div :class="{'bg-gray-700': isDarkMode, 'bg-white': !isDarkMode}" class="p-8 rounded-lg shadow-lg w-full max-w-4xl transition-colors duration-300">
      <h2 :class="{'text-white': isDarkMode, 'text-black': !isDarkMode}" class="text-2xl font-bold mb-6 text-center">Configuraciones de la Plataforma</h2>
      
      <!-- Configuración General -->
      <section class="mb-6">
        <h3 :class="{'text-white': isDarkMode, 'text-black': !isDarkMode}" class="text-xl font-semibold mb-4">Configuración General</h3>
        <div class="mb-4">
          <label for="platformName" :class="{'text-white': isDarkMode, 'text-black': !isDarkMode}" class="block text-sm font-medium">Nombre de la Plataforma</label>
          <input id="platformName" type="text" v-model="config.platformName" :class="{'bg-gray-600 text-white': isDarkMode, 'bg-white text-black': !isDarkMode}" class="mt-2 p-2 w-full border rounded-md" />
        </div>
        <div class="mb-4">
          <label for="platformDescription" :class="{'text-white': isDarkMode, 'text-black': !isDarkMode}" class="block text-sm font-medium">Descripción</label>
          <input id="platformDescription" type="text" v-model="config.platformDescription" :class="{'bg-gray-600 text-white': isDarkMode, 'bg-white text-black': !isDarkMode}" class="mt-2 p-2 w-full border rounded-md" />
        </div>
      </section>
      
      <!-- Configuración de Seguridad -->
      <section class="mb-6">
        <h3 :class="{'text-white': isDarkMode, 'text-black': !isDarkMode}" class="text-xl font-semibold mb-4">Seguridad</h3>
        <div class="mb-4">
          <label for="enableTwoFactor" :class="{'text-white': isDarkMode, 'text-black': !isDarkMode}" class="block text-sm font-medium">Habilitar Autenticación de Dos Factores</label>
          <input id="enableTwoFactor" type="checkbox" v-model="config.enableTwoFactor" class="mt-2" />
        </div>
        <div class="mb-4">
          <label for="maxLoginAttempts" :class="{'text-white': isDarkMode, 'text-black': !isDarkMode}" class="block text-sm font-medium">Intentos Máximos de Inicio de Sesión</label>
          <input id="maxLoginAttempts" type="number" v-model="config.maxLoginAttempts" :class="{'bg-gray-600 text-white': isDarkMode, 'bg-white text-black': !isDarkMode}" class="mt-2 p-2 w-full border rounded-md" />
        </div>
      </section>

      <!-- Configuración de Notificaciones -->
      <section class="mb-6">
        <h3 :class="{'text-white': isDarkMode, 'text-black': !isDarkMode}" class="text-xl font-semibold mb-4">Notificaciones</h3>
        <div class="mb-4">
          <label for="emailNotifications" :class="{'text-white': isDarkMode, 'text-black': !isDarkMode}" class="block text-sm font-medium">Notificaciones por Correo Electrónico</label>
          <input id="emailNotifications" type="checkbox" v-model="config.emailNotifications" class="mt-2" />
        </div>
        <div class="mb-4">
          <label for="pushNotifications" :class="{'text-white': isDarkMode, 'text-black': !isDarkMode}" class="block text-sm font-medium">Notificaciones Push</label>
          <input id="pushNotifications" type="checkbox" v-model="config.pushNotifications" class="mt-2" />
        </div>
      </section>

      <!-- Botón de Guardar -->
      <div class="flex justify-center mt-6">
        <button @click="saveSettings" :class="{'bg-blue-700': isDarkMode, 'bg-blue-500': !isDarkMode}" class="px-6 py-2 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300">Guardar Configuraciones</button>
      </div>

      <!-- Botón para cambiar el modo -->
      <div class="flex justify-center mt-6">
        <button @click="toggleDarkMode" :class="{'bg-gray-600': isDarkMode, 'bg-gray-200': !isDarkMode}" class="px-6 py-2 text-white rounded-lg hover:bg-gray-400 transition-colors duration-300">
          Cambiar a Modo {{ isDarkMode ? 'Claro' : 'Oscuro' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Configuración inicial de la aplicación
const config = ref({
  platformName: '',
  platformDescription: '',
  enableTwoFactor: false,
  maxLoginAttempts: 5,
  emailNotifications: true,
  pushNotifications: true
});

// Estado para controlar el modo oscuro
const isDarkMode = ref(false);

// Función para guardar la configuración (simulada)
const saveSettings = () => {
  console.log('Configuraciones guardadas:', config.value);
  // Aquí puedes enviar la configuración a tu servidor o base de datos
};

// Función para alternar entre modo oscuro y claro
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
};
</script>

<style scoped>
/* Estilos adicionales para la página */
</style>
