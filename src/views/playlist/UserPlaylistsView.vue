<script setup>
import Playlists from '@/components/Playlists.vue';

import getUser from '@/composables/getUser';
import getCollection from '@/composables/getCollection';
import { watch } from 'vue';

// Get user's playlists
const { user } = getUser();
const query = { qWhere: ['userId', '==', user.value.uid] };
const { documents: playlists, error } = getCollection('playlists', query);

// Sort playlists
watch(playlists, () => {
    playlists.value.sort((a, b) => {
        // Sort by newest first
        return b.createdAt.seconds - a.createdAt.seconds;
    });
});
</script>

<template>
    <div class="user-playlists">
        <h2>My Playlists</h2>
        <div v-if="error" class="error">Could not load the playlists</div>
        <div v-if="playlists">
            <Playlists :playlists="playlists" />
        </div>
        <router-link :to="{ name: 'CreatePlaylist' }" class="btn">Create a new playlist</router-link>
    </div>
</template>

<style scoped></style>
