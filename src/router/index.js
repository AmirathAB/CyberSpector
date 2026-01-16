import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from "@/components/LoginForm.vue";
import CertificatePage from "@/views/CertificatePage.vue";

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginForm
  },
  {
    path: '/certificate',
    name: 'Certificate',
    component: CertificatePage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
