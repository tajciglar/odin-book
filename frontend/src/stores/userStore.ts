import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';

interface User {
  username: string;
  bio: string;
  avatarUrl: string;
  profilePictureFile: File | null; 
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null);
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchUser = async (): Promise<void> => {
    if (user.value) return;

    try {
      const response = await axios.get(`${VITE_BACKEND_URL}/api/users`, {
        withCredentials: true,
      });
      
      user.value = response.data as User;
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      window.location.href = '/login'; 
    }
  };

  return {
    user,
    fetchUser,
  };
});