<script setup>
import { ref } from '@vue/reactivity';
import { useRouter } from 'vue-router';
import useLogin from '@/composables/useLogin';

const router = useRouter();

const { error, isPending, login } = useLogin();

const email = ref('');
const password = ref('');

const handleSubmit = async () => {
    await login(email.value, password.value);

    if (!error.value) {
        router.push({ name: 'home' });
    }
};
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <h3>Log in</h3>
        <input type="email" placeholder="Email" v-model="email" />
        <input type="password" placeholder="Password" v-model="password" />
        <div v-if="error" class="error">{{ error }}</div>
        <button v-if="!isPending">Log in</button>
        <button v-if="isPending" disabled>Logging in...</button>
    </form>
</template>

<style></style>
