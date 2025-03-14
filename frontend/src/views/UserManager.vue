<template>
  <div class="container">
    <div class="card">
      <h2 class="page-title">Gestión de Usuarios</h2>

      <!-- Filtro de búsqueda -->
      <div class="search-container">
        <i class="search-icon">🔍</i>
        <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar por nombre o correo..."
            class="search-input"
        />
      </div>

      <div class="table-container">
        <table class="user-table">
          <thead>
          <tr>
            <th>ID</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="user in users" :key="user._id" class="user-row">
            <td class="user-id">{{ user._id }}</td>
            <td>{{ user.email }}</td>
            <td>
              <span :class="getRoleBadgeClass(user.role)">{{ user.role }}</span>
            </td>
            <td class="actions-cell">
              <button class="btn btn-view" @click="viewUser(user._id)">
                <span class="btn-icon">👁️</span> Ver
              </button>
              <button class="btn btn-delete" @click="deleteUser(user._id)">
                <span class="btn-icon">🗑️</span> Eliminar
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <!-- Mensaje cuando no hay usuarios -->
      <div v-if="users.length === 0" class="no-results">
        <p>No se encontraron usuarios</p>
      </div>

      <!-- Paginación -->
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1" class="btn btn-pagination">
          <span class="btn-icon">◀</span> Anterior
        </button>
        <span class="page-indicator">Página {{ currentPage }}</span>
        <button @click="nextPage" :disabled="!hasMoreUsers" class="btn btn-pagination">
          Siguiente <span class="btn-icon">▶</span>
        </button>
      </div>
    </div>

    <!-- Modal para mostrar usuario y mascotas -->
    <div v-if="selectedUser" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">{{ selectedUser.NombreCompleto || 'Usuario' }}</h3>
          <button class="btn-close-icon" @click="selectedUser = null">✖</button>
        </div>

        <div class="user-details">
          <div class="user-detail-item">
            <div class="detail-label">Email:</div>
            <div class="detail-value">{{ selectedUser.email }}</div>
          </div>
          <div class="user-detail-item">
            <div class="detail-label">Rol:</div>
            <div class="detail-value">
              <span :class="getRoleBadgeClass(selectedUser.role)">{{ selectedUser.role }}</span>
            </div>
          </div>
        </div>

        <div class="mascotas-section">
          <h4 class="section-title">Mascotas <span class="mascota-count">{{ selectedUser.mascotas?.length || 0 }}</span></h4>

          <div v-if="!selectedUser.mascotas || selectedUser.mascotas.length === 0" class="no-mascotas">
            <p>Este usuario no tiene mascotas registradas</p>
          </div>

          <div v-else class="mascota-container">
            <div v-for="mascota in selectedUser.mascotas" :key="mascota._id" class="mascota-card">
              <div class="mascota-header">
                <h5 class="mascota-name">{{ mascota.nombre }}</h5>
              </div>

              <div class="mascota-content">
                <div class="mascota-image-container">
                  <img v-if="mascota.fotos && mascota.fotos.startsWith('data:image')" :src="mascota.fotos" class="mascota-img" alt="Foto de mascota">
                  <div v-else class="mascota-no-image">
                    <span>🐾</span>
                  </div>
                </div>

                <div class="mascota-info">
                  <div class="info-row">
                    <span class="info-label">Edad:</span>
                    <span class="info-value">{{ mascota.edad }} años</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">Raza:</span>
                    <span class="info-value">{{ mascota.raza }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">Sexo:</span>
                    <span class="info-value">{{ mascota.sexo }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">Color:</span>
                    <span class="info-value">{{ mascota.color }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">Vacunas:</span>
                    <span class="info-value vaccine-status">
                      <span :class="mascota.vacunas ? 'status-yes' : 'status-no'">
                        {{ mascota.vacunas ? 'Sí' : 'No' }}
                      </span>
                    </span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">Certificado:</span>
                    <span class="info-value certificate-status">
                      <span :class="mascota.certificado ? 'status-yes' : 'status-no'">
                        {{ mascota.certificado ? 'Sí' : 'No' }}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn btn-close" @click="selectedUser = null">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

const API_URL = 'https://dogzline-1.onrender.com/api';
const users = ref([]);
const searchQuery = ref('');
const currentPage = ref(1);
const limit = 10;
const hasMoreUsers = ref(true);
const selectedUser = ref(null);

const fetchUsers = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No hay token disponible. Inicia sesión primero.');
      return;
    }

    const response = await fetch(`${API_URL}/usuarios/listar?page=${currentPage.value}&limit=${limit}&search=${searchQuery.value}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error('Error al obtener los usuarios');

    const data = await response.json();
    users.value = data.users || [];
    hasMoreUsers.value = users.value.length === limit;
  } catch (error) {
    console.error('Error:', error);
    alert('Error al obtener usuarios.');
  }
};

// Función para ir a la siguiente página
const nextPage = () => {
  if (hasMoreUsers.value) {
    currentPage.value++;
    fetchUsers();
  }
};

// Función para ir a la página anterior
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchUsers();
  }
};

// Función para obtener la clase del badge de rol
const getRoleBadgeClass = (role) => {
  if (!role) return 'role-badge';

  switch(role.toLowerCase()) {
    case 'admin':
      return 'role-badge role-admin';
    case 'usuario':
      return 'role-badge role-user';
    default:
      return 'role-badge';
  }
};

// Actualiza la lista de usuarios en tiempo real mientras se escribe en el buscador
watch(searchQuery, () => {
  currentPage.value = 1;
  fetchUsers();
});

const viewUser = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No hay token disponible. Inicia sesión primero.');
      return;
    }

    const response = await fetch(`${API_URL}/usuarios/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error('Error al obtener usuario');

    const data = await response.json();
    selectedUser.value = data.usuario;
    selectedUser.value.mascotas = data.mascotas || [];
  } catch (error) {
    console.error('Error:', error);
    alert('Error al obtener usuario.');
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

    const response = await fetch(`${API_URL}/usuarios/${userId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error('Error al eliminar el usuario');

    // Actualizar la lista eliminando al usuario
    users.value = users.value.filter(user => user._id !== userId);
    alert('Usuario eliminado exitosamente.');
  } catch (error) {
    console.error('Error:', error);
    alert('Error al eliminar usuario.');
  }
};

onMounted(fetchUsers);
</script>

<style>
/* Variables de colores */
:root {
  --primary-color: #3498db;
  --primary-dark: #2980b9;
  --secondary-color: #2ecc71;
  --danger-color: #e74c3c;
  --danger-dark: #c0392b;
  --warning-color: #f39c12;
  --light-gray: #f5f7fa;
  --mid-gray: #e1e5ea;
  --dark-gray: #34495e;
  --text-color: #333333;
  --border-radius: 8px;
  --shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
}

/* Reset y estilos base */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: var(--text-color);
  line-height: 1.6;
}

/* Contenedor principal */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: var(--light-gray);
  padding: 20px;
}

/* Tarjeta principal */
.card {
  background: white;
  padding: 30px;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  width: 100%;
  max-width: 900px;
  text-align: center;
}

.page-title {
  font-size: 28px;
  margin-bottom: 25px;
  color: var(--dark-gray);
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: 10px;
}

/* Input de búsqueda */
.search-container {
  position: relative;
  margin-bottom: 20px;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--dark-gray);
}

.search-input {
  width: 100%;
  padding: 12px 12px 12px 40px;
  border: 1px solid var(--mid-gray);
  border-radius: var(--border-radius);
  font-size: 16px;
  transition: var(--transition);
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

/* Contenedor de tabla */
.table-container {
  overflow-x: auto;
  margin-bottom: 20px;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

/* Tabla */
.user-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
}

.user-table th {
  background: var(--primary-color);
  color: white;
  padding: 15px;
  text-align: left;
  font-weight: 600;
  position: sticky;
  top: 0;
}

.user-table th:first-child {
  border-top-left-radius: var(--border-radius);
}

.user-table th:last-child {
  border-top-right-radius: var(--border-radius);
}

.user-table td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid var(--mid-gray);
}

.user-row {
  transition: var(--transition);
}

.user-row:hover {
  background-color: rgba(52, 152, 219, 0.05);
}

.user-id {
  font-family: monospace;
  color: var(--dark-gray);
  font-size: 0.9em;
}

/* Mensaje de no resultados */
.no-results {
  padding: 30px;
  background-color: var(--light-gray);
  border-radius: var(--border-radius);
  color: var(--dark-gray);
  font-style: italic;
  margin: 20px 0;
}

/* Badges de rol */
.role-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 500;
  background-color: var(--mid-gray);
  color: var(--dark-gray);
}

.role-admin {
  background-color: rgba(231, 76, 60, 0.2);
  color: var(--danger-dark);
}

.role-user {
  background-color: rgba(46, 204, 113, 0.2);
  color: var(--secondary-color);
}

/* Botones */
.btn {
  padding: 8px 16px;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-weight: 500;
  transition: var(--transition);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.btn:active {
  transform: translateY(0);
}

.btn-view {
  background: var(--primary-color);
  color: white;
}

.btn-view:hover {
  background: var(--primary-dark);
}

.btn-delete {
  background: var(--danger-color);
  color: white;
  margin-left: 8px;
}

.btn-delete:hover {
  background: var(--danger-dark);
}

.btn-close {
  background: var(--danger-color);
  color: white;
  min-width: 120px;
}

.btn-close:hover {
  background: var(--danger-dark);
}

.btn-icon {
  display: inline-block;
  font-size: 0.9em;
}

.actions-cell {
  white-space: nowrap;
}

/* Estilos para la paginación */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
  gap: 20px;
}

.btn-pagination {
  background-color: white;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  padding: 8px 16px;
}

.btn-pagination:hover:not(:disabled) {
  background-color: var(--primary-color);
  color: white;
}

.btn-pagination:disabled {
  background-color: var(--light-gray);
  color: var(--mid-gray);
  border-color: var(--mid-gray);
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}

.page-indicator {
  font-weight: 500;
  color: var(--dark-gray);
  background-color: var(--light-gray);
  padding: 8px 16px;
  border-radius: var(--border-radius);
}

/* Modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background: white;
  padding: 0;
  border-radius: var(--border-radius);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid var(--mid-gray);
  background-color: var(--primary-color);
  color: white;
  border-top-left-radius: var(--border-radius);
  border-top-right-radius: var(--border-radius);
}

.modal-title {
  font-size: 20px;
  margin: 0;
}

.btn-close-icon {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  transition: var(--transition);
}

.btn-close-icon:hover {
  transform: scale(1.2);
}

.user-details {
  padding: 20px;
  background-color: var(--light-gray);
}

.user-detail-item {
  display: flex;
  margin-bottom: 10px;
}

.detail-label {
  width: 80px;
  font-weight: 600;
  color: var(--dark-gray);
}

.detail-value {
  flex: 1;
}

.section-title {
  padding: 15px 20px;
  background-color: var(--primary-color);
  color: white;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.mascota-count {
  background-color: white;
  color: var(--primary-color);
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
}

/* Estilos para mascota container */
.mascotas-section {
  border-top: 1px solid var(--mid-gray);
}

.no-mascotas {
  padding: 30px;
  text-align: center;
  color: var(--dark-gray);
  background-color: var(--light-gray);
}

.mascota-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 20px;
}

.mascota-card {
  border: 1px solid var(--mid-gray);
  border-radius: var(--border-radius);
  overflow: hidden;
  background-color: white;
  transition: var(--transition);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.mascota-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow);
}

.mascota-header {
  padding: 12px;
  background-color: var(--primary-color);
  color: white;
}

.mascota-name {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
}

.mascota-content {
  padding: 15px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.mascota-image-container {
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--light-gray);
  margin-bottom: 15px;
  border-radius: var(--border-radius);
  overflow: hidden;
}

.mascota-img {
  max-width: 100%;
  max-height: 160px;
  object-fit: cover;
}

.mascota-no-image {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: var(--mid-gray);
  font-size: 36px;
}

.mascota-info {
  flex: 1;
}

.info-row {
  display: flex;
  margin-bottom: 8px;
  align-items: center;
}

.info-label {
  width: 100px;
  font-weight: 600;
  color: var(--dark-gray);
  font-size: 14px;
}

.info-value {
  flex: 1;
  font-size: 14px;
}

/* Estilos para estados especiales */
.status-yes, .status-no {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 50px;
  font-size: 12px;
  font-weight: 500;
}

.status-yes {
  background-color: rgba(46, 204, 113, 0.2);
  color: var(--secondary-color);
}

.status-no {
  background-color: rgba(231, 76, 60, 0.2);
  color: var(--danger-color);
}

.modal-footer {
  padding: 20px;
  border-top: 1px solid var(--mid-gray);
  text-align: center;
}

/* Responsive */
@media (max-width: 768px) {
  .card {
    padding: 20px 15px;
  }

  .mascota-container {
    grid-template-columns: 1fr;
  }

  .user-table th,
  .user-table td {
    padding: 10px 8px;
    font-size: 14px;
  }

  .btn {
    padding: 6px 10px;
    font-size: 14px;
  }

  .modal-content {
    width: 95%;
  }
}
</style>