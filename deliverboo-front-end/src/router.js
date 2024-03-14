import { createRouter, createWebHistory } from 'vue-router';
import AppRestaurants from './components/AppRestaurants.vue';
import AppDishes from './components/AppDishes.vue';
const router = createRouter({
    history: createWebHistory(),
    routes: [
            {
                path: '/',
                name: 'restaurants',
                component: AppRestaurants
            },
            {
                path: '/restaurant/dishes',
                name: 'dishes',
                component: AppDishes
            },
            // {
            //     path: '/contatti',
            //     name: 'contatti',
            //     component: contatti
            // },

        ]
    });
export { router };