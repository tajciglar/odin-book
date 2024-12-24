<template>
  <div v-if="posts">
    <ul>
      <li v-for="(post, index) in posts" :key="index">
        <h3>{{ post.title }}</h3>
        <p>{{ post.content }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const posts = ref([
      {
        title: "Animal",
        content: "Post about animals",
      },
      {
        title: "Car",
        content: "Post about cars",
      },
      {
        title: "Travel",
        content: "Post about travel",
      },
    ]);

    return { posts };
  },
};
</script>

<style>
/* Add your styles here */
</style>
