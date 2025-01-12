<template>
  <div class="flex">
    <!-- Friends List Section -->
    <div class="bg-lightBeige text-black p-6 w-full rounded-lg shadow-md border border-gray-300">
      <h3 class="text-xl font-bold mb-4 text-gray-800">Active Friends</h3>
      <ul v-if="activeFriends.length" class="space-y-2">
        <li
          v-for="friend in activeFriends"
          :key="friend.id"
          @click="$emit('select-friend', friend)"
          class="flex items-center justify-between cursor-pointer p-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-gray-100 hover:shadow-md transition duration-300"
        >
          <span class="text-sm font-medium text-gray-700">{{ friend.username }}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-5 h-5 text-gray-500"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </li>
      </ul>
      <p v-else class="text-gray-600 text-sm italic">No active friends found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface FetchedFriends {
  id: number,
  username: string,
  active: boolean,
}

// State variables
const friends = ref<FetchedFriends[]>([]);
const activeFriends = ref<FetchedFriends[]>([]);
//const messages = ref([]);
//const newMessage = ref('');

// Fetch friends data
const getFriends = async (): Promise <void> => {
  try {
    const response = await axios.get(`${VITE_BACKEND_URL}/api/users/friends`, {
      withCredentials: true,
    });

    friends.value = response.data as FetchedFriends[];
    activeFriends.value = friends.value.filter((friend) => friend.active === true);
    
  } catch (err) {
    console.error(err);
  }
};


onMounted(() => {
  getFriends();
});
</script>