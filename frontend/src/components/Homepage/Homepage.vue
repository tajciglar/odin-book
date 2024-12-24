<template>
  <div class="grid grid-rows-[auto_1fr] grid-cols-[1fr_6fr_1fr] h-screen">
    <!-- Navbar -->
    <Navbar class="row-start-1 col-span-3 bg-forestGreen text-white" />

    <!-- Sidebar -->
    <Sidebar class="row-start-2 col-start-1 bg-lightBeige" />

    <!-- Main Content -->
    <MainContent class="row-start-2 col-start-2 bg-white p-4 shadow-md" />

    <!-- Active Friends Bar -->
    <ActiveFriendsBar class="row-start-2 col-start-3 bg-gray-50 p-4 border-l border-gray-200" />
  </div>
</template>

<script setup lang="ts">
import Navbar from './Navbar.vue';
import Sidebar from './Sidebar.vue';
import MainContent from './MainContent.vue';
import ActiveFriendsBar from './ActiveFriendsBar.vue';
</script>
