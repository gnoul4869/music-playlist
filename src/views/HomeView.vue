<script setup>
import { watch } from 'vue';

import Playlists from '@/components/Playlists.vue';

import getCollection from '@/composables/getCollection';

const { error, documents: playlists } = getCollection('playlists');

// Sort playlists
watch(playlists, () => {
    playlists.value.sort((a, b) => {
        // Sort by newest first
        return b.createdAt.seconds - a.createdAt.seconds;
    });
});
</script>

<template>
    <main class="home">
        <div v-if="error" class="error">Could not load the playlists</div>
        <div v-if="playlists">
            <Playlists :playlists="playlists" />
        </div>
    </main>
</template>
