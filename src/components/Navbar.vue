<template>
    <div class="navbar">
        <nav>
            <h1>
                <router-link :to="{ name: 'home' }"> Music Playlist </router-link>
            </h1>
            <div class="links">
                <button @click="handleLogout">Log out</button>
                <router-link class="btn" :to="{ name: 'signup' }">Sign up</router-link>
                <router-link class="btn" :to="{ name: 'login' }">Log in</router-link>
            </div>
        </nav>
    </div>
</template>

<script setup>
import useLogout from '@/composables/useLogout';
import { useRouter } from 'vue-router';

const router = useRouter();
const { error, logout } = useLogout();

const handleLogout = async () => {
    await logout();

    if (!error.value) {
        router.push({ name: 'login' });
    }
};
</script>

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
