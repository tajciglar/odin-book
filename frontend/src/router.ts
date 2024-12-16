import { createRouter, createWebHistory } from 'vue-router';
import LogIn from './components/LogIn.vue';
import SingUp from './components/SingUp.vue';
import Homepage from './components/Homepage.vue'

const routes = [
  {
    path: '/',
    name: 'Homepage',
    component: Homepage,
  },
  {
    path: '/login',
    name: 'Login',
    component: LogIn,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SingUp,
  }
];


const router = createRouter({
  history: createWebHistory(),  
  routes
});

export default router;
