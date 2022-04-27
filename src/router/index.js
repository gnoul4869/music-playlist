import { createRouter, createWebHistory } from 'vue-router';

import { fireAuth } from '@/firebase/config.js';

import LoginView from '@/views/auth/LoginView.vue';
import SignupView from '@/views/auth/SignupView.vue';
import HomeView from '@/views/HomeView.vue';
import CreatePlaylistView from '@/views/playlist/CreatePlaylistView.vue';
import PlaylistDetailsView from '@/views/playlist/PlaylistDetailsView.vue';

const requireAuth = (to, from, next) => {
    const user = fireAuth.currentUser;
    if (!user) {
        next({ name: 'login' });
    } else {
        next();
    }
};

const requireNoAuth = (to, from, next) => {
    const user = fireAuth.currentUser;
    console.log(user);
    if (user) {
        next({ name: 'home' });
    } else {
        next();
    }
};

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
            beforeEnter: requireNoAuth,
        },
        {
            path: '/signup',
            name: 'signup',
            component: SignupView,
            beforeEnter: requireNoAuth,
        },
        {
            path: '/playlist/create',
            name: 'createPlaylist',
            component: CreatePlaylistView,
            beforeEnter: requireAuth,
        },
        {
            path: '/playlist/:id',
            name: 'playlistDetails',
            component: PlaylistDetailsView,
            props: true,
        },
    ],
});

export default router;
