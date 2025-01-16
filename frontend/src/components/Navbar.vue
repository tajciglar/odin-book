<template>
  <div class="bg-forestGreen text-white py-4 px-6">
    <div class="container mx-auto flex justify-between items-center">
      <div class="text-xl font-bold">
        <a href="/" class="hover:text-warmBeige">Odin Book</a>
      </div>

      <div class="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search..."
          class="px-3 py-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-warmBeige"
        />
        <button class="bg-burntOrange text-white px-4 py-2 rounded hover:bg-darkerBurntOrange">
          Search
        </button>
      </div>

      <div class="flex items-center space-x-6">
        <div v-if="!userStore.user" class="animate-pulse">Loading...</div>
        <a v-else href="/profile" class="hover:text-warmBeige">{{ userStore.user.username }}</a>
        <div class="relative">
          <button class="bg-white text-forestGreen px-4 py-2 rounded hover:bg-warmBeige">
            Notifications
          </button>
        </div>
        <div class="text-xl font-bold">
          <button 
            type="button" 
            class="hover:text-warmBeige bg-transparent" 
            @click="handleLogOut">
            Log out
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { useUserStore } from '../stores/userStore';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const handleLogOut = async () => {
  try {
    await axios.post(`${VITE_BACKEND_URL}/logout`, {}, { withCredentials: true });
    router.push('/login');
  } catch (err) {
    console.error("Logout failed:", err);
  }
};


onMounted(() => {
  userStore.fetchUser();
});
</script>