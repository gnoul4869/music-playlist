import { createRouter, createWebHistory, useRoute } from 'vue-router';

import { fireAuth } from '@/firebase/config.js';

import LoginView from '@/views/auth/LoginView.vue';
import SignupView from '@/views/auth/SignupView.vue';
import HomeView from '@/views/HomeView.vue';
import CreatePlaylistView from '@/views/playlist/CreatePlaylistView.vue';
import PlaylistDetailsView from '@/views/playlist/PlaylistDetailsView.vue';
import UserPlaylistsView from '@/views/playlist/UserPlaylistsView.vue';

const requireAuth = (to, from, next) => {
    const user = fireAuth.currentUser;
    if (!user) {
        next({ name: 'Login', params: { redirect: to.path } });
    } else {
        next();
    }
};

const requireNoAuth = (to, from, next) => {
    const user = fireAuth.currentUser;

    if (user) {
        next({ name: 'Home' });
    } else {
        next();
    }
};

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomeView,
        },
        {
            path: '/login',
            name: 'Login',
            component: LoginView,
            beforeEnter: requireNoAuth,
            props: true,
        },
        {
            path: '/signup',
            name: 'Signup',
            component: SignupView,
            beforeEnter: requireNoAuth,
            props: true,
        },
        {
            path: '/playlists/create',
            name: 'CreatePlaylist',
            component: CreatePlaylistView,
            beforeEnter: requireAuth,
        },
        {
            path: '/playlists/:id',
            name: 'PlaylistDetails',
            component: PlaylistDetailsView,
            props: true,
        },
        {
            path: '/playlists/user',
            name: 'UserPlaylists',
            component: UserPlaylistsView,
            beforeEnter: requireAuth,
        },
    ],
});

export default router;
