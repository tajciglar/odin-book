<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-96">
      <h1 class="text-2xl font-semibold text-center text-gray-700 mb-6">Sign Up</h1>
      <form @submit.prevent="handleSignup">
        <div class="mb-4">
          <input 
            v-model="username" 
            type="text" 
            placeholder="Username" 
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div class="mb-4">
          <input 
            v-model="email" 
            type="email" 
            placeholder="Email" 
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div class="mb-4">
          <input 
            v-model="password" 
            type="password" 
            placeholder="Password" 
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div class="mb-6">
          <input 
            v-model="confirmPassword" 
            type="password" 
            placeholder="Confirm Password" 
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button 
          type="submit" 
          class="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          :disabled="loading"
        >
          Sign Up
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
// Form fields
const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

// Loading state
const loading = ref(false);

// Signup handler
const handleSignup = async () => {
  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match!");
    return;
  }

  loading.value = true;
  try {
    const payload = {
      username: username.value,
      email: email.value,
      password: password.value,
    };
    console.log(payload)
    // API CALL
    const response = await fetch('http://localhost:3000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ payload }),
    })
    console.log(response)
    if (!response.ok) {
      console.log("Error: ", response)
    }
    // Redirect to homepage
    router.push({name: 'Homepage'})

  } catch (err) {
    console.error("Error during signup:", err);
    alert("Signup failed. Please try again.");
  } finally {
    loading.value = false;
  }
};
</script>