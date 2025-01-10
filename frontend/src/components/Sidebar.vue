<template>
  <div class="bg-lightBeige text-white flex flex-col">
    <ul class="space-y-4 mt-8 px-4">
      <li>
        <button @click="goTo('home')" class="flex items-center p-3 w-full rounded-lg hover:bg-gray-700 cursor-pointer" aria-label="Go to Home">
          <span class="mr-4 text-lg">🏠</span>
          <span>Home</span>
        </button>
      </li>
      <li>
        <button @click="goTo('explore')" class="flex items-center p-3 w-full rounded-lg hover:bg-gray-700 cursor-pointer" aria-label="Explore">
          <span class="mr-4 text-lg">🔍</span>
          <span>Explore</span>
        </button>
      </li>
      <li>
        <button @click="goTo('friends')" class="flex items-center p-3 w-full rounded-lg hover:bg-gray-700 cursor-pointer" aria-label="Friends">
          <span class="mr-4 text-lg">👥</span>
          <span>Friends</span>
        </button>
      </li>
      <li>
        <button @click="goTo('groups')" class="flex items-center p-3 w-full rounded-lg hover:bg-gray-700 cursor-pointer" aria-label="Groups">
          <span class="mr-4 text-lg">👨‍👩‍👧</span>
          <span>Groups</span>
        </button>
      </li>
      <li>
        <button @click="goTo('saved')" class="flex items-center p-3 w-full rounded-lg hover:bg-gray-700 cursor-pointer" aria-label="Saved">
          <span class="mr-4 text-lg">💾</span>
          <span>Saved</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goTo = (routeName) => {
  router.push({ name: routeName });
};

</script>
