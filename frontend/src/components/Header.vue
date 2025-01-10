<template>
  <nav class="bg-blue-600 p-4">
    <div class="flex justify-between items-center">
      <h1 class="text-white text-lg font-semibold">My Website</h1>
      <div>
        <ul class="flex space-x-6">
          <li><router-link to="/" class="text-white hover:text-blue-300">Home</router-link></li>
          <li><router-link to="/login" class="text-white hover:text-blue-300">Login</router-link></li>
          <li><router-link to="/signup" class="text-white hover:text-blue-300">Signup</router-link></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
  
</script>
