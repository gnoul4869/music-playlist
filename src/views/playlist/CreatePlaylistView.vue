<script setup>
import { ref } from '@vue/reactivity';
import useStorage from '@/composables/useStorage';

const { storageError, uploadImage, url } = useStorage();

const title = ref('');
const description = ref('');
const image = ref(null);
const error = ref('');

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
    if (image.value) {
        console.log(title.value, description.value, image.value);
        await uploadImage(image.value);

        if (!storageError.value) {
            console.log('Image uploaded successfully');
        } else {
            error.value = storageError.value;
        }
    }
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
        <button>Create</button>
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
