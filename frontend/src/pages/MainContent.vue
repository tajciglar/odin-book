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

    <ActiveFriendsBar @select-friend="selectFriend" class="col-span-1 bg-gray-200 overflow-y-auto" />
    <ChatBox v-if="selectedFriend" :friend="selectedFriend"/>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import Sidebar from '../components/Sidebar.vue';
  import ActiveFriendsBar from '../components/ActiveFriendsBar.vue';
  import ChatBox from '../components/ChatBox.vue';
  import axios from 'axios';

  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  interface FetchedPosts {
    title: string, 
    content: string,
    user: string
  }

  interface Friend {
    id: number,
    username: string,
    active: boolean,
  }

 
  const selectedFriend = ref<Friend | null>(null);
  const posts = ref<FetchedPosts[]>([]);

  // Get friend that was clicked in friends bar
  const selectFriend = (friend: Friend) => {
    selectedFriend.value = friend;
  };
  
  // Get posts from friends of the user
  const fetchPosts = async (): Promise<void> => {
    try {
      const response  = await axios.get(`${VITE_BACKEND_URL}/api/users/posts`, {
        withCredentials: true,
      })

      if(!response) {

      }
      posts.value = response.data as FetchedPosts[];
    } catch (err) {
      console.error(err)
    }
  } 
 onMounted(() => {
  fetchPosts();
});
</script>