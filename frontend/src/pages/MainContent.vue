<template>
  <div class="grid grid-cols-[1fr_4fr_1fr] h-screen">
    <!-- Sidebar -->
    <Sidebar class="col-span-1 bg-gray-100 p-4" />

    <!-- Main Posts Section -->
    <div class="col-span-1 p-6 overflow-y-auto h-full">
      <ul>
        <li v-for="(post, index) in posts" :key="index" class="mb-6 border-b pb-4">
          <h3 class="text-xl font-semibold text-gray-800">{{ post.title }}</h3>
          <p class="text-gray-600">{{ post.content }}</p>
        </li>
      </ul>
    </div>

    <!-- Active Friends Bar -->
    <ActiveFriendsBar class="col-span-1 bg-gray-200 p-4 overflow-y-auto" />
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import Sidebar from '../components/Sidebar.vue';
  import ActiveFriendsBar from '../components/ActiveFriendsBar.vue';

  const posts = ref([
    { title: 'Animal', content: 'Post about animals' },
    { title: 'Animal', content: 'Post about animals' },
    { title: 'Animal', content: 'Post about animals' },
    { title: 'Animal', content: 'Post about animals' },
    { title: 'Car', content: 'Post about cars' },
    { title: 'Car', content: 'Post about cars' },
    { title: 'Car', content: 'Post about cars' },
    { title: 'Car', content: 'Post about cars' },
    { title: 'Travel', content: 'Post about travel' },
  ]);
</script>