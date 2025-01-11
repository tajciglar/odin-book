<template>
  <div class="flex">
    <div class="w-1/4 bg-lightBeige text-white p-4">
      <h3 class="text-lg font-bold">Active Friends</h3>
      <ul v-if="!friends.length>0">
        <li>No active friends</li>
      </ul>
      <ul v-else class="space-y-4 mt-4">
        <li 
          v-for="friend in friends" 
          :key="friend.id" 
          @click="selectFriend(friend)" 
          class="cursor-pointer hover:bg-gray-700 rounded-lg p-2"
        >
          {{ friend.name }}
        </li>
      </ul>
    </div>

    <!-- Message Section -->
    <div class="w-3/4 bg-white text-black p-4" v-if="selectedFriend">
      <h3 class="text-lg font-bold">{{ selectedFriend.name }}</h3>
      <div class="border border-gray-300 p-4 h-64 overflow-y-auto">
        <p v-for="(msg, index) in messages" :key="index">{{ msg }}</p>
      </div>
      <div class="mt-4">
        <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          class="border border-gray-300 w-full p-2"
          placeholder="Type a message..."
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Friends data
const friends = ref([]);

const getFriends = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/api/users/friends`, { 
            withCredentials: true,
        });

        const friends = response.data.friends;
        console.log(friends);

        // Get only friends that are active
        const activeFriends = friends.filter((friend) => friend.active);

        console.log(activeFriends); 
        return activeFriends; 
    } catch (err) {
        console.error(err);
    }
};






onMounted(() => {
  getFriends();
});
</script>
