<template>
    <form @submit.prevent="handleSubmit">
        <h3>Login</h3>
        <input type="email" placeholder="Email" v-model="email" />
        <input type="password" placeholder="Password" v-model="password" />
        <div v-if="error" class="error">{{ error }}</div>
        <button v-if="!isLoading">Login</button>
        <button v-if="isLoading" disabled>Logging in...</button>
    </form>
</template>

<script setup>
import { ref } from '@vue/reactivity';
import useLogin from '@/composables/useLogin';

const { error, isLoading, login } = useLogin();

const email = ref('');
const password = ref('');

const handleSubmit = async () => {
    const res = await login(email.value, password.value);

    if (!error.value) {
        console.log('user logged in');
    }
};
</script>

<style></style>
