<script setup>
import getCollection from '@/composables/getCollection';
import Playlists from '@/components/Playlists.vue';

const { error, documents } = getCollection('playlists');
</script>

<template>
    <main class="home">
        <div v-if="error" class="error">Could not load the playlists</div>
        <div v-if="documents">
            <Playlists :playlists="documents" />
        </div>
    </main>
</template>
