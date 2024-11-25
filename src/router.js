import { createRouter, createWebHistory } from 'vue-router';

import HomePage from './pages/HomePage.vue';
import Login from './pages/Login.vue';
import Register from './pages/Register.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage
        },
        {
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '/',
            name: 'register',
            component: Register
        }
    ]
});

export { router };