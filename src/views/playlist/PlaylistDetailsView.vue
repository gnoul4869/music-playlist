<script setup>
import { computed } from '@vue/reactivity';
import getDocument from '@/composables/getDocument';

const props = defineProps({
    id: String,
});

const playlistId = computed(() => {
    return props.id.split('.').pop();
});

const { document: playlist, error } = getDocument('playlists', playlistId.value);
</script>

<template>
    <div v-if="error">{{ error }}</div>
    <div v-if="playlist" class="playlist-details">
        <!-- Playlist information -->
        <div class="playlist-info">
            <div class="cover">
                <img :src="playlist.coverURL" :alt="playlist.title" />
            </div>
            <h2>{{ playlist.title }}</h2>
            <p class="username">Created by {{ playlist.username }}</p>
            <p class="description">{{ playlist.description }}</p>
        </div>
        <!-- Song list -->
        <div class="song-list">
            <p>songs...</p>
        </div>
    </div>
</template>

<style>
.playlist-details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 80px;
}
.cover {
    overflow: hidden;
    border-radius: 20px;
    position: relative;
    padding: 160px;
}
.cover img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
    max-width: 120%;
    max-height: 120%;
}
.playlist-info {
    text-align: center;
}
.playlist-info h2 {
    text-transform: capitalize;
    font-size: 28px;
    margin-top: 20px;
}
.playlist-info p {
    margin-bottom: 20px;
}
.username {
    color: #999;
}
.description {
    text-align: left;
}
</style>
