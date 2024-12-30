<template>
    <div>
        <div>
            <p>Profile picture:</p>
            <img :src="userInfo.profilePicture" alt="Profile Picture" />
        </div>
        <div>
            <p>Name: {{ userInfo.name }}</p>
        </div>
        <div>
            <p>Birth date: {{ userInfo.birthDate }}</p>
        </div>
        <div>
            <p>Bio: {{ userInfo.bio }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const userInfo = ref({});

const fetchUserData = async () => {
    try {
        const response = await axios.get('/api/users/profile'); 
        console.log(response)
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};

onMounted(() => {
    fetchUserData();
});
</script>
