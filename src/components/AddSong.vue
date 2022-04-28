<script setup>
import { v4 as uuidv4 } from 'uuid';
import { ref } from 'vue';

const props = defineProps({
    playlist: Object,
});

const showForm = ref(false);
const error = ref('');

const title = ref('');
const artist = ref('');

const handleShowForm = () => {
    showForm.value = !showForm.value;
};

const handleSubmit = async () => {
    try {
        const song = {
            id: uuidv4(),
            title: title.value,
            artist: artist.value,
        };

        console.log(song);
    } catch (err) {
        console.log(err.message);
        error.value = 'Error adding song';
    }
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
            <button>Add</button>
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
