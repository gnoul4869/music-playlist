<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
</script>

<template>
    <Navbar />
    <div class="content">
        <RouterView />
    </div>
</template>

<style>
.content {
    margin: 0 auto;
    max-width: 1200px;
    padding: 0 20px;
}
</style>
