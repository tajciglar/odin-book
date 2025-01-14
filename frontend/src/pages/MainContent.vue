<template>
  <div class="grid grid-cols-[1fr_4fr_1fr] h-screen">
    <Sidebar class="col-span-1 bg-gray-100 p-4" />

    <div class="col-span-1 p-6 overflow-y-auto h-full">
      <ul>
        <li v-for="(post, index) in posts" :key="index" class="mb-6 border-b border-cyan-300 pb-4">
          <div>
            <div class="flex justify-end">
              {{ post.author.username }}
            </div>
            <div class="flex flex-col items-start">
              <h3 class="text-xl font-semibold text-gray-800">{{ post.title }}</h3>
              <p class="text-gray-600">{{ post.content }}</p>
            </div>
          </div>
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

  interface Author {
    id: number,
    username: string,
  }
  interface FetchedPosts {
    title: string, 
    content: string,
    user: string,
    createdAt: string,
    author: Author,
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
  
  // Get posts 
  const fetchPosts = async (): Promise<void> => {
    try {
      const response  = await axios.get(`${VITE_BACKEND_URL}/api/posts`, {
        withCredentials: true,
      })
      console.log(response.data)
      posts.value = response.data as FetchedPosts[];
    } catch (err) {
      console.error(err)
    }
  } 
 onMounted(() => {
  fetchPosts();
});
</script>