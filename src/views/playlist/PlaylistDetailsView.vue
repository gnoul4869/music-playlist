<script setup>
import { watchEffect } from 'vue';
import { computed, ref } from '@vue/reactivity';
import { useRouter } from 'vue-router';

import AddSong from '@/components/AddSong.vue';

import getDocument from '@/composables/getDocument';
import useDocument from '@/composables/useDocument';
import useStorage from '@/composables/useStorage';
import getUser from '@/composables/getUser';

// Playlist Id
const router = useRouter();

const props = defineProps({
    id: String,
});

const playlistId = computed(() => {
    return props.id.split('.').pop();
});

// Composable functions
const { document: playlist, error: getDocumentError } = getDocument('playlists', playlistId.value);
const { error: useDocumentError, deleteDocument, updateDocument } = useDocument('playlists', playlistId.value);
const { error: useStorageError, deleteImage } = useStorage();
const { user } = getUser();

// Reactive variables
const isPending = ref(false);
const error = ref('');

watchEffect(() => {
    if (!isPending.value) {
        error.value = getDocumentError.value || useDocumentError.value || useStorageError.value;
    } else {
        error.value = '';
    }
});

const isPlaylistOwner = computed(() => {
    return playlist.value && user.value && user.value.uid === playlist.value.userId;
});

const handleDeletePlaylist = async () => {
    isPending.value = true;

    await deleteImage(playlist.value.coverPath);
    await deleteDocument();

    if (!useDocumentError.value && !useStorageError.value) {
        router.push({ name: 'home' });
    }

    isPending.value = false;
};

const handleRemoveSong = async (songId) => {
    await updateDocument({ songs: playlist.value.songs.filter((song) => song.id !== songId) });
};
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
            <button v-if="isPlaylistOwner && !isPending" @click="handleDeletePlaylist">Delete</button>
            <button v-if="isPending" disabled>Deleting playlist...</button>
        </div>
        <!-- Song list -->
        <div class="song-list">
            <div v-if="!playlist.songs.length">No songs have been added to this playlist yet</div>
            <div v-else v-for="song in playlist.songs" :key="song.id" class="single-song">
                <div class="details">
                    <h3>{{ song.title }}</h3>
                    <p>{{ song.artist }}</p>
                </div>
                <button v-if="isPlaylistOwner" @click="handleRemoveSong(song.id)">Remove</button>
            </div>
            <AddSong v-if="isPlaylistOwner" :playlist="playlist" />
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
.single-song {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed var(--secondary);
    margin-bottom: 20px;
}
</style>
