<script setup>
import { ref } from '@vue/reactivity';

const title = ref('');
const description = ref('');

const handleSubmit = () => {
    console.log(title.value, description.value);
};
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <h4>Create New Playlist</h4>
        <input type="text" required placeholder="Title" v-model="title" />
        <textarea required placeholder="Description" v-model="description"></textarea>
        <!-- Upload playlist image -->
        <label>Upload playlist cover image</label>
        <input type="file" />

        <div class="error"></div>
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
