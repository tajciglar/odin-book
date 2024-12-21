<template>
    <div class="bg-forestGreen text-white py-4 px-6">
  <div class="container mx-auto flex justify-between items-center">
    <div class="text-xl font-bold">
      <a href="/" class="hover:text-warmBeige">Odin Book</a>
    </div>

    <div class="flex items-center space-x-2">
      <input
        type="text"
        placeholder="Search..."
        class="px-3 py-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-warmBeige"
      />
      <button class="bg-burntOrange text-white px-4 py-2 rounded hover:bg-darkerBurntOrange">
        Search
      </button>
    </div>

    <div class="flex items-center space-x-6">
      <a href="#" class="hover:text-warmBeige">User</a>
      <div class="relative">
        <button class="bg-white text-forestGreen px-4 py-2 rounded hover:bg-warmBeige">
          Notifications
        </button>
        <div
          class="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg hidden group-hover:block"
        >
          <a href="#" class="block px-4 py-2 hover:bg-warmBeige">Notification 1</a>
          <a href="#" class="block px-4 py-2 hover:bg-warmBeige">Notification 2</a>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>