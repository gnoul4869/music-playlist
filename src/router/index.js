import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/auth/LoginView.vue';
import SignupView from '@/views/auth/SignupView.vue';
import HomeView from '@/views/HomeView.vue';
import CreatePlaylistView from '../views/playlist/CreatePlaylistView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/signup',
            name: 'signup',
            component: SignupView,
        },
        {
            path: '/playlist/create',
            name: 'createPlaylist',
            component: CreatePlaylistView,
        },
    ],
});

export default router;
