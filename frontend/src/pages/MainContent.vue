<template>
  <div class="grid grid-cols-[1fr_4fr_1fr] h-screen">
    <Sidebar class="col-span-1 bg-gray-100 p-4" />

    <div class="col-span-1 p-6 overflow-y-auto h-full">
      <ul>
        <li v-for="(post, index) in posts" :key="index" class="mb-6 border-b pb-4">
          <h3 class="text-xl font-semibold text-gray-800">{{ post.title }}</h3>
          <p class="text-gray-600">{{ post.content }}</p>
        </li>
      </ul>
    </div>

    <ActiveFriendsBar class="col-span-1 bg-gray-200 p-4 overflow-y-auto" />
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import Sidebar from '../components/Sidebar.vue';
  import ActiveFriendsBar from '../components/ActiveFriendsBar.vue';
  import axios from 'axios';

  interface FetchedPosts {
    title: string, 
    content: string,
    user: string
  }


  const fetchPosts = async (): Promise<void> => {
    try {
      const response = await axios.get('')
    }
  }
 onMounted(() => {
  fetchPosts();
});
</script>