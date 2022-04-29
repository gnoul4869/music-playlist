<script setup>
import getUser from '@/composables/getUser';
import getCollection from '@/composables/getCollection';

// Get user's playlists
const { user } = getUser();
const query = { qWhere: ['userId', '==', user.value.uid] };
const { documents: playlists } = getCollection('playlists', query);

console.log(playlists);
</script>

<template>
    <div>user playlist</div>
</template>

<style scoped></style>
