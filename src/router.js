import { createRouter, createWebHistory } from 'vue-router';

import HomePage from './pages/HomePage.vue';
import Dish from './pages/Dish.vue';
import Restaurant from './pages/Restaurant.vue';
import Cart from './pages/Cart.vue';




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
            name: 'new-dish',
            component: Dish
        },
        {
            path: '/restaurant/:id',
            name: 'restaurant',
            component: Restaurant
        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart
        }
          
    ]
});

export { router };