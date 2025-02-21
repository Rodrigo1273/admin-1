import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Analytics from './views/Analytics.vue';
import Matches from './views/Matches.vue';
import PetManager from './views/PetManager.vue';
import Reports from './views/Reports.vue';
import Settings from './views/Settings.vue';
import UserManager from './views/UserManager.vue';
import Login from './views/Login.vue'; // Nueva vista para el inicio de sesión

const routes = [
  { path: '/', redirect: '/login' }, // Redirige a la página de inicio de sesión
  { path: '/login', component: Login },
  { path: '/home', component: Home },
  { path: '/analytics', component: Analytics },
  { path: '/matches', component: Matches },
  { path: '/pet-manager', component: PetManager },
  { path: '/reports', component: Reports },
  { path: '/settings', component: Settings },
  { path: '/user-manager', component: UserManager },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
