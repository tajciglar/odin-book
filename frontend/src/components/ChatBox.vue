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

    <div class="border-t border-gray-200 pt-4 h-64 overflow-y-auto">
      <div v-for="message in messages" :key="message.id" class="mb-4">
        <p :class="message.senderId === friend.id ? 'text-right' : 'text-left'">
          <span
            class="inline-block px-4 py-2 rounded-lg"
            :class="message.senderId === friend.id ? 'bg-gray-100 text-gray-800' : 'bg-blue-600 text-white'"
          >
            {{ message.content }}
          </span>
        </p>
        <small class="text-gray-400 block mt-1 text-xs text-right">
          {{ new Date(message.sentAt).toLocaleString() }}
        </small>
      </div>
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
import { ref, defineProps, watchEffect, toRefs } from 'vue';
import axios from 'axios';

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface Friend {
  id: number;
  username: string;
  active: boolean;
}

interface Message {
  id: number;
  content: string;
  senderId: number;
  sentAt: string;
}

const props = defineProps<{ friend: Friend | null }>();
const { friend } = toRefs(props);
const messages = ref<Message[]>([]);
const newMessage = ref('');

// Function to fetch messages between the current user and the friend
const fetchMessages = async (friendId: number): Promise <void> => {
  try {
    const response = await axios.get(`${VITE_BACKEND_URL}/api/chats`, {
      params: { friendId },
      withCredentials: true,
    });
    console.log(response.data)
    messages.value = response.data as Message[];
    console.log(messages.value)
  } catch (err) {
    console.error('Error fetching messages:', err);
  }
};




// Watch for friend prop changes and fetch messages
watchEffect(() => {
  if (friend.value) {
    fetchMessages(friend.value.id); // Fetch messages when the friend changes
  }
});
</script>
