<script setup>
import { watch } from 'vue';
import { useRouter } from 'vue-router';
import { computed } from '@vue/reactivity';
import getUser from '@/composables/getUser';
import generateParams from '@/utils/generateParams';

const props = defineProps({
    playlists: Array,
});

const router = useRouter();

const { user } = getUser();

watch(user, () => {
    if (!user.value) {
        router.push({ name: 'Login' });
    }
});
</script>

<template>
    <div v-for="playlist in playlists" :key="playlist.id">
        <router-link :to="{ name: 'PlaylistDetails', params: { id: generateParams(playlist.title, playlist.id) } }">
            <div class="single">
                <div class="thumbnail">
                    <img :src="playlist.coverURL" />
                </div>
                <div class="info">
                    <h3>{{ playlist.title }}</h3>
                    <p>Created by {{ playlist.username }}</p>
                </div>
                <div class="song-number">
                    {{ playlist.songs.length }}
                </div>
            </div>
        </router-link>
    </div>
</template>

<style scoped>
.single {
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 10px;
    background: white;
    margin: 16px 0;
    transition: all ease 0.2s;
}
.single:hover {
    box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.05);
    transform: scale(1.02);
    transition: all ease 0.2s;
}
.thumbnail {
    max-width: 100px;
    max-height: 100px;
    overflow: hidden;
    border-radius: 10px;
}
img {
    max-width: 100%;
    max-height: 100%;
    display: block;
}
.info {
    margin: 0 30px;
}
.song-number {
    margin-left: auto;
}
</style>
