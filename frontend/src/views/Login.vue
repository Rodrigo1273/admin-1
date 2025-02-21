<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 class="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label class="block text-gray-700">Usuario</label>
          <input
            v-model="email"
            type="email"
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
import axios from 'axios';

const email = ref('');
const password = ref('');
const router = useRouter();

const login = async () => {
  try {
    const response = await axios.post('/api/login', {
      email: email.value,
      contraseña: password.value, // Cambiado de 'password' a 'contraseña'
    });

    const { token } = response.data;
    localStorage.setItem('token', token); // Guarda el token en el almacenamiento local
    router.push('/home'); // Redirige a la página de inicio
  } catch (error) {
    console.error('Error en la solicitud de inicio de sesión:', error.response.data);
    alert('Usuario o contraseña incorrectos');
  }
};
</script>