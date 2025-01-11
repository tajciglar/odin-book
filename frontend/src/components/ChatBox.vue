<template>
    <div 
      class="fixed bottom-0 right-0 w-1/3 bg-white text-black p-4 shadow-lg rounded-t-lg border border-gray-300  transition-all ease-in-out duration-1000 "
      :class="{ 'translate-y-0': selectedFriend }"
      v-if="selectedFriend"
    >
      <h3 class="text-lg font-bold">{{ selectedFriend.username }}</h3>
      <button
        @click="$emit('close-chat')"
        class="text-red-500 text-sm hover:underline"
      >
        Close
      </button>
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
</template>

<script setup>
  // Select a friend
const selectFriend = (friend) => {
  selectedFriend.value = friend;
  messages.value = []; // Clear existing messages when selecting a new friend
};
</script>