<template>
  <div class="mx-auto p-6 bg-white shadow-md rounded-lg space-y-8 w-3/6">
    <div class="space-y-4">
      <h2 class="text-lg font-bold">Profile Picture</h2>
      <div class="flex items-center space-x-4">
        <img
          :src="userStore.user?.avatarUrl || 'https://via.placeholder.com/150'"
          class="w-24 h-24 rounded-full object-cover border"
          alt="Profile Picture"
          v-if="!editingProfilePic"
        />

        <div v-else class="flex items-center space-x-4">
          <img
            :src="userStore.user?.avatarUrl || 'https://via.placeholder.com/150'"
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
              class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>

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

    <div class="space-y-4">
      <h2 class="text-lg font-bold">Bio</h2>
      <div v-if="!editingBio">
        <p class="text-gray-700 m-5">{{ userStore.user?.bio || "No bio available." }}</p>
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

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { useUserStore } from "../stores/userStore";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const userStore = useUserStore();

const editingProfilePic = ref<boolean>(false);
const editingBio = ref<boolean>(false);
const newBio = ref<string>("");

// Toggle edit mode for profile picture and bio
const toggleEdit = (field: "profilePic" | "bio"): void => {
  if (field === "profilePic") {
    editingProfilePic.value = !editingProfilePic.value;
  } else if (field === "bio") {
    editingBio.value = !editingBio.value;
    newBio.value = userStore.user?.bio || "";  // Initialize with current bio
  }
};

// Handle file input for profile picture change
const handleProfilePicChange = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    userStore.user!.avatarUrl = URL.createObjectURL(file);  
    userStore.user!.profilePictureFile = file;  // Store the file
  }
};

const submitProfilePic = async (): Promise<void> => {
  try {
    const formData = new FormData();
    if (userStore.user?.profilePictureFile) {
      formData.append("profilePicture", userStore.user.profilePictureFile);
    }

    await axios.post(
      `${VITE_BACKEND_URL}/api/users/update-profile-pic`,
      formData,
      { withCredentials: true }
    );

    editingProfilePic.value = false;
    userStore.fetchUser();  
  } catch (error) {
    console.error("Error updating profile picture:", error);
  }
};

// Submit the bio change
const submitBio = async (): Promise<void> => {
  try {
    await axios.post(
      `${VITE_BACKEND_URL}/api/users/update-bio`,
      { bio: newBio.value },
      { withCredentials: true }
    );

    userStore.user!.bio = newBio.value;  
    editingBio.value = false;
  } catch (error) {
    console.error("Error updating bio:", error);
  }
};

// Fetch user data when component is mounted
onMounted(() => {
  userStore.fetchUser();
});
</script>