<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-6xl">
      <h2 class="text-2xl font-bold mb-6 text-center">Reportes de Usuarios</h2>

      <!-- Filtros de búsqueda -->
      <div class="mb-4 flex gap-4">
        <input v-model="searchTerm" placeholder="Buscar por ID reportado..."
          class="border p-2 rounded w-full" @input="filterReports" />
        <select v-model="selectedStatus" class="border p-2 rounded" @change="filterReports">
          <option value="">Todos</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Resuelto">Resuelto</option>
        </select>
      </div>

      <!-- Tabla de reportes -->
      <table class="w-full border-collapse border border-gray-300">
        <thead>
          <tr class="bg-[#d2b48c] text-white">
            <th class="border border-gray-300 p-2">ID Reportante</th>
            <th class="border border-gray-300 p-2">ID Reportado</th>
            <th class="border border-gray-300 p-2">Motivo</th>
            <th class="border border-gray-300 p-2">Descripción</th>
            <th class="border border-gray-300 p-2">Estado</th>
            <th class="border border-gray-300 p-2">Fecha</th>
            <th class="border border-gray-300 p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="reporte in filteredReports" :key="reporte._id" class="text-center">
            <td class="border border-gray-300 p-2">{{ reporte.id_reportante }}</td>
            <td class="border border-gray-300 p-2">{{ reporte.id_reportado }}</td>
            <td class="border border-gray-300 p-2">{{ reporte.motivo }}</td>
            <td class="border border-gray-300 p-2">{{ reporte.descripcion }}</td>
            <td class="border border-gray-300 p-2">{{ reporte.estado }}</td>
            <td class="border border-gray-300 p-2">{{ formatDate(reporte.fecha_reporte) }}</td>
            <td class="border border-gray-300 p-2">
              <button v-if="reporte.estado !== 'Resuelto'"
                class="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-colors"
                @click="resolverReporte(reporte._id)">
                Marcar Resuelto
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const reportes = ref([]);
const searchTerm = ref("");
const selectedStatus = ref("");
const filteredReports = ref([]);

const fetchReportes = async () => {
  try {
    const response = await axios.get("/reportes.json");
    reportes.value = response.data;
    filterReports();
  } catch (error) {
    console.error("Error al obtener reportes:", error);
  }
};

const filterReports = () => {
  filteredReports.value = reportes.value.filter(reporte => {
    return (
      (selectedStatus.value === "" || reporte.estado === selectedStatus.value) &&
      (searchTerm.value === "" || reporte.id_reportado.includes(searchTerm.value))
    );
  });
};

const resolverReporte = (id) => {
  reportes.value = reportes.value.map(rep =>
    rep._id === id ? { ...rep, estado: "Resuelto" } : rep
  );
  filterReports();
};

const formatDate = (fecha) => {
  return new Date(fecha).toLocaleDateString();
};

onMounted(fetchReportes);
</script>
