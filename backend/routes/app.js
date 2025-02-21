import { createRouter, createWebHistory } from 'vue-router';
import ReportesView from '@/views/Reports.vue';

const routes = [
  {
    path: '/',
    name: 'Reportes',
    component: ReportesView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;