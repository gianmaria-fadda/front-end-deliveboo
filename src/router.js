import { createRouter, createWebHistory } from 'vue-router';

import Dashboard from './pages/Dashboard.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: Dashboard
        }
    ]
});

export { router };