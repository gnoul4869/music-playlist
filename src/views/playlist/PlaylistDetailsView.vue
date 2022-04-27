<script setup>
import { computed } from '@vue/reactivity';

const props = defineProps({
    id: String,
});

const playlistId = computed(() => {
    return props.id.split('.').pop();
});
</script>
<template>
    <h2>Playlist Details: {{ playlistId }}</h2>
</template>
<style></style>
