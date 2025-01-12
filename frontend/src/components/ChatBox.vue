<template>
  <div v-if="friend" class="fixed bottom-4 right-4 w-1/3 max-w-md bg-white text-black p-6 rounded-lg shadow-lg border border-gray-300 transition-transform transform ease-in-out duration-300">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-semibold text-gray-800">{{ friend.username }}</h3>
      <button
        @click="$emit('close-chat')"
        class="text-red-500 hover:text-red-700 text-sm font-semibold"
      >
        Close
      </button>
    </div>

    <div class="border-t border-gray-200 pt-4">
      <textarea
        class="w-full p-4 bg-gray-50 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        rows="4"
        placeholder="Type your message..."
        v-model="newMessage"
      ></textarea>
    </div>

    <div class="mt-4 flex justify-end">
      <button
        @click="sendMessage"
        class="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
      >
        Send
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, defineProps } from 'vue';
  
  interface Friend {
    id: number;
    username: string;
    active: boolean;
  }

  defineProps<{ friend: Friend | null }>();

  const newMessage = ref('');
  
  const sendMessage = () => {
    if (newMessage.value.trim()) {
      console.log('Sending message:', newMessage.value);
      // Send the message logic here
      newMessage.value = ''; // Clear the message input after sending
    }
  };
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
