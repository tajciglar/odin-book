<template>
  <div class=" mx-auto p-6 bg-white shadow-md rounded-lg space-y-8 w-3/6">
    <!-- Profile Picture Section -->
    <div class="space-y-4">
      <h2 class="text-lg font-bold">Profile Picture</h2>
      <div class="flex items-center space-x-4">
        <!-- Display Profile Picture or Placeholder -->
        <img
          :src="userInfo.profilePicture || 'https://via.placeholder.com/150'"
          class="w-24 h-24 rounded-full object-cover border"
          alt="Profile Picture"
          v-if="!editingProfilePic"
        />

        <div v-else class="flex items-center space-x-4">
          <img
            :src="userInfo.profilePicture || 'https://via.placeholder.com/150'"
            class="w-24 h-24 rounded-full object-cover border"
            alt="Profile Picture"
          />
          <form @submit.prevent="submitProfilePic" class="flex items-center space-x-2">
            <input
              type="file"
              @change="handleProfilePicChange"
              class="text-sm text-gray-500 border border-gray-300 rounded"
            />
            <button
              type="submit"
              class="px-4 py-2  bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>

        <!-- Edit Button -->
        <button
          v-if="!editingProfilePic"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          type="button"
          @click="toggleEdit('profilePic')"
        >
          Edit
        </button>
        <button
          v-if="editingProfilePic"
          type="button"
          class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          @click="toggleEdit('profilePic')"
        >
          Cancel
        </button>
      </div>
    </div>

    <!-- Bio Section -->
    <div class="space-y-4">
      <h2 class="text-lg font-bold">Bio</h2>
      <div v-if="!editingBio" >
        <p class="text-gray-700 m-5">{{ userInfo.bio || "No bio available." }}</p>
        <button
          type="button"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          @click="toggleEdit('bio')"
        >
          Edit
        </button>
      </div>
      <div v-if="editingBio" class="space-y-2">
        <textarea
          v-model="newBio"
          class="w-full h-20 border border-gray-300 rounded p-2 text-gray-700"
        ></textarea>
        <div class="flex space-x-2">
          <button
            type="button"
            class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            @click="submitBio"
          >
            Submit
          </button>
          <button
            type="button"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            @click="toggleEdit('bio')"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const userInfo = ref({
  profilePicture: "",
  profilePictureFile: "",
  bio: "",
});
const editingProfilePic = ref(false);
const editingBio = ref(false);
const newBio = ref("");

const fetchUserData = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/users/profile", {
      withCredentials: true,
    });

    userInfo.value = response.data.userData;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

const toggleEdit = (field) => {
  if (field === "profilePic") {
    editingProfilePic.value = !editingProfilePic.value;
  } else if (field === "bio") {
    editingBio.value = !editingBio.value;
    newBio.value = userInfo.value.bio;
  }
};

const handleProfilePicChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    userInfo.value.profilePicture = URL.createObjectURL(file);
    userInfo.value.profilePictureFile = file;
  }
};

const submitProfilePic = async () => {
  try {
    const formData = new FormData();
    formData.append("profilePicture", userInfo.value.profilePictureFile);

    await axios.post(
      "http://localhost:3000/api/users/update-profile-pic",
      formData,
      {
        withCredentials: true,
      }
    );

    editingProfilePic.value = false;
  } catch (error) {
    console.error("Error updating profile picture:", error);
  }
};

const submitBio = async () => {
  try {
    await axios.post(
      "http://localhost:3000/api/users/update-bio",
      { bio: newBio.value },
      {
        withCredentials: true,
      }
    );

    userInfo.value.bio = newBio.value;
    editingBio.value = false;
  } catch (error) {
    console.error("Error updating bio:", error);
  }
};

onMounted(() => {
  fetchUserData();
});
</script>

<style scoped>

</style>
