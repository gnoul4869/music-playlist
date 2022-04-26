<script setup>
import getUser from '@/composables/getUser';
import useLogout from '@/composables/useLogout';
import { useRouter } from 'vue-router';

const { user } = getUser();
const { logout } = useLogout();

const handleLogout = async () => {
    await logout();
};
</script>

<template>
    <div class="navbar">
        <nav>
            <h1>
                <router-link :to="{ name: 'home' }"> Music Playlist </router-link>
            </h1>
            <div class="links">
                <div v-if="user">
                    <router-link :to="{ name: 'createPlaylist' }">Create Playlist</router-link>
                    <button @click="handleLogout">Log out</button>
                </div>
                <div v-else>
                    <router-link :to="{ name: 'signup' }" class="btn">Sign up</router-link>
                    <router-link :to="{ name: 'login' }" class="btn">Log in</router-link>
                </div>
            </div>
        </nav>
    </div>
</template>

<style scoped>
.navbar {
    padding: 16px 10px;
    margin-bottom: 60px;
    background: white;
}
nav {
    display: flex;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
}
nav img {
    max-height: 60px;
}
nav h1 {
    margin-left: 20px;
}
nav .links {
    margin-left: auto;
}
nav .links a,
button {
    margin-left: 16px;
    font-size: 14px;
}
</style>
