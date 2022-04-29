import { createRouter, createWebHistory, useRoute } from 'vue-router';

import { fireAuth } from '@/firebase/config.js';

import LoginView from '@/views/auth/LoginView.vue';
import SignupView from '@/views/auth/SignupView.vue';
import HomeView from '@/views/HomeView.vue';
import CreatePlaylistView from '@/views/playlist/CreatePlaylistView.vue';
import PlaylistDetailsView from '@/views/playlist/PlaylistDetailsView.vue';
import UserPlaylistView from '@/views/playlist/UserPlaylistView.vue';

const requireAuth = (to, from, next) => {
    const user = fireAuth.currentUser;
    if (!user) {
        next({ name: 'login', params: { redirect: to.path } });
    } else {
        next();
    }
};

const requireNoAuth = (to, from, next) => {
    const user = fireAuth.currentUser;

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
            props: true,
        },
        {
            path: '/signup',
            name: 'signup',
            component: SignupView,
            beforeEnter: requireNoAuth,
            props: true,
        },
        {
            path: '/playlists/create',
            name: 'createPlaylist',
            component: CreatePlaylistView,
            beforeEnter: requireAuth,
        },
        {
            path: '/playlists/:id',
            name: 'playlistDetails',
            component: PlaylistDetailsView,
            props: true,
        },
        {
            path: '/playlists/user',
            name: 'userPlaylists',
            component: UserPlaylistView,
            beforeEnter: requireAuth,
        },
    ],
});

export default router;
