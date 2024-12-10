import { createRouter, createWebHistory } from 'vue-router';
import LogIn from './components/LogIn.vue';
import SingUp from './components/SingUp.vue';

const routes = [
  /*{
    path: '/',
    name: 'Home',
    component: Home,
  },*/
  {
    path: '/login',
    name: 'Login',
    component: LogIn
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SingUp
  }
];


const router = createRouter({
  history: createWebHistory(),  
  routes
});

export default router;
