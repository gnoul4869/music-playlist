<script setup>
import getUser from '@/composables/getUser';
import useLogout from '@/composables/useLogout';
import { computed } from '@vue/reactivity';
import { useRoute } from 'vue-router';

// Redirect params
const route = useRoute();
const redirect = computed(() => route.path);

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
                <router-link :to="{ name: 'Home' }"> Music Playlist </router-link>
            </h1>
            <div class="links">
                <div v-if="user">
                    <router-link :to="{ name: 'CreatePlaylist' }">Create Playlist</router-link>
                    <router-link :to="{ name: 'UserPlaylists' }">My Playlists</router-link>
                    <span>{{ user.displayName }}</span>
                    <button @click="handleLogout">Log out</button>
                </div>
                <div v-else>
                    <router-link :to="{ name: 'Signup', params: { redirect } }" class="btn">Sign up</router-link>
                    <router-link :to="{ name: 'Login', params: { redirect } }" class="btn">Log in</router-link>
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
    display: flex;
    align-items: center;
    margin-left: auto;
}
nav .links a,
button {
    margin: 0;
    margin-left: 16px;
    font-size: 14px;
}
span {
    font-size: 14px;
    display: inline-block;
    margin-left: 16px;
    padding-left: 16px;
    border-left: 1px solid #eee;
}
</style>
