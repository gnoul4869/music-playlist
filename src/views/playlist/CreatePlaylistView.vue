<script setup>
import { computed, ref } from '@vue/reactivity';
import { serverTimestamp } from '@firebase/firestore';
import getUser from '@/composables/getUser';
import useStorage from '@/composables/useStorage';
import useCollection from '@/composables/useCollection';

const storage = useStorage();
const collection = useCollection('playlists');
const { user } = getUser();

const title = ref('');
const description = ref('');
const image = ref(null);

const error = ref('');
const isPending = ref(false);

const allowedImageTypes = ['image/jpeg', 'image/png'];

const handleImage = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
        if (!allowedImageTypes.includes(selectedImage.type)) {
            return (error.value = 'Only jpg and png images are allowed');
        }

        image.value = selectedImage;
        error.value = '';
    } else {
        image.value = null;
        error.value = 'Please choose an image';
    }
};

const handleSubmit = async () => {
    if (!user.value) return (error.value = 'You must be logged in to create a playlist');
    if (!image.value) return (error.value = 'Please choose an image');

    error.value = '';
    isPending.value = true;

    await storage.uploadImage(image.value, user.value.uid);
    await collection.addDocument({
        title: title.value,
        description: description.value,
        userId: user.value.uid,
        userName: user.value.displayName,
        coverURL: storage.url.value,
        coverPath: storage.filePath.value,
        songs: [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });

    isPending.value = false;

    if (storage.error.value) {
        return (error.value = storage.error.value);
    }
    if (collection.error.value) {
        return (error.value = collection.error.value);
    }
    console.log('Playlist created successfully');
};
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <h4>Create New Playlist</h4>
        <input type="text" required placeholder="Title" v-model="title" />
        <textarea required placeholder="Description" v-model="description"></textarea>
        <!-- Upload playlist image -->
        <label>Upload playlist cover image</label>
        <input type="file" @change="handleImage" />

        <div class="error">{{ error }}</div>
        <button v-if="!isPending">Create</button>
        <button v-else disabled>Creating...</button>
    </form>
</template>

<style>
form {
    background: white;
}
input[type='file'] {
    border: 0;
    padding: 0;
}
label {
    font-size: 12px;
    display: block;
    margin-top: 30px;
}
button {
    margin-top: 20px;
}
</style>
