<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 class="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label class="block text-gray-700">Usuario</label>
          <input
            v-model="username"
            type="text"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d2b48c]"
            required
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700">Contraseña</label>
          <input
            v-model="password"
            type="password"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d2b48c]"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-[#d2b48c] text-white py-2 px-4 rounded-lg hover:bg-[#b89a7c] transition-colors"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const router = useRouter();

const login = () => {
  // Simulación de autenticación
  if (username.value === 'admin' && password.value === 'admin') {
    router.push('/home');
  } else {
    alert('Usuario o contraseña incorrectos');
  }
};
</script>