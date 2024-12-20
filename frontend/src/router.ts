import { createRouter, createWebHistory } from 'vue-router';
import LogIn from './components/LogIn.vue';
import SingUp from './components/SingUp.vue';
import Homepage from './components/Homepage.vue'
import axios from 'axios';


const routes = [
  {
    path: '/',
    name: 'Homepage',
    component: Homepage,
    meta: { requiresAuth: true},
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

interface UserResponse {
  loggedIn: boolean;
  username: string;
}

router.beforeEach(async (to, _from, next) => {
  if (to.meta.requiresAuth) {
    try {
      const response = await axios.get<UserResponse>('http://localhost:3000/auth-status', {
        withCredentials: true,
      });
      console.log(response)
      if (response.data.loggedIn) {
        next(); 
      } else {
        next('/login'); 
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      next('/login'); 
    }
  } else {
    next(); 
  }
});



export default router;
