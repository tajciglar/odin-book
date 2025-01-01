<template>
    <div>
        <!-- Profile Picture Section -->
        <div>
            <p>Profile picture:</p>
            <div>
                <img :src="userInfo.profilePicture" alt="Profile Picture" v-if="!editingProfilePic" />
                <button v-if="!editingProfilePic" type="button" @click="toggleEdit('profilePic')">Edit</button>
                <div v-if="editingProfilePic">
                    <form @submit.prevent="submitProfilePic">
                        <input type="file" @change="handleProfilePicChange" />
                        <button type="submit">Submit</button>
                    </form>
                    <button type="button" @click="toggleEdit('profilePic')">Cancel</button>
                </div>
            </div>
        </div>

        <div>
            <p>Bio:</p>
            <div v-if="!editingBio">
                <p>{{ userInfo.bio }}</p>
                <button type="button" @click="toggleEdit('bio')">Edit</button>
            </div>
            <div v-if="editingBio">
                <textarea v-model="newBio"></textarea>
                <button type="button" @click="submitBio">Submit</button>
                <button type="button" @click="toggleEdit('bio')">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const userInfo = ref({
    profilePicture: '',
    profilePictureFile: '',
    bio: ''
});
const editingProfilePic = ref(false);
const editingBio = ref(false);
const newBio = ref('');


const fetchUserData = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/users/profile', {
            withCredentials: true,
        });

        userInfo.value = response.data.userData;
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};

const toggleEdit = (field) => {
    if (field === 'profilePic') {
        editingProfilePic.value = !editingProfilePic.value;
    } else if (field === 'bio') {
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
        formData.append('profilePicture', userInfo.value.profilePictureFile);
        console.log(formData.profilePicture)
        await axios.post('http://localhost:3000/api/users/update-profile-pic', formData, {
            withCredentials: true,
        });

        editingProfilePic.value = false;
    } catch (error) {
        console.error('Error updating profile picture:', error);
    }
};

const submitBio = async () => {
    try {
        await axios.post('http://localhost:3000/api/users/update-bio', { bio: newBio.value }, {
            withCredentials: true,
        });

        userInfo.value.bio = newBio.value;
        editingBio.value = false;
    } catch (error) {
        console.error('Error updating bio:', error);
    }
};

onMounted(() => {
    fetchUserData();
});
</script>
