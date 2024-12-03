import { createRouter, createWebHistory } from 'vue-router';

import HomePage from './pages/HomePage.vue';
import Restaurant from './pages/Restaurant.vue';
import Cart from './pages/Cart.vue';
import Checkout from './pages/Checkout.vue';
import Orders from './pages/Orders.vue';




const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage
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
        },
        {
            path: '/checkout',
            name: 'checkout',
            component: Checkout
        },
        {
            path: '/orders',
            name: 'orders',
            component: Orders,
          }
          
    ]
});

export { router };