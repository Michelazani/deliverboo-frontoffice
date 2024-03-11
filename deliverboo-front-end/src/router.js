import { createRouter, createWebHistory } from 'vue-router';
import Appprova from './components/Appprova.vue';
const router = createRouter({
    history: createWebHistory(),
    routes: [
            {
                path: '/prova',
                name: 'prova',
                component: Appprova
            },
            // {
            //     path: '/chisiamo',
            //     name: 'ChiSiamo',
            //     component: ChiSiamo
            // },
            // {
            //     path: '/contatti',
            //     name: 'contatti',
            //     component: contatti
            // },

        ]
    });
export { router };