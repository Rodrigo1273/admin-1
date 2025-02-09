<template>
  <div class="min-h-screen flex bg-[#FAF3E0]"> <!-- Fondo beis -->
    <!-- Sidebar -->
    <Sidebar v-if="isAuthenticated" />

    <!-- Contenido principal -->
    <div class="flex-1 p-6 bg-[#F5F5F5]"> <!-- Fondo gris claro -->
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import Sidebar from './components/Sidebar.vue';

const router = useRouter();
const isAuthenticated = computed(() => router.currentRoute.value.path !== '/login');
</script>

<style scoped>
/* Estilos personalizados si es necesario */
</style>