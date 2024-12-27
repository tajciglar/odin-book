import { createRouter, createWebHistory } from 'vue-router';
import LogIn from './components/LogIn.vue';
import SingUp from './components/SingUp.vue';
import MainContent from './pages/MainContent.vue';
import ProfilePage from './pages/ProfilePage.vue'
import axios from 'axios';
import DefaultLayout from './layouts/DefaultLayout.vue';


const routes = [
  {
    path: '/',
    name: 'Maincontent',
    component: DefaultLayout,
    meta: { requiresAuth: true},
    children: [
      { path: '', name: 'MainContent', component: MainContent},
      { path: 'profile', name: 'Profile', component: ProfilePage},
      //{ path: 'settings', name: 'Settings', component: Settings}
    ]
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
  },
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
