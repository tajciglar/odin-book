<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-96">
      <h1 class="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h1>
      <form @submit.prevent="handleLogin">
        <div v-if="errorMessage" class="mb-4 text-red-600 text-center">
          {{ errorMessage }}
        </div>
        <div class="mb-4">
          <input 
            v-model="email" 
            type="email" 
            placeholder="Email" 
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div class="mb-6">
          <input 
            v-model="password" 
            type="password" 
            placeholder="Password" 
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
      <div class="mt-3">Don't have an account? Sign up <a href="/signup">here</a></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

interface LoginResponse {
  message: string,
  token?: string,
}

interface LoginError {
  message: string,
}

const email = ref<string>('');
const password = ref<string>('');
const errorMessage = ref<string>('');

const router = useRouter();

const handleLogin = async (): Promise<void> => {
  try {
    const response = await fetch('http://localhost:3000/api/auth/login', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email.value, password: password.value }), 
      credentials: 'include', 
    });
  
    if (!response.ok) {
      const errors: LoginError = await response.json();
      
      if (errors.message) {
        errorMessage.value = errors.message; 
      }
      console.log(errors)
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const loginData: LoginResponse = await response.json(); 
    console.log(loginData.message) 

    // Redirect to homepage
    router.push({ name: 'MainContent' });
  } catch (error) {
    
    if (!errorMessage.value) {
      errorMessage.value = 'Login failed. Please try again.'; 
    }
    alert('Login failed. Please try again.'); 
  }
};
</script>
