<script setup>
import { ref, watchEffect } from 'vue';
import { v4 as uuidv4 } from 'uuid';

import useDocument from '@/composables/useDocument';

const props = defineProps({
    playlist: Object,
});

const { error: useDocumentError, updateDocument } = useDocument('playlists', props.playlist.id);

const isPending = ref(false);
const error = ref('');

watchEffect(() => {
    if (!isPending.value) {
        error.value = useDocumentError.value && 'Error adding song';
    } else {
        error.value = '';
    }
});

const showForm = ref(false);

const title = ref('');
const artist = ref('');

const handleShowForm = () => {
    showForm.value = !showForm.value;
};

const handleSubmit = async () => {
    isPending.value = true;

    const newSong = {
        id: uuidv4(),
        title: title.value,
        artist: artist.value,
    };

    await updateDocument({ songs: [...props.playlist.songs, newSong] });

    title.value = '';
    artist.value = '';

    isPending.value = false;
    showForm.value = false;
};
</script>

<template>
    <div class="add-song">
        <button v-if="!showForm" @click="handleShowForm">Add song</button>
        <form v-else @submit.prevent="handleSubmit">
            <div class="close-btn" @click="handleShowForm">x</div>
            <h4>Add a new song</h4>
            <input type="text" placeholder="Song title" v-model="title" required />
            <input type="text" placeholder="Artist" v-model="artist" required />
            <button v-if="!isPending">Add</button>
            <button v-else disabled>Adding song...</button>
        </form>
    </div>
</template>

<style scoped>
.add-song {
    text-align: center;
    margin-top: 40px;
}
form {
    max-width: 100%;
    text-align: left;
    position: relative;
}
.close-btn {
    position: absolute;
    padding: 5px;
    top: 15px;
    right: 30px;
    font-size: 18px;
    cursor: pointer;
}
.close-btn:hover {
    color: salmon;
}
</style>
