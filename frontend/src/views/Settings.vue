<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
      <h2 class="text-2xl font-bold mb-6 text-center">Configuraciones de la Plataforma</h2>
      
      <!-- Configuración General -->
      <section class="mb-6">
        <h3 class="text-xl font-semibold mb-4">Configuración General</h3>
        <div class="mb-4">
          <label for="platformName" class="block text-sm font-medium">Nombre de la Plataforma</label>
          <input id="platformName" type="text" v-model="config.platformName" class="mt-2 p-2 w-full border rounded-md" />
        </div>
        <div class="mb-4">
          <label for="platformDescription" class="block text-sm font-medium">Descripción</label>
          <input id="platformDescription" type="text" v-model="config.platformDescription" class="mt-2 p-2 w-full border rounded-md" />
        </div>
      </section>
      
      <!-- Configuración de Seguridad -->
      <section class="mb-6">
        <h3 class="text-xl font-semibold mb-4">Seguridad</h3>
        <div class="mb-4">
          <label for="enableTwoFactor" class="block text-sm font-medium">Habilitar Autenticación de Dos Factores</label>
          <input id="enableTwoFactor" type="checkbox" v-model="config.enableTwoFactor" class="mt-2" />
        </div>
        <div class="mb-4">
          <label for="maxLoginAttempts" class="block text-sm font-medium">Intentos Máximos de Inicio de Sesión</label>
          <input id="maxLoginAttempts" type="number" v-model="config.maxLoginAttempts" class="mt-2 p-2 w-full border rounded-md" />
        </div>
      </section>

      <!-- Configuración de Notificaciones -->
      <section class="mb-6">
        <h3 class="text-xl font-semibold mb-4">Notificaciones</h3>
        <div class="mb-4">
          <label for="emailNotifications" class="block text-sm font-medium">Notificaciones por Correo Electrónico</label>
          <input id="emailNotifications" type="checkbox" v-model="config.emailNotifications" class="mt-2" />
        </div>
        <div class="mb-4">
          <label for="pushNotifications" class="block text-sm font-medium">Notificaciones Push</label>
          <input id="pushNotifications" type="checkbox" v-model="config.pushNotifications" class="mt-2" />
        </div>
      </section>

      <!-- Botón de Guardar -->
      <div class="flex justify-center mt-6">
        <button @click="saveSettings" class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Guardar Configuraciones</button>
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

// Función para guardar la configuración (simulada)
const saveSettings = () => {
  console.log('Configuraciones guardadas:', config.value);
  // Aquí puedes enviar la configuración a tu servidor o base de datos
};
</script>

<style scoped>
/* Estilos adicionales para la página */
</style>
