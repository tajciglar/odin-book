<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-96">
      <h1 class="text-2xl font-semibold text-center text-gray-700 mb-6">Sign Up</h1>
      <form @submit.prevent="handleSingup">
        <div class="mb-4">
          <input 
            v-model="username" 
            type="text" 
            placeholder="Username" 
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div class="mb-4">
          <input 
            v-model="email" 
            type="text" 
            placeholder="Email" 
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div class="mb-4">
          <input 
            v-model="password" 
            type="text" 
            placeholder="Password" 
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div class="mb-6">
          <input 
            v-model="confirmPassword" 
            type="password" 
            placeholder="Confirm password" 
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button 
          type="submit" 
          class="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const handleSingup = () => {
  console.log(username, email, password, confirmPassword)
}

</script>